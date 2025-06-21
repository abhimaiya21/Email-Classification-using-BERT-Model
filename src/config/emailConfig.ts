export const EMAIL_CONFIG = {
  // IMAP Configuration (for real implementation)
  imap: {
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    user: '', // Set via environment variables
    password: '', // Set via environment variables or app passwords
  },
  
  // Classification thresholds
  classification: {
    minConfidence: 0.3,
    spamThreshold: 0.7,
    maxRulesPerEmail: 10,
  },
  
  // Email processing settings
  processing: {
    maxBodyLength: 5000,
    stripHtml: true,
    toLowercase: true,
    removeExtraWhitespace: true,
  },
  
  // UI Settings
  ui: {
    emailsPerPage: 10,
    refreshInterval: 30000, // 30 seconds
    animationDuration: 300,
  }
};

export const SENDER_WHITELIST = [
  'noreply@github.com',
  'notifications@slack.com',
  'calendar-notification@google.com',
  'no-reply@linkedin.com',
];

export const SENDER_BLACKLIST = [
  'spam@example.com',
  'noreply@suspicious-site.com',
];

export const TRUSTED_DOMAINS = [
  'github.com',
  'google.com',
  'microsoft.com',
  'apple.com',
  'linkedin.com',
  'slack.com',
];