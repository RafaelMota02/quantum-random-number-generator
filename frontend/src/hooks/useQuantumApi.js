import { useState, useCallback } from 'react';
import { generateRandomNumber } from '../utils/api.js';
import { getErrorMessage } from '../utils/helpers.js';
import { ERROR_TYPES } from '../utils/constants.js';

/**
 * Custom hook for quantum API interactions with error handling
 * @returns {Object}
 */
export const useQuantumApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastNumber, setLastNumber] = useState('?');

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Generate a new quantum random number
   * @returns {Promise<number|null>}
   */
  const generateNumber = useCallback(async () => {
    if (loading) return null; // Prevent multiple simultaneous requests

    setLoading(true);
    setError(null);
    setLastNumber('...');

    try {
      const response = await generateRandomNumber();
      const randomNumber = response.random_number;

      setLastNumber(randomNumber.toString());
      return randomNumber;
    } catch (err) {
      const errorMessage = err.message;
      const userFriendlyMessage = getErrorMessage(errorMessage.split('_')[0].toUpperCase()); // Convert to error type

      setError(userFriendlyMessage);
      setLastNumber('Error');
      console.error('Quantum API error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return {
    loading,
    error,
    lastNumber,
    generateNumber,
    clearError,
    hasError: !!error,
  };
};
