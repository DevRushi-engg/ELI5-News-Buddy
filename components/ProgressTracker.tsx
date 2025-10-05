
import React from 'react';
import { UserProgress } from '../types';
import { XP_FOR_LEVEL_UP } from '../constants';
import { StarIcon } from './icons';

interface ProgressTrackerProps {
  progress: UserProgress;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const xpPercentage = Math.round((progress.xp / XP_FOR_LEVEL_UP) * 100);

  return (
    <div className="flex items-center space-x-4 sm:space-x-6">
      <div className="flex items-center space-x-2">
        {progress.badges.map(badge => (
            <div key={badge.id} className="group relative">
                <span className="text-2xl" title={badge.name}>{badge.icon}</span>
                <div className="absolute bottom-full mb-2 w-max max-w-xs bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="font-bold">{badge.name}</p>
                    <p>{badge.description}</p>
                </div>
            </div>
        ))}
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-extrabold shadow-md border-2 border-white">
            {progress.level}
          </div>
          <StarIcon className="absolute -top-1 -right-1 h-5 w-5 text-yellow-400" />
        </div>
        <div className="w-24 sm:w-32">
          <div className="text-sm font-bold text-slate-600">XP: {progress.xp} / {XP_FOR_LEVEL_UP}</div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
