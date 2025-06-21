import { ClassificationRule } from '../types/email';

export const CLASSIFICATION_RULES: ClassificationRule[] = [
  // SPAM Rules
  {
    id: 'spam-suspicious-words',
    name: 'Suspicious Words Detection',
    category: 'SPAM',
    weight: 0.8,
    priority: 1,
    conditions: [
      {
        type: 'keyword',
        field: 'subject',
        value: [
          'urgent', 'act now', 'limited time', 'click here', '!!!', 'free money', 'winner',
          'won', 'claim now', 'cash prize', 'prize', 'congratulations', 'award', 'reward', 'lottery', 'lucky winner'
        ],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },
  {
    id: 'spam-promotional-patterns',
    name: 'Promotional Spam Patterns',
    category: 'SPAM',
    weight: 0.7,
    priority: 2,
    conditions: [
      {
        type: 'regex',
        field: 'body',
        value: '\\d+%\\s*(off|discount|sale)',
        operator: 'matches',
      }
    ]
  },
  {
    id: 'spam-suspicious-domains',
    name: 'Suspicious Domain Detection',
    category: 'SPAM',
    weight: 0.9,
    priority: 1,
    conditions: [
      {
        type: 'domain',
        field: 'sender',
        value: [
          'suspicious-site.com', 'fake-bank.net', 'scammer.org', 'spamoffers.com'
        ],
        operator: 'contains',
      }
    ]
  },

  // WORK Rules
  {
    id: 'work-meeting-invites',
    name: 'Meeting Invitations',
    category: 'WORK',
    weight: 0.9,
    priority: 1,
    conditions: [
      {
        type: 'keyword',
        field: 'subject',
        value: ['meeting', 'calendar', 'invitation', 'conference call', 'zoom', 'teams'],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },
  {
    id: 'work-project-updates',
    name: 'Project Updates',
    category: 'WORK',
    weight: 0.8,
    priority: 2,
    conditions: [
      {
        type: 'keyword',
        field: 'subject',
        value: ['project', 'update', 'status', 'deadline', 'milestone', 'sprint'],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },
  {
    id: 'work-github-notifications',
    name: 'GitHub Notifications',
    category: 'WORK',
    weight: 0.85,
    priority: 1,
    conditions: [
      {
        type: 'sender',
        field: 'sender',
        value: 'github.com',
        operator: 'contains',
      }
    ]
  },

  // PERSONAL Rules
  {
    id: 'personal-family-friends',
    name: 'Family and Friends',
    category: 'PERSONAL',
    weight: 0.9,
    priority: 1,
    conditions: [
      {
        type: 'keyword',
        field: 'body',
        value: ['family', 'birthday', 'dinner', 'weekend', 'vacation', 'personal'],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },
  {
    id: 'personal-gmail-personal',
    name: 'Personal Gmail Accounts',
    category: 'PERSONAL',
    weight: 0.7,
    priority: 3,
    conditions: [
      {
        type: 'domain',
        field: 'sender',
        value: ['gmail.com', 'yahoo.com', 'hotmail.com'],
        operator: 'contains',
      }
    ]
  },

  // PROMOTIONS Rules
  {
    id: 'promotions-sales',
    name: 'Sales and Discounts',
    category: 'PROMOTIONS',
    weight: 0.8,
    priority: 1,
    conditions: [
      {
        type: 'keyword',
        field: 'subject',
        value: ['sale', 'discount', 'offer', 'deal', 'coupon', 'promo'],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },
  {
    id: 'promotions-newsletters',
    name: 'Newsletter Promotions',
    category: 'PROMOTIONS',
    weight: 0.6,
    priority: 2,
    conditions: [
      {
        type: 'keyword',
        field: 'subject',
        value: ['newsletter', 'weekly digest', 'monthly update'],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },

  // SOCIAL Rules
  {
    id: 'social-platforms',
    name: 'Social Media Notifications',
    category: 'SOCIAL',
    weight: 0.9,
    priority: 1,
    conditions: [
      {
        type: 'domain',
        field: 'sender',
        value: ['facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com'],
        operator: 'contains',
      }
    ]
  },
  {
    id: 'social-notifications',
    name: 'Social Notifications',
    category: 'SOCIAL',
    weight: 0.8,
    priority: 2,
    conditions: [
      {
        type: 'keyword',
        field: 'subject',
        value: ['liked your', 'commented on', 'tagged you', 'friend request', 'follow'],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },

  // High-Risk Financial Keywords
  {
    id: 'spam-high-risk-financial',
    name: 'High-Risk Financial Keywords',
    category: 'SPAM',
    weight: 0.95,
    priority: 1,
    conditions: [
      {
        type: 'keyword',
        field: 'body',
        value: [
          'urgent', 'immediate', 'expires today', 'act now', 'limited time',
          'suspend', 'suspended', 'frozen', 'locked', 'restricted',
          'verify immediately', 'confirm within', 'update required',
          'wire transfer', 'bitcoin', 'cryptocurrency', 'investment opportunity',
          'tax refund', 'stimulus', 'government grant', 'unclaimed funds',
          'inheritance', 'beneficiary', 'lottery', 'sweepstakes', 'prize'
        ],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },

  // Authentication/Security Scams
  {
    id: 'spam-auth-security',
    name: 'Authentication/Security Scams',
    category: 'SPAM',
    weight: 0.9,
    priority: 2,
    conditions: [
      {
        type: 'keyword',
        field: 'body',
        value: [
          'account suspended', 'security alert', 'unauthorized access',
          'click to verify', 'confirm identity', 'update payment',
          'temporary suspension', 'reactivate', 'restore access',
          'billing issue', 'payment failed', 'subscription expired',
          'unusual activity', 'login attempt', 'security code',
          'verify account', 'confirm details', 'update information'
        ],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },

  // Classic Spam Indicators
  {
    id: 'spam-classic',
    name: 'Classic Spam Indicators',
    category: 'SPAM',
    weight: 0.85,
    priority: 3,
    conditions: [
      {
        type: 'keyword',
        field: 'body',
        value: [
          'guaranteed', 'risk-free', 'no obligation', 'free trial',
          'earn money', 'work from home', 'easy income',
          'lose weight', 'miracle cure', 'anti-aging',
          "don't delay", 'hurry', 'while supplies last',
          'exclusive offer', 'special promotion', 'members only',
          'congratulations', "you've been selected", 'winner'
        ],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },

  // Malicious Link Patterns
  {
    id: 'spam-malicious-link',
    name: 'Malicious Link Patterns',
    category: 'SPAM',
    weight: 0.9,
    priority: 4,
    conditions: [
      {
        type: 'keyword',
        field: 'body',
        value: [
          'click here', 'download now', 'install update',
          'view message', 'see attachment', 'open document',
          'confirm here', 'validate', 'authenticate',
          'dear customer', 'dear user', 'dear member',
          'valued client', 'account holder', 'subscriber'
        ],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },

  // Executive/BEC (Business Email Compromise) Keywords
  {
    id: 'spam-bec-executive',
    name: 'Executive/BEC Keywords',
    category: 'SPAM',
    weight: 0.97,
    priority: 5,
    conditions: [
      {
        type: 'keyword',
        field: 'body',
        value: [
          'CEO', 'president', 'urgent request', 'confidential',
          'wire transfer', 'payment authorization', 'vendor change',
          'new bank details', 'invoice payment', 'supplier information',
          'please handle', 'need favor', 'quick request',
          'change of bank', 'new account', 'payment redirect'
        ],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },

  // Phishing-Specific Terms
  {
    id: 'spam-phishing-impersonation',
    name: 'Phishing Service Impersonation',
    category: 'SPAM',
    weight: 0.95,
    priority: 6,
    conditions: [
      {
        type: 'keyword',
        field: 'body',
        value: [
          'PayPal', 'Amazon', 'Microsoft', 'Google',
          'IRS', 'Social Security', 'government agency',
          'bank notification', 'credit card', 'loan approval',
          'tax document', 'W-2', '1099', 'social security',
          'driver\'s license', 'passport', 'birth certificate'
        ],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },

  // Regex Patterns for Advanced Filtering
  {
    id: 'spam-regex-advanced',
    name: 'Regex Advanced Patterns',
    category: 'SPAM',
    weight: 0.9,
    priority: 7,
    conditions: [
      {
        type: 'regex',
        field: 'body',
        value: '(\\+1|1-)?\\s*\\(?[0-9]{3}\\)?\\s*-?\\s*[0-9]{3}\\s*-?\\s*[0-9]{4}',
        operator: 'matches',
      },
      {
        type: 'regex',
        field: 'body',
        value: '[vV][1Il][4aA@][gG][rR][4aA@]',
        operator: 'matches',
      },
      {
        type: 'regex',
        field: 'body',
        value: '[mM][0oO][nN][3eE][yY]',
        operator: 'matches',
      },
      {
        type: 'regex',
        field: 'body',
        value: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        operator: 'matches',
      }
    ]
  },

  // Negative Keywords (Whitelist Indicators)
  {
    id: 'whitelist-legit-business',
    name: 'Legitimate Business Terms',
    category: 'WORK',
    weight: 0.7,
    priority: 1,
    conditions: [
      {
        type: 'keyword',
        field: 'body',
        value: [
          'meeting', 'conference', 'proposal', 'contract',
          'invoice', 'receipt', 'order confirmation',
          'newsletter', 'unsubscribe', 'privacy policy'
        ],
        operator: 'contains',
        caseSensitive: false,
      }
    ]
  },
];