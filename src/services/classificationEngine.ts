import { Email, ClassificationResult, ClassificationRule, MatchedRule, EmailCategory } from '../types/email';
import { CLASSIFICATION_RULES } from '../rules/classificationRules';
import { EmailParser } from './emailParser';
import { SENDER_WHITELIST, SENDER_BLACKLIST, TRUSTED_DOMAINS, EMAIL_CONFIG } from '../config/emailConfig';

export class ClassificationEngine {
  private rules: ClassificationRule[];

  constructor(customRules?: ClassificationRule[]) {
    this.rules = customRules || CLASSIFICATION_RULES;
  }

  /**
   * Classify an email using rule-based approach
   */
  classify(email: Email): ClassificationResult {
    const preprocessed = EmailParser.preprocessContent(email);
    const matchedRules: MatchedRule[] = [];
    const categoryScores: Record<EmailCategory, number> = {
      SPAM: 0,
      WORK: 0,
      PERSONAL: 0,
      PROMOTIONS: 0,
      SOCIAL: 0,
    };

    // For risk scoring and spam type
    let detectedSpamType: string | undefined = undefined;
    let detectedRiskScore: number | undefined = undefined;

    // Check sender whitelist/blacklist first
    const senderCheck = this.checkSenderReputation(preprocessed.sender);
    if (senderCheck) {
      matchedRules.push(senderCheck);
      categoryScores['SPAM'] += senderCheck.weight; // Always SPAM for blacklist
      // If blacklist, treat as phishing
      detectedSpamType = 'Phishing';
      detectedRiskScore = 90;
    }

    // Apply classification rules
    for (const rule of this.rules.sort((a, b) => a.priority - b.priority)) {
      const ruleMatch = this.evaluateRule(rule, preprocessed);
      if (ruleMatch) {
        matchedRules.push(ruleMatch);
        categoryScores[rule.category] += rule.weight;

        // Assign spamType and riskScore for SPAM rules
        if (rule.category === 'SPAM') {
          // Map rule id/name to spam type and risk
          let spamType = 'General Spam';
          let risk = 60;
          if (rule.id.includes('phish') || rule.name.toLowerCase().includes('phish')) {
            spamType = 'Phishing';
            risk = 90;
          } else if (rule.id.includes('scam') || rule.name.toLowerCase().includes('scam') || rule.name.toLowerCase().includes('fraud')) {
            spamType = 'Scam';
            risk = 80;
          } else if (rule.id.includes('malware') || rule.name.toLowerCase().includes('malware') || rule.name.toLowerCase().includes('virus')) {
            spamType = 'Malware';
            risk = 95;
          } else if (rule.id.includes('suspicious') || rule.name.toLowerCase().includes('suspicious')) {
            spamType = 'Suspicious';
            risk = 70;
          } else if (rule.id.includes('promotional') || rule.name.toLowerCase().includes('promo')) {
            spamType = 'Advertising Spam';
            risk = 50;
          }
          // Use the highest risk if multiple rules match
          if (!detectedRiskScore || risk > detectedRiskScore) {
            detectedSpamType = spamType;
            detectedRiskScore = risk;
          }
        }

        // Stop if we have enough evidence
        if (matchedRules.length >= EMAIL_CONFIG.classification.maxRulesPerEmail) {
          break;
        }
      }
    }

    // Determine final category and confidence
    const category = this.selectCategory(categoryScores);
    const confidence = this.calculateConfidence(categoryScores, category);
    const explanation = this.generateExplanation(matchedRules, category, confidence);

    // Only assign spamType/riskScore for SPAM
    return {
      category,
      confidence,
      matchedRules,
      explanation,
      spamType: category === 'SPAM' ? detectedSpamType : undefined,
      riskScore: category === 'SPAM' ? detectedRiskScore : undefined,
    };
  }

  /**
   * Check sender reputation against whitelist/blacklist
   */
  private checkSenderReputation(sender: string): MatchedRule | null {
    const domain = EmailParser.extractDomain(sender);

    // Check blacklist
    if (SENDER_BLACKLIST.some(blocked => sender.includes(blocked))) {
      return {
        ruleId: 'sender-blacklist',
        ruleName: 'Sender Blacklist',
        weight: 0.9,
        matchedContent: sender,
        matchType: 'sender',
      };
    }

    // Check whitelist
    if (SENDER_WHITELIST.some(trusted => sender.includes(trusted))) {
      return {
        ruleId: 'sender-whitelist',
        ruleName: 'Trusted Sender',
        weight: 0.8,
        matchedContent: sender,
        matchType: 'sender',
      };
    }

    // Check trusted domains
    if (TRUSTED_DOMAINS.some(trusted => domain.includes(trusted))) {
      return {
        ruleId: 'trusted-domain',
        ruleName: 'Trusted Domain',
        weight: 0.6,
        matchedContent: domain,
        matchType: 'sender',
      };
    }

    return null;
  }

  /**
   * Evaluate a single classification rule
   */
  private evaluateRule(rule: ClassificationRule, content: { subject: string; body: string; sender: string }): MatchedRule | null {
    for (const condition of rule.conditions) {
      const match = this.evaluateCondition(condition, content);
      if (match) {
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          weight: rule.weight,
          matchedContent: match,
          matchType: condition.field as any,
        };
      }
    }
    return null;
  }

  /**
   * Evaluate a single rule condition
   */
  private evaluateCondition(condition: any, content: { subject: string; body: string; sender: string }): string | null {
    let text = '';
    
    switch (condition.field) {
      case 'subject':
        text = content.subject;
        break;
      case 'body':
        text = content.body;
        break;
      case 'sender':
        text = content.sender;
        break;
      case 'all':
        text = `${content.subject} ${content.body} ${content.sender}`;
        break;
    }

    if (!condition.caseSensitive) {
      text = text.toLowerCase();
    }

    switch (condition.type) {
      case 'keyword':
        return this.matchKeywords(text, condition.value, condition.operator);
      case 'regex':
        return this.matchRegex(text, condition.value);
      case 'domain':
        return this.matchDomain(content.sender, condition.value);
      case 'sender':
        return this.matchSender(content.sender, condition.value, condition.operator);
      default:
        return null;
    }
  }

  /**
   * Match keywords in text
   */
  private matchKeywords(text: string, keywords: string | string[], operator: string): string | null {
    const keywordList = Array.isArray(keywords) ? keywords : [keywords];
    
    for (const keyword of keywordList) {
      const lowerKeyword = keyword.toLowerCase();
      const lowerText = text.toLowerCase();
      
      switch (operator) {
        case 'contains':
          if (lowerText.includes(lowerKeyword)) return keyword;
          break;
        case 'equals':
          if (lowerText === lowerKeyword) return keyword;
          break;
        case 'startsWith':
          if (lowerText.startsWith(lowerKeyword)) return keyword;
          break;
        case 'endsWith':
          if (lowerText.endsWith(lowerKeyword)) return keyword;
          break;
      }
    }
    
    return null;
  }

  /**
   * Match regex pattern
   */
  private matchRegex(text: string, pattern: string): string | null {
    try {
      const regex = new RegExp(pattern, 'i');
      const match = text.match(regex);
      return match ? match[0] : null;
    } catch (error) {
      console.warn('Invalid regex pattern:', pattern);
      return null;
    }
  }

  /**
   * Match domain patterns
   */
  private matchDomain(sender: string, domains: string | string[]): string | null {
    const domain = EmailParser.extractDomain(sender);
    const domainList = Array.isArray(domains) ? domains : [domains];
    
    for (const targetDomain of domainList) {
      if (domain.includes(targetDomain.toLowerCase())) {
        return targetDomain;
      }
    }
    
    return null;
  }

  /**
   * Match sender patterns
   */
  private matchSender(sender: string, patterns: string | string[], operator: string): string | null {
    const patternList = Array.isArray(patterns) ? patterns : [patterns];
    
    for (const pattern of patternList) {
      switch (operator) {
        case 'contains':
          if (sender.toLowerCase().includes(pattern.toLowerCase())) return pattern;
          break;
        case 'equals':
          if (sender.toLowerCase() === pattern.toLowerCase()) return pattern;
          break;
      }
    }
    
    return null;
  }

  /**
   * Select the category with highest score
   */
  private selectCategory(scores: Record<EmailCategory, number>): EmailCategory {
    let maxScore = 0;
    let category: EmailCategory = 'PERSONAL'; // Default category
    
    for (const [cat, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        category = cat as EmailCategory;
      }
    }
    
    return category;
  }

  /**
   * Calculate confidence score
   */
  private calculateConfidence(scores: Record<EmailCategory, number>, category: EmailCategory): number {
    const categoryScore = scores[category];
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    if (totalScore === 0) return EMAIL_CONFIG.classification.minConfidence;
    
    const confidence = Math.min(categoryScore / totalScore, 1.0);
    return Math.max(confidence, EMAIL_CONFIG.classification.minConfidence);
  }

  /**
   * Generate human-readable explanation
   */
  private generateExplanation(matchedRules: MatchedRule[], category: EmailCategory, confidence: number): string {
    if (matchedRules.length === 0) {
      return `Classified as ${category} with default confidence (${(confidence * 100).toFixed(1)}%).`;
    }

    const topRules = matchedRules
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3);

    const ruleDescriptions = topRules.map(rule => 
      `"${rule.ruleName}" (matched: "${rule.matchedContent}")`
    ).join(', ');

    return `Classified as ${category} (${(confidence * 100).toFixed(1)}% confidence) based on rules: ${ruleDescriptions}.`;
  }
}