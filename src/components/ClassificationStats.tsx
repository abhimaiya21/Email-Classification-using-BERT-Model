import React from 'react';
import { EmailCategory } from '../types/email';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Target, Activity } from 'lucide-react';

interface ClassificationStatsProps {
  categoryCounts: Record<EmailCategory, number>;
  totalCount: number;
  averageConfidence: number;
}

const CATEGORY_COLORS = {
  SPAM: 'from-red-500 to-red-600',
  WORK: 'from-blue-500 to-blue-600',
  PERSONAL: 'from-green-500 to-green-600',
  PROMOTIONS: 'from-orange-500 to-orange-600',
  SOCIAL: 'from-purple-500 to-purple-600',
};

const CATEGORY_LABELS = {
  SPAM: 'Spam',
  WORK: 'Work',
  PERSONAL: 'Personal',
  PROMOTIONS: 'Promotions',
  SOCIAL: 'Social',
};

export function ClassificationStats({ categoryCounts, totalCount, averageConfidence }: ClassificationStatsProps) {
  const maxCount = Math.max(...Object.values(categoryCounts));
  
  const spamCount = categoryCounts.SPAM || 0;
  const spamPercentage = totalCount > 0 ? (spamCount / totalCount) * 100 : 0;
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Analytics</h3>
          <p className="text-sm text-gray-600">Classification insights</p>
        </div>
      </div>
      
      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Avg Confidence</span>
              <p className="text-xl font-bold text-blue-900 mt-1">
                {(averageConfidence * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -translate-y-8 translate-x-8"></div>
        </div>
        
        <div className={`group relative overflow-hidden rounded-xl p-4 border transition-all duration-300 transform hover:scale-[1.02] ${
          spamPercentage > 30 
            ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200/50 hover:shadow-lg' 
            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50 hover:shadow-lg'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
              spamPercentage > 30 
                ? 'bg-gradient-to-br from-red-500 to-pink-600' 
                : 'bg-gradient-to-br from-green-500 to-emerald-600'
            }`}>
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className={`text-xs font-semibold uppercase tracking-wide ${
                spamPercentage > 30 ? 'text-red-700' : 'text-green-700'
              }`}>
                Spam Rate
              </span>
              <p className={`text-xl font-bold mt-1 ${
                spamPercentage > 30 ? 'text-red-900' : 'text-green-900'
              }`}>
                {spamPercentage.toFixed(1)}%
              </p>
            </div>
          </div>
          <div className={`absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-8 translate-x-8 ${
            spamPercentage > 30 
              ? 'bg-gradient-to-br from-red-500/10 to-pink-500/10' 
              : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
          }`}></div>
        </div>
      </div>
      
      {/* Enhanced Category Distribution */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-4 h-4 text-gray-600" />
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Category Distribution</h4>
        </div>
        {Object.entries(categoryCounts).map(([category, count]) => {
          const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
          const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
          
          return (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 bg-gradient-to-r ${CATEGORY_COLORS[category as EmailCategory]} rounded-full`}></div>
                  <span className="text-sm font-semibold text-gray-700">{CATEGORY_LABELS[category as EmailCategory]}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                  <span className="text-xs text-gray-500 ml-1">({percentage.toFixed(1)}%)</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 bg-gradient-to-r ${CATEGORY_COLORS[category as EmailCategory]} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {totalCount === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600">Upload emails to see classification analytics</p>
        </div>
      )}
      
      {/* Total Count Badge */}
      {totalCount > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-gray-700">
              {totalCount} total emails analyzed
            </span>
          </div>
        </div>
      )}
    </div>
  );
}