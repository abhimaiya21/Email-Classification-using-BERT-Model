import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FinancialLandingPage from './components/FinancialLandingPage';
import { Email, ClassificationResult, EmailCategory } from './types/email';
import { ClassificationEngine } from './services/classificationEngine';
import { MOCK_EMAILS } from './data/mockEmails';
import { EmailCard } from './components/EmailCard';
import { EmailDetail } from './components/EmailDetail';
import { CategoryFilter } from './components/CategoryFilter';
import { ClassificationStats } from './components/ClassificationStats';
import { Mail, RefreshCw, Settings, Shield, Zap, Upload, BarChart3, Sparkles } from 'lucide-react';
import Papa from 'papaparse';

function EmailClassifierApp() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [classifications, setClassifications] = useState<Map<string, ClassificationResult>>(new Map());
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<EmailCategory[]>(['SPAM', 'WORK', 'PERSONAL', 'PROMOTIONS', 'SOCIAL']);
  const [isLoading, setIsLoading] = useState(false);
  const [classificationEngine] = useState(() => new ClassificationEngine());

  // Simulate email fetching
  const fetchEmails = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEmails(MOCK_EMAILS);
    setIsLoading(false);
  };

  // Classify emails when they change
  useEffect(() => {
    if (emails.length > 0) {
      const newClassifications = new Map<string, ClassificationResult>();
      emails.forEach(email => {
        const result = classificationEngine.classify(email);
        newClassifications.set(email.id, result);
      });
      setClassifications(newClassifications);
    }
  }, [emails, classificationEngine]);

  // Load emails on mount
  useEffect(() => {
    fetchEmails();
  }, []);

  const handleCategoryToggle = (category: EmailCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Filter emails by selected categories
  const filteredEmails = useMemo(() => {
    return emails.filter(email => {
      const classification = classifications.get(email.id);
      return classification && selectedCategories.includes(classification.category);
    });
  }, [emails, classifications, selectedCategories]);

  // Calculate statistics
  const stats = useMemo(() => {
    const categoryCounts: Record<EmailCategory, number> = {
      SPAM: 0,
      WORK: 0,
      PERSONAL: 0,
      PROMOTIONS: 0,
      SOCIAL: 0,
    };
    let totalConfidence = 0;
    let count = 0;
    emails.forEach(email => {
      const classification = classifications.get(email.id);
      if (classification) {
        categoryCounts[classification.category]++;
        totalConfidence += classification.confidence;
        count++;
      }
    });
    return {
      categoryCounts,
      totalCount: count,
      averageConfidence: count > 0 ? totalConfidence / count : 0,
    };
  }, [emails, classifications]);

  // CSV Upload Handler
  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<any>) => {
        const now = new Date().toISOString();
        const parsedEmails: Email[] = (results.data as any[]).map((row, idx) => ({
          id: row.id || String(idx + 1),
          sender: row.sender || '',
          subject: row.subject || '',
          body: row.body || '',
          timestamp: row.timestamp || now,
          isRead: false,
        }));
        setEmails(parsedEmails);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Email Classifier
                </h1>
                <p className="text-sm text-gray-500 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI-Powered Rule-Based Classification</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200/50">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">{emails.length} emails processed</span>
              </div>
              <button
                onClick={fetchEmails}
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Processing...' : 'Refresh'}
              </button>
              <button className="p-3 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-all duration-300">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced CSV Upload Section */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload Email Data</h3>
                <p className="text-sm text-gray-600">Import emails from CSV file for classification analysis</p>
              </div>
              <div className="flex-shrink-0">
                <label className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose CSV File
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              categoryCounts={stats.categoryCounts}
            />
            <ClassificationStats
              categoryCounts={stats.categoryCounts}
              totalCount={stats.totalCount}
              averageConfidence={stats.averageConfidence}
            />
          </div>
          
          {/* Enhanced Main Content */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="relative">
                    <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
                    <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Emails</h3>
                  <p className="text-gray-600">Fetching and classifying your emails...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Classified Emails
                      </h2>
                      <p className="text-sm text-gray-600">
                        {filteredEmails.length} emails • {selectedCategories.length} categories selected
                      </p>
                    </div>
                  </div>
                  {selectedCategories.length < 5 && (
                    <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
                      <BarChart3 className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-700">
                        Filtered view
                      </span>
                    </div>
                  )}
                </div>
                
                {filteredEmails.length === 0 ? (
                  <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No emails found</h3>
                    <p className="text-gray-600 mb-4">No emails match the selected categories</p>
                    <p className="text-sm text-gray-500">Try selecting more categories or refresh to fetch new emails</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEmails.map(email => {
                      const classification = classifications.get(email.id);
                      if (!classification) return null;
                      return (
                        <EmailCard
                          key={email.id}
                          email={email}
                          classification={classification}
                          onClick={() => setSelectedEmail(email)}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Email Detail Modal */}
      {selectedEmail && (
        <EmailDetail
          email={selectedEmail}
          classification={classifications.get(selectedEmail.id)!}
          onClose={() => setSelectedEmail(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailClassifierApp />} />
        <Route path="/landing" element={<FinancialLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;