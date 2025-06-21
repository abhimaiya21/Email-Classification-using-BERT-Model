export interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  rawBody?: string;
}

export interface ClassificationResult {
  category: EmailCategory;
  confidence: number;
  matchedRules: MatchedRule[];
  explanation: string;
  spamType?: string;
  riskScore?: number;
}

export interface MatchedRule {
  ruleId: string;
  ruleName: string;
  weight: number;
  matchedContent: string;
  matchType: 'subject' | 'body' | 'sender' | 'pattern';
}

export type EmailCategory = 'SPAM' | 'WORK' | 'PERSONAL' | 'PROMOTIONS' | 'SOCIAL';

export interface ClassificationRule {
  id: string;
  name: string;
  category: EmailCategory;
  weight: number;
  conditions: RuleCondition[];
  priority: number;
}

export interface RuleCondition {
  type: 'keyword' | 'sender' | 'subject' | 'body' | 'regex' | 'domain';
  field: 'subject' | 'body' | 'sender' | 'all';
  value: string | string[];
  operator: 'contains' | 'equals' | 'matches' | 'startsWith' | 'endsWith';
  caseSensitive?: boolean;
}