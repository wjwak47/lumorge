/**
 * 设置缓存管理模块
 * 用于在localStorage中存储和检索网站设置
 */

const SETTINGS_CACHE_KEY = 'websiteSettings';
const DEFAULT_CACHE_TTL = 3600000; // 1小时缓存过期时间(毫秒)

/**
 * 获取缓存的设置
 * @param key 可选的特定设置键名
 * @returns 缓存的设置对象或undefined
 */
export const getCachedSettings = (key?: string): any => {
  try {
    const cachedData = localStorage.getItem(SETTINGS_CACHE_KEY);
    if (!cachedData) return undefined;
    
    const data = JSON.parse(cachedData);
    
    // 检查缓存是否过期
    if (!data.timestamp || Date.now() - data.timestamp > DEFAULT_CACHE_TTL) {
      console.log('Settings cache expired');
      return undefined;
    }
    
    // 返回特定键名的设置或全部设置
    if (key && data.settings) {
      return data.settings[key];
    }
    
    return data.settings;
  } catch (error) {
    console.error('Error reading cached settings:', error);
    return undefined;
  }
};

/**
 * 保存设置到缓存
 * @param settings 设置对象 
 * @returns 是否成功保存
 */
export const cacheSettings = (settings: any): boolean => {
  try {
    // 仅在浏览器环境中才使用localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify({
        settings,
        timestamp: Date.now()
      }));
      return true;
    } else {
      // 在服务器端，可以选择不执行任何操作，或者记录一条消息
      console.log('[cacheSettings] Skipping localStorage in server context.');
      return false; // 表示未在服务器端缓存
    }
  } catch (error) {
    console.error('Error caching settings:', error);
    return false;
  }
};

/**
 * 清除设置缓存
 */
export const clearSettingsCache = (): void => {
  try {
    localStorage.removeItem(SETTINGS_CACHE_KEY);
  } catch (error) {
    console.error('Error clearing settings cache:', error);
  }
};

/**
 * 检查是否有设置缓存
 * @returns 是否存在有效的设置缓存
 */
export const hasValidCache = (): boolean => {
  return getCachedSettings() !== undefined;
};

export default {
  getCachedSettings,
  cacheSettings,
  clearSettingsCache,
  hasValidCache
}; 