import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../utils/constants.js';
import { truncateHistory } from '../utils/helpers.js';

/**
 * Custom hook for managing number history with localStorage persistence
 * @param {number} maxItems
 * @returns {Object}
 */
export const useHistory = (maxItems = 5) => {
  const [history, setHistory] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.NUMBER_HISTORY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(truncateHistory(parsed, maxItems));
        }
      }
    } catch (error) {
      console.warn('Failed to load history from localStorage:', error);
    }
  }, [maxItems]);

  // Save to localStorage when history changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.NUMBER_HISTORY, JSON.stringify(history));
    } catch (error) {
      console.warn('Failed to save history to localStorage:', error);
    }
  }, [history]);

  /**
   * Add new number to history
   * @param {number} number
   */
  const addNumber = (number) => {
    setHistory(prev => truncateHistory([number, ...prev], maxItems));
  };

  /**
   * Clear all history
   */
  const clearHistory = () => {
    setHistory([]);
  };

  /**
   * Remove specific number from history
   * @param {number} number
   */
  const removeNumber = (number) => {
    setHistory(prev => prev.filter(n => n !== number));
  };

  return {
    history,
    addNumber,
    clearHistory,
    removeNumber,
    hasHistory: history.length > 0,
  };
};
