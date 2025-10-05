import React, { useState } from 'react';
import { processArticleWithAI } from '../services/geminiService';
import { Article, Category } from '../types';
import { CATEGORIES } from '../constants';
import { PaperAirplaneIcon, LoaderIcon, LinkIcon } from './icons';

interface ArticleSubmitFormProps {
  onAddArticle: (article: Article) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const ArticleSubmitForm: React.FC<ArticleSubmitFormProps> = ({ onAddArticle, isSubmitting, setIsSubmitting }) => {
  const [category, setCategory] = useState<Category>(CATEGORIES[1]);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
        setError('Please enter a valid URL.');
        return;
    }

    setIsSubmitting(true);
    
    let submissionTitle: string;
    let submissionText: string;

    try {
        // Using a public CORS proxy. In a real production app, this should be a secure backend service.
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        submissionTitle = doc.querySelector('h1')?.innerText || doc.title;
        
        let mainContent = doc.querySelector('article')?.innerText;
        if (!mainContent) {
            mainContent = Array.from(doc.querySelectorAll('p')).map(p => p.innerText).join('\n\n');
        }
        if (!submissionTitle || !mainContent) throw new Error('Could not automatically extract content from the URL.');
        
        submissionText = mainContent;

    } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch and parse URL.';
        setError(message);
        setIsSubmitting(false);
        return;
    }


    try {
      const processedData = await processArticleWithAI(submissionText, submissionTitle, category);
      const newArticle: Article = {
        id: `custom-${Date.now()}`,
        ...processedData,
      };
      onAddArticle(newArticle);
      setUrl('');
    } catch (err) {
      setError('Could not process the article with AI. Please try again.');
      console.error(err);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md sticky top-24">
      <h2 className="text-xl font-bold mb-4 text-slate-700 flex items-center">
        <LinkIcon className="h-6 w-6 mr-2 text-blue-600" />
        Simplify Article from Link
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="url" className="block text-sm font-medium text-slate-600 mb-1">Article URL</label>
            <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/news/article"
                disabled={isSubmitting}
            />
             <p className="text-xs text-slate-500 mt-2">We'll try to automatically extract the title and text. This works best on simple article pages.</p>
        </div>
        
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-600 mb-1">Category</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                disabled={isSubmitting}
            >
                {CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
        </div>
        {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-md">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <LoaderIcon className="animate-spin h-5 w-5 mr-3" />
              Creating Story...
            </>
          ) : (
            <>
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Simplify & Add
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ArticleSubmitForm;