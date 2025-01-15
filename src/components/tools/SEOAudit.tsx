import React, { useState, useEffect } from 'react';
import { Activity, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '../ui/alert';
import { useCredits } from '../../contexts/creditsContext';

interface MetricBase {
  status: 'good' | 'poor' | 'missing';
  message: string;
  score: number;
  details?: string[];
}

interface SeoData {
  score: number;
  metrics: Record<string, MetricBase>;
}

interface SeoResponse {
  mobile: SeoData;
  desktop: SeoData;
}

const cleanSeoResponse = (response: SeoResponse): SeoResponse => {
  const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;

  const cleanMetrics = (data: SeoData): SeoData => {
    const cleanedMetrics = { ...data };
    
    Object.keys(cleanedMetrics.metrics).forEach(key => {
      const metric = cleanedMetrics.metrics[key];
      
      metric.message = metric.message.replace(urlRegex, '').trim();
      
      if (metric.details) {
        metric.details = metric.details.map(detail => 
          detail.replace(urlRegex, '').trim()
        ).filter(detail => detail.length > 0);
      }
    });
    
    return cleanedMetrics;
  };

  return {
    mobile: cleanMetrics(response.mobile),
    desktop: cleanMetrics(response.desktop)
  };
};

const SEOAudit = () => {
  const [formData, setFormData] = useState({ url: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [auditResult, setAuditResult] = useState<SeoResponse | null>(null);
  const [activeView, setActiveView] = useState<'mobile' | 'desktop' | null>(null);
  const { updateCredits } = useCredits(); // Moved to the top level

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await performAudit();
  };

  const performAudit = async (isRetry = false) => {
    if (!isRetry) {
      setError(null);
      setAuditResult(null);
      setActiveView(null);
    }
    setIsLoading(true);

    try {
      // Validate URL format
      const urlToTest = formData.url.trim();
      if (!urlToTest.startsWith('http://') && !urlToTest.startsWith('https://')) {
        throw new Error('Please enter a valid URL starting with http:// or https://');
      }

      const response = await fetch('http://localhost:4000/api/seo-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlToTest }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a minute and try again.');
        } else if (response.status === 500 && errorData.message?.includes('wait')) {
          throw new Error('API is temporarily unavailable. Please try again in a few moments.');
        } else {
          throw new Error(errorData.message || 'Failed to perform SEO audit');
        }
      }

      const data = await response.json();
      
      // Update credits when response is received
      if (data.creditInfo?.remainingCredits !== undefined) {
        updateCredits(data.creditInfo.remainingCredits);
      }

      const cleanedData = cleanSeoResponse(data);
      setAuditResult(cleanedData);
      setActiveView('mobile');
      setRetryCount(0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      // Increment retry count for certain errors
      if (errorMessage.includes('wait') || errorMessage.includes('rate limit')) {
        setRetryCount(prev => prev + 1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (retryCount < 3) {
      performAudit(true);
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/20 via-transparent to-blue-500/20 rounded-xl" />
        <div className="relative bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-300">
                Website URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-[#91be3f] focus:border-[#91be3f]"
                  placeholder="https://example.com"
                  pattern="https?://.*"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-400">
                Must start with http:// or https://
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#91be3f] text-white font-medium rounded-md hover:bg-[#91be3f]/90 focus:outline-none focus:ring-2 focus:ring-[#91be3f] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !formData.url.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" />
                    Analyzing...
                  </div>
                ) : (
                  'Analyze SEO'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          {/* <AlertTitle>Error</AlertTitle> */}
          <AlertDescription >
            <span>{error}</span>
            {retryCount < 3 && error.includes('wait') && (
              <button
                onClick={handleRetry}
                className="flex items-center px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 rounded-md transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {isLoading && !auditResult && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="animate-spin text-[#91be3f] h-12 w-12" />
          <span className="ml-2 text-gray-300">Fetching SEO data...</span>
        </div>
      )}

      {auditResult && (
        <Tabs 
          defaultValue={activeView || 'mobile'} 
          className="w-full"
          onValueChange={(value) => setActiveView(value as 'mobile' | 'desktop')}
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="mobile">Mobile View</TabsTrigger>
            <TabsTrigger value="desktop">Desktop View</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            {activeView === 'mobile' && (
              <TabsContent value="mobile" key="mobile">
                <MetricsDisplay 
                  data={auditResult.mobile} 
                  isActive={activeView === 'mobile'} 
                />
              </TabsContent>
            )}
            
            {activeView === 'desktop' && (
              <TabsContent value="desktop" key="desktop">
                <MetricsDisplay 
                  data={auditResult.desktop} 
                  isActive={activeView === 'desktop'} 
                />
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      )}
    </div>
  );
};

const MetricsDisplay = ({ data, isActive }: { data: SeoData; isActive: boolean }) => {
  const chartData = Object.entries(data.metrics).map(([key, metric]) => ({
    metric: key.replace(/([A-Z])/g, ' $1').trim(),
    score: metric.score
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Radar Chart Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Overall SEO Performance</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid stroke="#4a5568" />
              <PolarAngleAxis 
                dataKey="metric" 
                stroke="#888888" 
                tick={{ fill: '#888888', fontSize: 12 }} 
              />
              <PolarRadiusAxis 
                stroke="#888888" 
                tick={{ fill: '#888888' }} 
                angle={30} 
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#91be3f"
                fill="#91be3f"
                fillOpacity={0.3}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #4a5568',
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}
                labelStyle={{ color: '#fff' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(data.metrics).map(([key, metric], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MetricCard title={key} metric={metric} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const MetricCard = ({ title, metric }: { title: string; metric: MetricBase }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white capitalize">
          {title.replace(/([A-Z])/g, ' $1').trim()}
        </h3>
        <span className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
          {metric.score}
        </span>
      </div>
      <p className="text-gray-300 mb-4 text-base">{metric.message}</p>
      {metric.details && metric.details.length > 0 && (
        <ul className="space-y-3 text-base text-gray-400">
          {metric.details.map((detail, index) => (
            <li key={index} className="list-disc ml-6">
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SEOAudit;