
import React from 'react';
import { Article } from '../types';
import { CheckCircleIcon } from './icons';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isCompleted: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelectArticle, isCompleted }) => {
  return (
    <div
      onClick={() => onSelectArticle(article)}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 group"
    >
      <div className="relative">
        <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">{article.category}</div>
        {isCompleted && (
            <div className="absolute bottom-2 right-2 flex items-center bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                <span>Done!</span>
            </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-md text-slate-800 leading-snug">{article.title}</h3>
      </div>
    </div>
  );
};

export default ArticleCard;
