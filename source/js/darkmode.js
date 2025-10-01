!function(){
  // 主题存储键名和媒体查询
  const storageKey = 'stellar-theme';
  const darkModeMediaQuery = matchMedia('(prefers-color-scheme: dark)');
  
  // 确保Toast容器存在
  function createToast() {
    // 如果已经存在则返回
    if (document.getElementById('theme-toast')) {
      return document.getElementById('theme-toast');
    }
    
    // 创建Toast元素
    const toast = document.createElement('div');
    toast.id = 'theme-toast';
    document.body.appendChild(toast);
    return toast;
  }
  
  // 显示通知
  function showToast(html, duration = 2000) {
    const toast = createToast();
    toast.innerHTML = html;
    toast.classList.add('show');
    
    // 自动隐藏
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
  
  // 设置主题（添加showToastFlag参数控制是否显示提示）
  function setTheme(theme, showToastFlag = false) {
    // 应用主题到HTML元素
    document.documentElement.setAttribute('data-theme', theme);
    // 存储到localStorage
    localStorage.setItem(storageKey, theme);
    
    // 只有当showToastFlag为true时才显示提示
    if (showToastFlag) {
      switch(theme) {
        case 'dark':
          showToast(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.37 5.51A7.35 7.35 0 0 0 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0 1 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49z"/>
            </svg>
            深色模式
          `, 1500);
          break;
          
        case 'light':
          showToast(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
            </svg>
            明亮模式
          `, 1500);
          break;
          
        case 'auto':
          const mode = darkModeMediaQuery.matches ? '深色' : '浅色';
          showToast(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
            </svg>
            跟随系统 (${mode})
          `, 2000);
          break;
      }
    }
  }
  
  // 全局切换函数（确保在任何情况下都能正常工作）
  window.toggleDark = function() {
    // 获取当前主题
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'auto';
    
    // 定义主题切换顺序
    const themeCycle = {
      light: 'dark',
      dark: 'auto',
      auto: 'light'
    };
    
    // 确定下一个主题
    const nextTheme = themeCycle[currentTheme] || 'auto';
    
    // 应用新主题并显示提示
    setTheme(nextTheme, true);
  };
  
  // 初始化主题（不显示提示）
  function initTheme() {
    // 获取存储的主题或根据系统设置确定
    const savedTheme = localStorage.getItem(storageKey);
    const initialTheme = savedTheme || (darkModeMediaQuery.matches ? 'auto' : 'light');
    
    // 应用初始主题
    setTheme(initialTheme, false);
  }
  
  // 监听系统主题变化
  function setupMediaQueryListener() {
    darkModeMediaQuery.addEventListener('change', (e) => {
      // 只有当当前设置为"auto"时才响应系统变化
      if (localStorage.getItem(storageKey) === 'auto') {
        setTheme('auto', false);
      }
    });
  }
  
  // 确保DOM加载完成后执行初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      setupMediaQueryListener();
    });
  } else {
    initTheme();
    setupMediaQueryListener();
  }
}();