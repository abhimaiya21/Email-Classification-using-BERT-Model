import React from 'react';
import { Email, ClassificationResult, MatchedRule } from '../types/email';
import { X, Mail, Clock, User, Target, AlertCircle, CheckCircle2, Shield, BarChart3, Zap } from 'lucide-react';

interface EmailDetailProps {
  email: Email;
  classification: ClassificationResult;
  onClose: () => void;
}

const CATEGORY_COLORS = {
  SPAM: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200',
  WORK: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200',
  PERSONAL: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200',
  PROMOTIONS: 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border-orange-200',
  SOCIAL: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200',
};

const MATCH_TYPE_COLORS = {
  subject: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800',
  body: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800',
  sender: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800',
  pattern: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800',
};

const CATEGORY_GRADIENTS = {
  SPAM: 'from-red-500 to-red-600',
  WORK: 'from-blue-500 to-blue-600',
  PERSONAL: 'from-green-500 to-green-600',
  PROMOTIONS: 'from-orange-500 to-orange-600',
  SOCIAL: 'from-purple-500 to-purple-600',
};

export function EmailDetail({ email, classification, onClose }: EmailDetailProps) {
  const categoryColor = CATEGORY_COLORS[classification.category];
  const categoryGradient = CATEGORY_GRADIENTS[classification.category];
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const renderMatchedRule = (rule: MatchedRule, index: number) => (
    <div key={index} className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900">{rule.ruleName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            {(rule.weight * 100).toFixed(0)}%
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 mb-3">
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${MATCH_TYPE_COLORS[rule.matchType]} shadow-sm`}>
          {rule.matchType}
        </span>
        <span className="text-sm text-gray-600 font-medium">
          Matched: "{rule.matchedContent}"
        </span>
      </div>
      
      <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg font-mono">
        Rule ID: {rule.ruleId}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden border border-gray-200/50">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Email Classification Details</h2>
              <p className="text-sm text-gray-600">Detailed analysis and rule matching</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Enhanced Email Header */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 mb-8 border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${categoryGradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {email.sender.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm">
                    <Shield className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{email.sender}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(email.timestamp)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${categoryColor} shadow-sm`}>
                  {classification.category}
                </span>
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1.5 rounded-full">
                    <Zap className="w-3 h-3 text-blue-600" />
                    <span className="text-sm font-bold text-blue-700">
                      {(classification.confidence * 100).toFixed(1)}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
              {email.subject}
            </h3>
          </div>

          {/* Enhanced Email Body */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Email Content</h4>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
                {email.body}
              </p>
            </div>
          </div>

          {/* Enhanced Classification Results */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Classification Results</h4>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-blue-900 mb-2">AI Explanation</p>
                  <p className="text-blue-800 text-base leading-relaxed">
                    {classification.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Matched Rules */}
          {classification.matchedRules.length > 0 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">
                  Matched Rules ({classification.matchedRules.length})
                </h4>
              </div>
              <div className="space-y-4">
                {classification.matchedRules.map((rule, index) => renderMatchedRule(rule, index))}
              </div>
            </div>
          )}

          {classification.matchedRules.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl border border-gray-200/50">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Specific Rules Matched</h3>
              <p className="text-gray-600 mb-2">This email was classified based on default category assignment.</p>
              <p className="text-sm text-gray-500">The classification engine used general patterns and heuristics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}