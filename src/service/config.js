const currentUrl = window.location.hostname;

export const URL = process.env.NODE_ENV === 'production' ? `https://${currentUrl}` : 'http://localhost:3000';