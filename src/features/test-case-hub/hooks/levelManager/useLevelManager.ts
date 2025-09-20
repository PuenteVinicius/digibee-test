import { useState, useCallback } from "react";
import { CreateLevels } from "./types";

interface UseLevelProps {
  initialLevel: CreateLevels;
}

const useLevelManager = ({
  initialLevel = CreateLevels.MAIN,
}: UseLevelProps) => {
  const [currentLevel, setCurrentLevel] = useState<CreateLevels>(initialLevel);
  const [history, setHistory] = useState<CreateLevels[]>([initialLevel]);

  const navigateTo = useCallback((level: CreateLevels) => {
    setCurrentLevel(level);
    setHistory((prev) => [...prev, level]);
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentLevel(newHistory[newHistory.length - 1]);
    }
  }, [history]);

  return {
    currentLevel,
    history,
    navigateTo,
    goBack,
    canGoBack: history.length > 1,
  };
};

export default useLevelManager;
