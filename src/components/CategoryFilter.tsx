import React from 'react';
import { EmailCategory } from '../types/email';
import { AlertTriangle, Briefcase, User, Tag, Users, Mail, Filter, Check } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategories: EmailCategory[];
  onCategoryToggle: (category: EmailCategory) => void;
  categoryCounts: Record<EmailCategory, number>;
}

const CATEGORY_CONFIG = {
  SPAM: { icon: AlertTriangle, color: 'red', label: 'Spam', gradient: 'from-red-500 to-red-600' },
  WORK: { icon: Briefcase, color: 'blue', label: 'Work', gradient: 'from-blue-500 to-blue-600' },
  PERSONAL: { icon: User, color: 'green', label: 'Personal', gradient: 'from-green-500 to-green-600' },
  PROMOTIONS: { icon: Tag, color: 'orange', label: 'Promotions', gradient: 'from-orange-500 to-orange-600' },
  SOCIAL: { icon: Users, color: 'purple', label: 'Social', gradient: 'from-purple-500 to-purple-600' },
};

export function CategoryFilter({ selectedCategories, onCategoryToggle, categoryCounts }: CategoryFilterProps) {
  const categories = Object.keys(CATEGORY_CONFIG) as EmailCategory[];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Filter Categories</h3>
          <p className="text-sm text-gray-600">Select email types to display</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {categories.map((category) => {
          const config = CATEGORY_CONFIG[category];
          const Icon = config.icon;
          const isSelected = selectedCategories.includes(category);
          const count = categoryCounts[category] || 0;
          
          return (
            <button
              key={category}
              onClick={() => onCategoryToggle(category)}
              className={`w-full group relative overflow-hidden rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                isSelected
                  ? `border-${config.color}-300 bg-gradient-to-r from-${config.color}-50 to-${config.color}-100/50 shadow-lg shadow-${config.color}-500/20`
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/80'
              }`}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                      ? `bg-gradient-to-br ${config.gradient} shadow-lg`
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${
                      isSelected ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                    }`} />
                  </div>
                  <div className="text-left">
                    <span className={`font-semibold transition-colors duration-300 ${
                      isSelected ? `text-${config.color}-800` : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {config.label}
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs font-medium ${
                        isSelected ? `text-${config.color}-600` : 'text-gray-500'
                      }`}>
                        {count} emails
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isSelected 
                      ? `bg-${config.color}-100 text-${config.color}-700 shadow-sm`
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    {count}
                  </span>
                  {isSelected && (
                    <div className={`w-6 h-6 bg-gradient-to-br ${config.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Hover overlay */}
              {!isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => {
            // Toggle all categories
            if (selectedCategories.length === categories.length) {
              // If all selected, deselect all
              categories.forEach(cat => onCategoryToggle(cat));
            } else {
              // If not all selected, select all
              categories.forEach(cat => {
                if (!selectedCategories.includes(cat)) {
                  onCategoryToggle(cat);
                }
              });
            }
          }}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-center space-x-2">
            <Check className="w-4 h-4" />
            <span>
              {selectedCategories.length === categories.length ? 'Deselect All' : 'Select All'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}