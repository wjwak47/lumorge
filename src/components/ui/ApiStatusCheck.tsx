"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ApiStatusCheckProps {}

const ApiStatusCheck: React.FC<ApiStatusCheckProps> = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // 检查API连接状态
  const checkApiConnection = async () => {
    // 确保仅在客户端运行
    if (typeof window === 'undefined') return;
    
    setIsChecking(true);
    setApiError(null);
    
    // 尝试多个可能的API地址
    const apiUrls = [
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006',
      'http://127.0.0.1:3006',
      window.location.origin
    ].filter(Boolean);
    
    let connected = false;
    let lastError = null;
    
    for (const baseUrl of apiUrls) {
      try {
        // 尝试健康检查端点，如果不存在则尝试根端点
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(`${baseUrl}/api/health`, { 
          signal: controller.signal,
          headers: { 'Cache-Control': 'no-cache' } 
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          console.log(`成功连接到 API 服务器: ${baseUrl}`);
          connected = true;
          break;
        }
      } catch (error: any) {
        try {
          // 尝试根端点
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);
          
          const response = await fetch(`${baseUrl}/api`, { 
            signal: controller.signal,
            headers: { 'Cache-Control': 'no-cache' } 
          });
          clearTimeout(timeoutId);
          
          if (response.ok) {
            console.log(`成功连接到 API 服务器根端点: ${baseUrl}`);
            connected = true;
            break;
          }
        } catch (rootError: any) {
          console.error(`无法连接到 API 服务器: ${baseUrl}`, rootError);
          lastError = rootError;
        }
      }
    }
    
    if (!connected && lastError) {
      // 确定错误类型并显示友好消息
      if (lastError.name === 'AbortError') {
        setApiError('API服务器连接超时，请检查服务器是否已启动。');
      } else if (lastError.message?.includes('Failed to fetch')) {
        setApiError('无法连接到API服务器，请确保服务器已启动并且没有网络限制。');
      } else {
        setApiError(`API连接错误: ${lastError.message || '未知错误'}`);
      }
    }
    
    setIsChecking(false);
  };

  // 处理重试 - Now includes the logic from RootLayout's handleApiRetry
  const handleRetry = () => {
    // 仅在客户端环境中执行
    if (typeof window === 'undefined') return;

    // 清除可能存在的缓存
    try {
      localStorage.removeItem('siteSettings');
      // navigationCache is in-memory in api.ts, page reload will clear it.
      
      // 在清除缓存后刷新页面
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error('Error clearing cache and reloading:', error);
      // Fallback reload if error occurs during cache clear
      window.location.reload();
    }
    
    // Also, re-check the API connection after initiating reload logic (optional, as page will reload)
    // checkApiConnection(); // Commented out as page reload makes this redundant
  };

  // 组件加载时检查API状态 - 仅在客户端执行
  useEffect(() => {
    // 确保仅在客户端执行
    if (typeof window !== 'undefined') {
      checkApiConnection();
    }
  }, []);

  // 如果没有错误，不显示任何内容
  if (!apiError) return null;

  return (
    <div className="fixed bottom-6 right-6 max-w-md bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 z-50 animate-fadeIn">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">API连接问题</h3>
          <div className="mt-1 text-sm text-red-700">
            <p>{apiError}</p>
            <ul className="mt-2 list-disc list-inside text-xs space-y-1">
              <li>确保后台服务器已经启动</li>
              <li>检查网络连接和防火墙设置</li>
              <li>确认端口3006未被其他程序占用</li>
            </ul>
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={handleRetry}
              disabled={isChecking}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isChecking ? (
                <>
                  <RefreshCw className="animate-spin -ml-0.5 mr-2 h-4 w-4" />
                  正在检查...
                </>
              ) : (
                <>
                  <RefreshCw className="-ml-0.5 mr-2 h-4 w-4" />
                  重试连接
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiStatusCheck; 