import React, { useState, useEffect, useCallback } from 'react';
// FIX: `Partial` is a built-in TypeScript utility type and should not be imported.
import { Article, Language } from '../types';
import QuizComponent from './QuizComponent';
import AudioPlayer from './AudioPlayer';
import LanguageSelector from './LanguageSelector';
import { translateText, generateImagePrompt, generateIllustration } from '../services/geminiService';
import { LANGUAGES } from '../constants';
import { CloseIcon, SparklesIcon, PictureIcon, CheckCircleIcon, RefreshIcon, LoaderIcon } from './icons';

interface ArticleDetailViewProps {
  article: Article;
  onClose: () => void;
  onQuizComplete: (articleId: string, score: number) => void;
  isCompleted: boolean;
  onUpdateArticle: (articleId: string, updates: Partial<Article>) => void;
}

const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ article, onClose, onQuizComplete, isCompleted, onUpdateArticle }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);
  const [displayText, setDisplayText] = useState(article.simplifiedText);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  const handleTranslate = useCallback(async (lang: Language) => {
      setCurrentLanguage(lang);
      if (lang.code === 'en-US') {
          setDisplayText(article.simplifiedText);
          return;
      }
      setIsTranslating(true);
      try {
        const translated = await translateText(article.simplifiedText, lang.name);
        setDisplayText(translated);
      } catch (error) {
        console.error("Translation failed", error);
        setDisplayText("Sorry, translation failed. Please try again.");
      } finally {
          setIsTranslating(false);
      }
  }, [article.simplifiedText]);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
        // FIX: The `generateImagePrompt` function requires both the original and simplified text.
        const newPrompt = await generateImagePrompt(article.originalText, article.simplifiedText);
        const newImageUrl = await generateIllustration(newPrompt);
        onUpdateArticle(article.id, { illustrationPrompt: newPrompt, imageUrl: newImageUrl });
    } catch (error) {
        console.error("Failed to regenerate illustration", error);
    } finally {
        setIsRegenerating(false);
    }
  };
  
  useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
          document.body.style.overflow = 'auto';
      }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <header className="p-4 sm:p-6 border-b flex justify-between items-start">
            <div>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">{article.category}</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{article.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
              <CloseIcon className="h-6 w-6 text-slate-500" />
            </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="relative group">
                <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover rounded-2xl mb-4" />
                <button 
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="absolute bottom-6 right-2 bg-white/70 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all disabled:opacity-50 disabled:cursor-wait opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Regenerate Illustration"
                >
                  {isRegenerating ? <LoaderIcon className="h-5 w-5 animate-spin text-slate-700"/> : <RefreshIcon className="h-5 w-5 text-slate-700"/>}
                </button>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-slate-800 flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2 text-yellow-500" />
                    Simplified Story
                </h3>
                <LanguageSelector selectedLanguage={currentLanguage} onSelectLanguage={handleTranslate} />
              </div>
              <div className="bg-slate-100 p-4 rounded-xl text-slate-700 leading-relaxed min-h-[150px]">
                {isTranslating ? <div className="animate-pulse">Translating...</div> : <p>{displayText}</p>}
              </div>
              <AudioPlayer textToRead={displayText} lang={currentLanguage.code} />
               <div className="mt-4 bg-purple-100/50 p-4 rounded-xl">
                  <h4 className="font-bold text-purple-800 flex items-center mb-1">
                      <PictureIcon className="h-5 w-5 mr-2 text-purple-600"/>
                      Illustration Idea
                  </h4>
                  <p className="text-sm text-purple-700 italic">{article.illustrationPrompt}</p>
              </div>
            </div>
            
            <div>
              {isCompleted ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-r-lg flex flex-col items-center justify-center h-full text-center">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold">Great Job!</h3>
                    <p className="mt-2">You've already completed this article and its quiz. Keep exploring new ones!</p>
                </div>
              ) : (
                <QuizComponent article={article} onQuizComplete={onQuizComplete} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailView;