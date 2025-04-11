# 请求代理功能

这个功能允许拦截和修改网络请求的URL，实现代理功能。它可以用于开发、测试和调试过程中，例如将API请求重定向到本地服务器、添加认证令牌等。

## 主要特性

- 拦截和修改XMLHttpRequest和fetch请求的URL
- 支持字符串匹配和正则表达式匹配
- 支持静态替换和动态替换（使用函数）
- 能够跟踪被拦截的原始URL
- 即使其他库（如wpkReporter）覆盖了原生XMLHttpRequest，代理功能仍然有效
- 提供简单的API来添加和清除代理规则
- 提供用户界面来配置代理规则

## 实现原理

我们使用了两种方法来确保代理功能的可靠性：

1. **原型链修改**：通过修改XMLHttpRequest.prototype.open方法，确保所有XMLHttpRequest实例都会使用我们的代理功能。
2. **全局对象替换**：对于fetch API，我们替换了全局的fetch函数。

这种实现方式确保了即使其他库覆盖了原生的XMLHttpRequest或fetch，我们的代理功能仍然有效。

## 使用方法

### 基本用法

```javascript
import { initializeProxy, commonProxyConfigs } from './proxy-setup';

// 使用预定义的配置
initializeProxy(commonProxyConfigs.localDevelopment);

// 现在所有对 api.example.com 的请求都会被重定向到 localhost:3000
```

### 添加自定义代理规则

```javascript
import CustomXHRequest from './custom-xhrequest';

// 添加一个简单的字符串匹配规则
CustomXHRequest.addProxyRule({
  match: 'api.example.com',
  replace: 'localhost:3000'
});

// 添加一个正则表达式匹配规则
CustomXHRequest.addProxyRule({
  match: /^https:\/\//,
  replace: 'http://'
});

// 添加一个使用函数的动态替换规则
CustomXHRequest.addProxyRule({
  match: /^https?:\/\//,
  replace: (url) => {
    const token = localStorage.getItem('authToken');
    if (!token) return url;
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}token=${token}`;
  }
});
```

### 清除所有代理规则

```javascript
import CustomXHRequest from './custom-xhrequest';

CustomXHRequest.clearProxyRules();
```

## 预定义配置

我们提供了几种常用的代理配置：

- **localDevelopment**：将API请求重定向到本地开发服务器
- **addAuthToken**：为所有请求添加认证令牌
- **changeEnvironment**：将生产环境API请求重定向到测试环境
- **specificEndpoints**：只代理特定的API端点
- **corsProxy**：解决跨域问题

## 用户界面

我们提供了一个简单的用户界面来配置代理规则，可以通过点击"配置请求代理"按钮来打开。

## 注意事项

- 代理功能会对所有网络请求生效，包括XMLHttpRequest和fetch
- 代理规则按照添加顺序依次应用，一旦匹配成功就不再继续匹配
- 如果有其他库也修改了XMLHttpRequest或fetch，可能会导致冲突，但我们的实现方式尽量减少了这种可能性
- 在生产环境中使用代理功能时要小心，可能会导致意外的行为
