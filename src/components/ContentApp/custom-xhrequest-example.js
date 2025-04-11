/**
 * Example usage of CustomXHRequest with proxy functionality
 */
import CustomXHRequest from './custom-xhrequest';

// Example 1: Simple string replacement
// Replace all requests to 'api.example.com' with 'localhost:3000'
CustomXHRequest.addProxyRule({
  match: 'api.example.com',
  replace: 'localhost:3000'
});

// Example 2: Using regular expressions
// Replace all HTTPS requests with HTTP
CustomXHRequest.addProxyRule({
  match: /^https:\/\//,
  replace: 'http://'
});

// Example 3: Using a function for dynamic replacement
// Add a query parameter to all requests to a specific domain
CustomXHRequest.addProxyRule({
  match: 'api.myservice.com',
  replace: (url) => {
    // Add a timestamp to prevent caching
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}timestamp=${Date.now()}`;
  }
});

// Example 4: Redirecting to a completely different URL
CustomXHRequest.addProxyRule({
  match: 'legacy-api.example.com',
  replace: 'new-api.example.com/v2'
});

// Example of how to use the CustomXHRequest in your application
function makeRequest() {
  const xhr = new CustomXHRequest();
  xhr.open('GET', 'https://api.example.com/data');
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('Response:', xhr.responseText);
      console.log('Original URL:', xhr.getOriginalUrl());
    } else {
      console.error('Request failed:', xhr.status);
    }
  };
  
  xhr.onerror = function() {
    console.error('Request failed');
  };
  
  xhr.send();
}

// Example of how to clear all proxy rules
function resetProxyRules() {
  CustomXHRequest.clearProxyRules();
  console.log('All proxy rules have been cleared');
}

export { makeRequest, resetProxyRules };
