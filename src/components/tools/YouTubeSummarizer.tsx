import React, { useState } from 'react';
import { Youtube, Loader2, Volume2, Copy, Check } from 'lucide-react';
import { useCredits } from '../../contexts/creditsContext';

// Define the structure of the summary object
interface Summary {
  mainPoints: string[];
  keyTakeaways: string[];
  conclusion: string;
}

const YouTubeSummarizer = () => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('english');
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [copied, setCopied] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const { updateCredits } = useCredits(); // ✅ Move the hook call to the top level

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSummary(null); // Reset summary to null
    setAudioUrl('');

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await fetch('http://localhost:4000/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token here
        },
        body: JSON.stringify({ url, language }),
      });

      const data = await response.json();

      // Update credits when response is received
      if (data.creditInfo?.remainingCredits !== undefined) {
        updateCredits(data.creditInfo.remainingCredits); // ✅ Use updateCredits here
      }
      if (!response.ok) throw new Error(data.error);

      // Set the structured summary
      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to summarize video');
    } finally {
      setIsLoading(false);
    }
  };

  const generateAudio = async () => {
    if (!summary) return;
    setIsAudioLoading(true);

    try {
      // Convert the structured summary to a string for text-to-speech
      const summaryText = `
        Main Points: ${summary.mainPoints.join('\n')}
        Key Takeaways: ${summary.keyTakeaways.join('\n')}
        Conclusion: ${summary.conclusion}
      `;

      const response = await fetch('http://localhost:4000/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: summaryText }),
      });

      if (!response.ok) throw new Error('Failed to generate audio');

      // Handle the binary audio data
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate audio');
    } finally {
      setIsAudioLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!summary) return;

    // Convert the structured summary to a string for copying
    const summaryText = `
      Main Points: ${summary.mainPoints.join('\n')}
      Key Takeaways: ${summary.keyTakeaways.join('\n')}
      Conclusion: ${summary.conclusion}
    `;

    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6"> {/* Increased max-width */}
      {/* Main Input Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
            <Youtube className="w-6 h-6 text-red-500" />
            YouTube Summarizer
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL here..."
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="italian">Italian</option>
            </select>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Summarize Video'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Summary Card */}
      {summary && (
        <div className="w-1000  bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="p-6 space-y-6">
            <h3 className="text-2xl font-bold text-blue-500 flex items-center gap-2">
              <Youtube className="w-8 h-8 text-red-500" />
              Video Summary
            </h3>

            {/* Copy and Audio Buttons at the Top */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={copyToClipboard}
                className={`p-3 rounded-lg flex items-center gap-2 transition-colors ${
                  copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
                title="Copy to Clipboard"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <button
                onClick={generateAudio}
                disabled={isAudioLoading}
                className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 flex items-center gap-2 text-white transition-colors"
                title="Generate Audio"
              >
                {isAudioLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
                {isAudioLoading ? 'Generating...' : 'Audio'}
              </button>
            </div>
                {/* Audio Player */}
            {audioUrl && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-yellow-400">Audio Summary</h4>
                <audio controls className="w-full mt-2">
                  <source src={audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            {/* Main Points */}
            {summary.mainPoints.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-green-400">Main Points</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {summary.mainPoints.map((point, index) => (
                    <li key={index} className="text-base">{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Takeaways */}
            {summary.keyTakeaways.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-green-400">Key Takeaways</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {summary.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="text-base">{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Conclusion */}
            {summary.conclusion && (
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-green-400">Conclusion</h4>
                <p className="text-base">{summary.conclusion}</p>
              </div>
            )}

            
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeSummarizer;