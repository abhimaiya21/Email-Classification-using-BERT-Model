import React from 'react';
import { Email, ClassificationResult } from '../types/email';
import { Mail, Clock, User, AlertTriangle, CheckCircle, ChevronRight, Eye } from 'lucide-react';

interface EmailCardProps {
  email: Email;
  classification: ClassificationResult;
  onClick: () => void;
}

const CATEGORY_COLORS = {
  SPAM: 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200',
  WORK: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200',
  PERSONAL: 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200',
  PROMOTIONS: 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200',
  SOCIAL: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200',
};

const CATEGORY_ICONS = {
  SPAM: AlertTriangle,
  WORK: CheckCircle,
  PERSONAL: User,
  PROMOTIONS: Mail,
  SOCIAL: Mail,
};

const CATEGORY_GRADIENTS = {
  SPAM: 'from-red-500 to-red-600',
  WORK: 'from-blue-500 to-blue-600',
  PERSONAL: 'from-green-500 to-green-600',
  PROMOTIONS: 'from-orange-500 to-orange-600',
  SOCIAL: 'from-purple-500 to-purple-600',
};

export function EmailCard({ email, classification, onClick }: EmailCardProps) {
  const categoryColor = CATEGORY_COLORS[classification.category];
  const CategoryIcon = CATEGORY_ICONS[classification.category];
  const categoryGradient = CATEGORY_GRADIENTS[classification.category];
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:border-blue-300/50 hover:bg-white/90 transform hover:-translate-y-1"
    >
      {/* Unread indicator */}
      {!email.isRead && (
        <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="flex-shrink-0 relative">
            <div className={`w-12 h-12 bg-gradient-to-br ${categoryGradient} rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-lg`}>
              {email.sender.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
              <CategoryIcon className="w-2.5 h-2.5 text-gray-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
              {email.sender}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">
                {formatTime(email.timestamp)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${categoryColor} shadow-sm`}>
            <CategoryIcon className="w-3 h-3 mr-1.5" />
            {classification.category}
          </span>
          <div className="text-right">
            <div className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
              {(classification.confidence * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors leading-tight">
          {truncateText(email.subject, 80)}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {truncateText(email.body, 150)}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1.5 rounded-full">
            <Eye className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">
              {classification.matchedRules.length} rule{classification.matchedRules.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400 group-hover:text-blue-600 transition-colors">
          <span className="font-medium">View details</span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}