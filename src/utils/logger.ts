/**
 * 统一的日志管理工具
 * 根据环境变量控制日志输出
 */

const isDev = process.env.NODE_ENV === 'development';
const isClient = typeof window !== 'undefined';

export const logger = {
  /**
   * 调试日志 - 仅开发环境输出
   */
  log: (...args: any[]) => {
    if (isDev && isClient) {
      console.log(...args);
    }
  },

  /**
   * 警告日志 - 仅开发环境输出
   */
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  /**
   * 错误日志 - 所有环境都输出
   */
  error: (...args: any[]) => {
    console.error(...args);
  },

  /**
   * 信息日志 - 仅开发环境输出
   */
  info: (...args: any[]) => {
    if (isDev && isClient) {
      console.info(...args);
    }
  },

  /**
   * API请求日志 - 仅开发环境输出
   */
  api: (method: string, url: string, data?: any) => {
    if (isDev && isClient) {
      console.log(`[API] ${method} ${url}`, data || '');
    }
  },

  /**
   * 性能日志 - 仅开发环境输出
   */
  perf: (label: string, duration: number) => {
    if (isDev && isClient) {
      console.log(`[PERF] ${label}: ${duration.toFixed(2)}ms`);
    }
  }
};

export default logger;

