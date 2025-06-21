import { Email } from '../types/email';
import { EMAIL_CONFIG } from '../config/emailConfig';

export class EmailParser {
  /**
   * Parse raw email content and extract structured data
   */
  static parseEmail(rawEmail: any): Email {
    return {
      id: rawEmail.id || this.generateId(),
      sender: this.extractSender(rawEmail.from),
      subject: rawEmail.subject || '',
      body: this.extractBody(rawEmail),
      timestamp: rawEmail.date || new Date().toISOString(),
      isRead: rawEmail.flags?.includes('\\Seen') || false,
      rawBody: rawEmail.html || rawEmail.text,
    };
  }

  /**
   * Preprocess email content for classification
   */
  static preprocessContent(email: Email): { subject: string; body: string; sender: string } {
    const config = EMAIL_CONFIG.processing;
    
    let subject = email.subject;
    let body = email.body;
    let sender = email.sender;

    // Strip HTML tags
    if (config.stripHtml) {
      subject = this.stripHtml(subject);
      body = this.stripHtml(body);
    }

    // Convert to lowercase for case-insensitive matching
    if (config.toLowercase) {
      subject = subject.toLowerCase();
      body = body.toLowerCase();
      sender = sender.toLowerCase();
    }

    // Remove extra whitespace
    if (config.removeExtraWhitespace) {
      subject = this.normalizeWhitespace(subject);
      body = this.normalizeWhitespace(body);
    }

    // Limit body length
    if (body.length > config.maxBodyLength) {
      body = body.substring(0, config.maxBodyLength) + '...';
    }

    return { subject, body, sender };
  }

  /**
   * Extract sender email from various formats
   */
  private static extractSender(from: string): string {
    if (!from) return '';
    
    // Handle formats like "Name <email@domain.com>" or just "email@domain.com"
    const emailMatch = from.match(/<(.+?)>/) || from.match(/([^\s<>]+@[^\s<>]+)/);
    return emailMatch ? emailMatch[1] : from;
  }

  /**
   * Extract body content from email
   */
  private static extractBody(rawEmail: any): string {
    if (rawEmail.html) {
      return this.stripHtml(rawEmail.html);
    }
    return rawEmail.text || rawEmail.body || '';
  }

  /**
   * Strip HTML tags from content
   */
  private static stripHtml(html: string): string {
    if (!html) return '';
    
    // Remove HTML tags
    let text = html.replace(/<[^>]*>/g, ' ');
    
    // Decode common HTML entities
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#(\d+);/g, (match, num) => String.fromCharCode(parseInt(num)));
    
    return text;
  }

  /**
   * Normalize whitespace
   */
  private static normalizeWhitespace(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * Tokenize text into words
   */
  static tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 0);
  }

  /**
   * Extract domain from email address
   */
  static extractDomain(email: string): string {
    const match = email.match(/@(.+)$/);
    return match ? match[1] : '';
  }

  /**
   * Generate unique ID for emails
   */
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}