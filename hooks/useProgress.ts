
import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '../types';
import { XP_PER_ARTICLE, XP_PER_QUIZ_CORRECT, XP_FOR_LEVEL_UP, BADGES } from '../constants';

const getInitialProgress = (): UserProgress => {
  try {
    const item = window.localStorage.getItem('userProgress');
    return item ? JSON.parse(item) : {
      level: 1,
      xp: 0,
      streak: 0,
      completedArticles: [],
      badges: [],
    };
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return {
      level: 1,
      xp: 0,
      streak: 0,
      completedArticles: [],
      badges: [],
    };
  }
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem('userProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [progress]);

  const completeArticle = useCallback((articleId: string, correctAnswers: number) => {
    setProgress(currentProgress => {
      if (currentProgress.completedArticles.includes(articleId)) {
        return currentProgress; // Already completed
      }

      let newXp = currentProgress.xp + XP_PER_ARTICLE + (correctAnswers * XP_PER_QUIZ_CORRECT);
      let newLevel = currentProgress.level;
      
      while (newXp >= XP_FOR_LEVEL_UP) {
        newXp -= XP_FOR_LEVEL_UP;
        newLevel += 1;
      }

      const newCompletedArticles = [...currentProgress.completedArticles, articleId];
      const newBadges = [...currentProgress.badges];
      
      const firstReadBadge = BADGES.find(b => b.id === 'first-read');
      if (newCompletedArticles.length === 1 && firstReadBadge && !newBadges.some(b => b.id === 'first-read')) {
          newBadges.push(firstReadBadge);
      }
      
      const fiveReadsBadge = BADGES.find(b => b.id === 'five-reads');
      if (newCompletedArticles.length === 5 && fiveReadsBadge && !newBadges.some(b => b.id === 'five-reads')) {
          newBadges.push(fiveReadsBadge);
      }
      
      const perfectQuizBadge = BADGES.find(b => b.id === 'perfect-quiz');
      if (correctAnswers === 3 && perfectQuizBadge && !newBadges.some(b => b.id === 'perfect-quiz')) {
          newBadges.push(perfectQuizBadge);
      }


      return {
        ...currentProgress,
        xp: newXp,
        level: newLevel,
        completedArticles: newCompletedArticles,
        badges: newBadges
      };
    });
  }, []);

  return { progress, completeArticle };
};
