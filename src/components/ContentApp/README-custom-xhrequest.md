# CustomXHRequest

`CustomXHRequest` is a custom XMLHttpRequest implementation that provides URL interception and proxy functionality. It allows you to replace URLs in outgoing HTTP requests with alternative URLs, enabling proxy-like behavior directly in the browser.

## Features

- Intercept and modify URLs in XMLHttpRequests
- Support for string matching and regular expressions
- Support for static replacements or dynamic replacements using functions
- Ability to track the original URL that was intercepted
- Simple API for adding and clearing proxy rules

## Usage

### Basic Usage

```javascript
import CustomXHRequest from './custom-xhrequest';

// Create a new request using CustomXHRequest instead of XMLHttpRequest
const xhr = new CustomXHRequest();
xhr.open('GET', 'https://api.example.com/data');
xhr.send();
```

### Adding Proxy Rules

Before making requests, you need to add proxy rules to specify which URLs should be intercepted and how they should be replaced.

```javascript
// Simple string replacement
CustomXHRequest.addProxyRule({
  match: 'api.example.com',
  replace: 'localhost:3000'
});

// Now any request to 'api.example.com' will be redirected to 'localhost:3000'
```

### Types of Proxy Rules

#### 1. String Matching

```javascript
CustomXHRequest.addProxyRule({
  match: 'api.example.com',
  replace: 'localhost:3000'
});
```

#### 2. Regular Expression Matching

```javascript
CustomXHRequest.addProxyRule({
  match: /^https:\/\/api\.example\.com\/v1\//,
  replace: 'https://api.example.com/v2/'
});
```

#### 3. Function-based Replacement

```javascript
CustomXHRequest.addProxyRule({
  match: 'api.example.com',
  replace: (url) => {
    // Add authentication token to all requests
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}token=my-auth-token`;
  }
});
```

### Clearing Proxy Rules

```javascript
// Remove all proxy rules
CustomXHRequest.clearProxyRules();
```

### Accessing the Original URL

```javascript
const xhr = new CustomXHRequest();
xhr.open('GET', 'https://api.example.com/data');

// Later in your code, you can access the original URL
console.log('Original URL:', xhr.getOriginalUrl());
```

## Example

```javascript
import CustomXHRequest from './custom-xhrequest';

// Add a proxy rule to redirect API requests to a local development server
CustomXHRequest.addProxyRule({
  match: 'https://production-api.example.com',
  replace: 'http://localhost:3000'
});

// Add a proxy rule to add authentication to specific endpoints
CustomXHRequest.addProxyRule({
  match: /\/secure\//,
  replace: (url) => {
    const token = localStorage.getItem('authToken');
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auth=${token}`;
  }
});

// Make a request
const xhr = new CustomXHRequest();
xhr.open('GET', 'https://production-api.example.com/secure/data');
xhr.onload = function() {
  console.log('Response:', xhr.responseText);
  console.log('Original URL:', xhr.getOriginalUrl());
};
xhr.send();
```

## Integration with Existing Code

To use `CustomXHRequest` in your application, you need to replace all instances of `XMLHttpRequest` with `CustomXHRequest`. If you're using a library or framework that uses XMLHttpRequest internally, you might need to monkey-patch the global `XMLHttpRequest` object:

```javascript
import CustomXHRequest from './custom-xhrequest';

// Add your proxy rules
CustomXHRequest.addProxyRule({
  match: 'api.example.com',
  replace: 'localhost:3000'
});

// Monkey-patch the global XMLHttpRequest
const OriginalXHR = window.XMLHttpRequest;
window.XMLHttpRequest = CustomXHRequest;

// To restore the original XMLHttpRequest later if needed:
// window.XMLHttpRequest = OriginalXHR;
```

**Note:** Monkey-patching the global `XMLHttpRequest` should be done with caution as it affects all requests in your application.
