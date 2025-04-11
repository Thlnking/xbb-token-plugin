/**
 * 代理功能使用示例
 * 
 * 本文件展示了如何在实际应用中使用代理功能来拦截和修改网络请求
 */
import CustomXHRequest from './custom-xhrequest';
import { initializeProxy, commonProxyConfigs, createProxyConfig } from './proxy-setup';

/**
 * 示例1：基本用法 - 将所有对 api.example.com 的请求重定向到本地开发服务器
 */
export function basicProxyExample() {
  // 使用预定义的配置
  initializeProxy(commonProxyConfigs.localDevelopment);
  
  // 现在所有对 api.example.com 的请求都会被重定向到 localhost:3000
  // 例如：https://api.example.com/users 会变成 https://localhost:3000/users
}

/**
 * 示例2：添加认证令牌 - 为所有请求添加认证令牌
 */
export function authTokenExample() {
  // 使用预定义的配置
  initializeProxy(commonProxyConfigs.addAuthToken);
  
  // 现在所有请求都会自动添加 token 参数
  // 例如：https://api.example.com/users 会变成 https://api.example.com/users?token=xxx
}

/**
 * 示例3：环境切换 - 将生产环境API请求重定向到测试环境
 */
export function environmentSwitchExample() {
  // 使用预定义的配置
  initializeProxy(commonProxyConfigs.changeEnvironment);
  
  // 现在所有对生产环境的请求都会被重定向到测试环境
  // 例如：https://api.production.example.com/users 会变成 https://api.staging.example.com/users
}

/**
 * 示例4：特定端点代理 - 只代理特定的API端点
 */
export function specificEndpointsExample() {
  // 使用预定义的配置
  initializeProxy(commonProxyConfigs.specificEndpoints);
  
  // 现在只有特定的API端点会被代理
  // 例如：/api/v1/users 会变成 /mock-api/users
}

/**
 * 示例5：CORS代理 - 解决跨域问题
 */
export function corsProxyExample() {
  // 使用预定义的配置
  initializeProxy(commonProxyConfigs.corsProxy);
  
  // 现在所有非本地的请求都会通过CORS代理
  // 例如：https://api.example.com/users 会变成 https://cors-anywhere.herokuapp.com/https://api.example.com/users
}

/**
 * 示例6：自定义代理规则 - 创建自定义的代理规则
 */
export function customProxyExample() {
  // 创建自定义代理规则
  const customRules = [
    {
      // 将所有 .json 文件请求重定向到本地文件
      match: /\\.json$/,
      replace: (url) => {
        const filename = url.split('/').pop();
        return `/mock-data/${filename}`;
      }
    },
    {
      // 将所有 API 版本从 v1 升级到 v2
      match: /\\/api\\/v1\\//,
      replace: '/api/v2/'
    }
  ];
  
  // 使用自定义配置
  initializeProxy(createProxyConfig(customRules));
}

/**
 * 示例7：动态代理规则 - 根据条件动态添加代理规则
 */
export function dynamicProxyExample() {
  // 清除所有现有规则
  CustomXHRequest.clearProxyRules();
  
  // 根据条件添加规则
  if (process.env.NODE_ENV === 'development') {
    // 开发环境使用本地API
    CustomXHRequest.addProxyRule({
      match: 'api.example.com',
      replace: 'localhost:3000'
    });
  } else if (location.hostname === 'staging.myapp.com') {
    // 测试环境使用测试API
    CustomXHRequest.addProxyRule({
      match: 'api.example.com',
      replace: 'api.staging.example.com'
    });
  }
  
  // 所有环境都添加认证令牌
  CustomXHRequest.addProxyRule({
    match: /^https?:\\/\\//,
    replace: (url) => {
      const token = localStorage.getItem('authToken');
      if (!token) return url;
      
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}token=${token}`;
    }
  });
}

/**
 * 示例8：禁用代理 - 清除所有代理规则
 */
export function disableProxyExample() {
  CustomXHRequest.clearProxyRules();
}
