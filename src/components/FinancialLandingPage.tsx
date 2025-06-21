import React from 'react';
import { Mail, Shield, TrendingUp, Users, ArrowRight, Star, CheckCircle, Zap } from 'lucide-react';

const stats = [
  { title: 'U Cap', value: '$2.8B', desc: 'Interest Paid', metric: 'Return', subvalue: '15.8%', dark: false, icon: TrendingUp },
  { title: 'APAC', value: '$89M', desc: 'Amount Paid', metric: 'Interest Paid', subvalue: '7.2%', dark: true, icon: Shield },
  { title: 'Long-term', value: '$4.3B', desc: 'Invested Amount', metric: 'Return', subvalue: '12.8%', dark: false, icon: Users },
  { title: 'Users', value: '8.2M', desc: 'Portfolio Added', metric: 'User on Average', subvalue: '56K/M', dark: false, icon: Zap },
];

const trustBadges = [
  { icon: <Shield className="w-5 h-5 text-blue-600" />, text: '24/7 Free Support', color: 'blue' },
  { icon: <TrendingUp className="w-5 h-5 text-green-600" />, text: 'Guaranteed Growth', color: 'green' },
  { icon: <Users className="w-5 h-5 text-purple-600" />, text: '100 USD Cashback', color: 'purple' },
];

export default function FinancialLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Enhanced Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Curve Network Inc
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-base text-gray-700 font-medium">
            <a href="#services" className="hover:text-blue-600 transition-colors duration-200">Services</a>
            <a href="#process" className="hover:text-blue-600 transition-colors duration-200">Our Process</a>
            <a href="#case-study" className="hover:text-blue-600 transition-colors duration-200">Case Study</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="h-10 px-6 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium transition-all duration-300 shadow-sm hover:shadow-md">
              Register
            </button>
            <button className="h-10 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="w-full flex flex-col items-center py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Trusted by 8.2M+ users worldwide</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight mb-4">
              Now Secure Your Money
            </h1>
            <h2 className="text-2xl md:text-3xl font-normal text-gray-700 mb-6">
              With Our Experts
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Grow your investments faster without any risk. Our AI-powered platform ensures maximum returns with complete security.
            </p>
          </div>
          
          {/* Enhanced Email Form */}
          <form className="flex flex-col sm:flex-row items-center justify-center w-full max-w-xl mx-auto mb-8 gap-4">
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-base bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-500"
              />
            </div>
            <button 
              type="submit" 
              className="h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-base border border-transparent shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>Sign Up</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          
          {/* Enhanced Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8 mb-10">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className={`w-8 h-8 bg-gradient-to-br from-${badge.color}-500 to-${badge.color}-600 rounded-lg flex items-center justify-center`}>
                  {badge.icon}
                </div>
                <span className="text-gray-700 font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Most Popular Investments</h3>
            <p className="text-gray-600">Discover our top-performing investment options</p>
          </div>
          <a href="#view-all" className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl p-6 min-h-[200px] border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                  stat.dark 
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700' 
                    : 'bg-white/80 backdrop-blur-sm text-gray-900 border-gray-200/50 hover:border-blue-300/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-sm font-semibold ${
                    stat.dark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {stat.title}
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    stat.dark 
                      ? 'bg-white/10 text-white' 
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-2 ${
                  stat.dark ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  stat.dark ? 'text-gray-300' : 'text-gray-600'
                } mb-4`}>
                  {stat.desc}
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/20">
                  <div className={`text-sm ${
                    stat.dark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {stat.metric}
                  </div>
                  <div className={`text-sm font-bold ${
                    stat.dark ? 'text-white' : 'text-blue-600'
                  }`}>
                    {stat.subvalue}
                  </div>
                </div>
                
                {/* Hover overlay effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  stat.dark 
                    ? 'bg-gradient-to-r from-white/5 to-transparent' 
                    : 'bg-gradient-to-r from-blue-500/5 to-indigo-500/5'
                }`}></div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
} 