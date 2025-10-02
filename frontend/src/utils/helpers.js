/**
 * Sleep function for delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Capitalize first letter of string
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Get error message from error type
 * @param {string} errorType
 * @returns {string}
 */
export const getErrorMessage = (errorType) => {
  const messages = {
    NETWORK_ERROR: 'Unable to connect to the quantum server. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timed out. The quantum computation is taking longer than usual.',
    SERVER_ERROR: 'The quantum service is currently unavailable. Please try again later.',
    VALIDATION_ERROR: 'Invalid response received from the server.',
    GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  };
  return messages[errorType] || messages.GENERIC_ERROR;
};

/**
 * Validate API response format
 * @param {any} data
 * @returns {boolean}
 */
export const validateResponse = (data) => {
  return data && typeof data === 'object' && typeof data.random_number === 'number';
};

/**
 * Truncate history array to keep max items
 * @param {Array} history
 * @param {number} maxItems
 * @returns {Array}
 */
export const truncateHistory = (history, maxItems = 5) => {
  return history.slice(0, maxItems);
};
