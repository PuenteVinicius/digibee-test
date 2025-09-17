import { useState, useCallback } from 'react';

export const useDrawerNavigation = (initialLevel = 0) => {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [history, setHistory] = useState<number[]>([initialLevel]);

  const navigateTo = useCallback((level: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentLevel(level);
      setHistory(prev => [...prev, level]);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        const newHistory = history.slice(0, -1);
        setHistory(newHistory);
        setCurrentLevel(newHistory[newHistory.length - 1]);
        setIsTransitioning(false);
      }, 300);
    }
  }, [history]);

  return {
    currentLevel,
    isTransitioning,
    history,
    navigateTo,
    goBack,
    canGoBack: history.length > 1
  };
};