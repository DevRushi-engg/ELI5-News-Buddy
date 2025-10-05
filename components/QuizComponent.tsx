
import React, { useState } from 'react';
import { Article } from '../types';
import { CheckIcon, CloseIcon as XIcon, BrainIcon, SparklesIcon } from './icons';

interface QuizComponentProps {
  article: Article;
  onQuizComplete: (articleId: string, score: number) => void;
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

const QuizComponent: React.FC<QuizComponentProps> = ({ article, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = article.quiz[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    if (option === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setAnswerStatus('unanswered');
    if (currentQuestionIndex < article.quiz.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) {
      return 'bg-white hover:bg-slate-100 text-slate-700';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-500 text-white';
    }
    if (option === selectedAnswer) {
      return 'bg-red-500 text-white';
    }
    return 'bg-slate-200 text-slate-500 cursor-not-allowed';
  };
  
  if (isQuizFinished) {
    return (
        <div className="bg-blue-100/50 p-6 rounded-2xl text-center h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Quiz Complete!</h3>
            <SparklesIcon className="h-12 w-12 text-yellow-500 mx-auto my-4" />
            <p className="text-lg text-blue-700">You scored <span className="font-extrabold">{score}</span> out of <span className="font-extrabold">{article.quiz.length}</span>!</p>
            <button
                onClick={() => onQuizComplete(article.id, score)}
                className="mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform hover:scale-105"
            >
                Claim Your XP & Finish
            </button>
        </div>
    );
  }

  return (
    <div className="bg-slate-100/70 p-6 rounded-2xl h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center">
        <BrainIcon className="h-5 w-5 mr-2 text-blue-600" />
        Knowledge Check!
      </h3>
      <p className="text-sm text-slate-500 mb-4">Question {currentQuestionIndex + 1} of {article.quiz.length}</p>

      <div className="flex-1">
        <p className="font-semibold text-slate-700 text-lg mb-4">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map(option => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className={`w-full text-left p-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-between text-md shadow-sm ${getButtonClass(option)}`}
            >
              <span>{option}</span>
              {selectedAnswer && option === currentQuestion.correctAnswer && <CheckIcon className="h-5 w-5" />}
              {selectedAnswer && option === selectedAnswer && option !== currentQuestion.correctAnswer && <XIcon className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </div>
      
      {selectedAnswer && (
        <div className="mt-4 text-center">
            <button
                onClick={handleNext}
                className="bg-blue-600 text-white font-bold py-2 px-8 rounded-full hover:bg-blue-700 transition-transform hover:scale-105"
            >
                {currentQuestionIndex < article.quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
