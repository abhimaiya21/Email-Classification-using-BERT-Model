import { Email } from '../types/email';

export const MOCK_EMAILS: Email[] = [
  {
    id: '1',
    sender: 'notifications@github.com',
    subject: '[Project] New pull request #123: Feature implementation',
    body: 'A new pull request has been opened for review. The feature includes user authentication and dashboard improvements. Please review and provide feedback.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    isRead: false,
  },
  {
    id: '2',
    sender: 'spam@suspicious-site.com',
    subject: 'URGENT!!! Act Now - Limited Time Offer - Free Money!!!',
    body: 'Congratulations! You have won $1,000,000!!! Click here immediately to claim your prize. This offer expires in 24 hours. Act now before it\'s too late!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: false,
  },
  {
    id: '3',
    sender: 'mom@gmail.com',
    subject: 'Family dinner this weekend',
    body: 'Hi honey, we\'re planning a family dinner this Saturday at 6 PM. Can you make it? Dad is making his famous lasagna. Let me know if you can come!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    isRead: false,
  },
  {
    id: '4',
    sender: 'noreply@amazon.com',
    subject: 'Amazon Prime Day Sale - 50% off Electronics!',
    body: 'Don\'t miss our biggest sale of the year! Get up to 50% off on electronics, 30% off on home goods, and free shipping on all orders. Use coupon code PRIME50.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    isRead: false,
  },
  {
    id: '5',
    sender: 'notifications@linkedin.com',
    subject: 'John Smith liked your post',
    body: 'John Smith and 5 others liked your recent post about "The Future of AI in Software Development". Your post is gaining traction!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    isRead: false,
  },
  {
    id: '6',
    sender: 'sarah.johnson@company.com',
    subject: 'Weekly team meeting - Project status update',
    body: 'Hi team, our weekly meeting is scheduled for tomorrow at 10 AM. We\'ll discuss the current sprint progress, upcoming deadlines, and milestone reviews.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    isRead: false,
  },
  {
    id: '7',
    sender: 'newsletter@techcrunch.com',
    subject: 'TechCrunch Weekly Newsletter - Latest in Tech',
    body: 'This week in tech: New AI breakthroughs, startup funding rounds, and the latest in cryptocurrency. Plus exclusive interviews with top tech CEOs.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: false,
  },
  {
    id: '8',
    sender: 'calendar-notification@google.com',
    subject: 'Reminder: Client meeting in 1 hour',
    body: 'This is a reminder that you have a client meeting scheduled in 1 hour. Location: Conference Room A. Meeting topic: Q4 Strategy Review.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    isRead: false,
  },
  {
    id: '9',
    sender: 'fake-bank@scammer.org',
    subject: 'URGENT: Verify your account now or it will be closed!',
    body: 'Your bank account has been flagged for suspicious activity. Click here immediately to verify your identity or your account will be permanently closed within 24 hours.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    isRead: false,
  },
  {
    id: '10',
    sender: 'bestfriend@yahoo.com',
    subject: 'Birthday party invitation!',
    body: 'Hey! I\'m throwing a birthday party next Saturday at my place. It starts at 7 PM. There will be food, drinks, and good music. Hope you can make it!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(), // 10 hours ago
    isRead: false,
  },
];