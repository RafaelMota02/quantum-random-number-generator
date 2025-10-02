import { API_BASE_URL, API_ENDPOINTS, ERROR_TYPES, RETRY_CONFIG } from './constants.js';
import { sleep, validateResponse } from './helpers.js';

/**
 * Create AbortController for timeout handling
 * @param {number} timeoutMs
 * @returns {AbortController}
 */
const createTimeoutController = (timeoutMs) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  controller.timeoutId = timeoutId;
  return controller;
};

/**
 * Determine error type from fetch error
 * @param {Error} error
 * @returns {string}
 */
const getErrorType = (error) => {
  if (error.name === 'AbortError') return ERROR_TYPES.TIMEOUT;
  if (error.message.includes('fetch')) return ERROR_TYPES.NETWORK;
  return ERROR_TYPES.GENERIC_ERROR;
};

/**
 * Make API request with retry logic
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<object>}
 */
const makeRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = createTimeoutController(RETRY_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    clearTimeout(controller.timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!validateResponse(data)) {
      throw new Error('Invalid response format');
    }

    return data;
  } catch (error) {
    clearTimeout(controller.timeoutId);

    if (error.name === 'AbortError') {
      throw new Error(getErrorType(error));
    }

    // For network or other errors, throw with classification
    if (error.message.startsWith('Failed to fetch')) {
      throw new Error(ERROR_TYPES.NETWORK);
    }
    if (error.message.startsWith('HTTP')) {
      throw new Error(ERROR_TYPES.SERVER);
    }
    throw error;
  }
};

/**
 * Make request with retry logic
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<object>}
 */
export const apiRequest = async (endpoint, options = {}) => {
  let lastError;

  for (let attempt = 1; attempt <= RETRY_CONFIG.MAX_RETRIES; attempt++) {
    try {
      return await makeRequest(endpoint, options);
    } catch (error) {
      lastError = error;

      // Don't retry on certain errors
      if (error.message.includes('TIMEOUT') || error.message.includes('NETWORK')) {
        throw error;
      }

      // Wait before retrying (exponential backoff could be added)
      if (attempt < RETRY_CONFIG.MAX_RETRIES) {
        await sleep(RETRY_CONFIG.RETRY_DELAY);
      }
    }
  }

  throw lastError;
};

/**
 * Generate quantum random number
 * @returns {Promise<{random_number: number}>}
 */
export const generateRandomNumber = () => {
  return apiRequest(API_ENDPOINTS.GENERATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
