export const API_BASE_URL = import.meta.env.PROD
  ? 'https://quantum-random-number-generator-cio3.onrender.com' // Production API URL
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  GENERATE: '/generate',
};

export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  SERVER: 'SERVER_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
};

export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // ms
  TIMEOUT: 10000, // ms
};

export const LOCAL_STORAGE_KEYS = {
  NUMBER_HISTORY: 'quantumRandomHistory',
};
