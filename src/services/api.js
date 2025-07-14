// services/api.js
import Logger from '../utils/logger';


const SHORT_URL_KEY = 'shortenedLinks';

export const shortenUrls = async (urlList) => {
  const existing = JSON.parse(localStorage.getItem(SHORT_URL_KEY)) || [];

  const newEntries = urlList.map((item) => {
    const shortcode = item.customCode || generateShortcode();
    const validity = item.validity || 30;

    // Check if custom shortcode is already taken
    const duplicate = existing.find(link => link.shortcode === shortcode);
    if (duplicate && item.customCode) {
        Logger.error('Duplicate shortcode found', shortcode);
      throw new Error(`Shortcode "${shortcode}" is already in use.`);
    }

    return {
      longUrl: item.longUrl,
      shortcode,
      validity,
      createdAt: Date.now()
    };
  });

  const updated = [...existing, ...newEntries];
  localStorage.setItem(SHORT_URL_KEY, JSON.stringify(updated));

  Logger.info('Shortened URLs saved', newEntries);
  return newEntries;
};

export const getOriginalUrl = async (shortcode) => {
  const all = JSON.parse(localStorage.getItem(SHORT_URL_KEY)) || [];
  const match = all.find(link => link.shortcode === shortcode);

  if (!match) {
    throw new Error('Shortcode not found');
  }

  // Check if expired
  const expiryTime = match.createdAt + match.validity * 60 * 1000;
  if (Date.now() > expiryTime) {
    throw new Error('Link expired');
  }

  return match.longUrl;
};

const generateShortcode = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};
