/**
 * Proxy setup for the application
 * This file configures the CustomXHRequest to intercept and modify XMLHttpRequests
 */
import CustomXHRequest from "./custom-xhrequest";

/**
 * Initialize the proxy functionality by setting up proxy rules
 * @param {Object} config - Configuration for the proxy
 */
export function initializeProxy(config = {}) {
	// Clear any existing rules
	CustomXHRequest.clearProxyRules();

	// Add rules from configuration
	if (config.rules && Array.isArray(config.rules)) {
		config.rules.forEach((rule) => {
			CustomXHRequest.addProxyRule(rule);
		});
	}

	console.log(
		"[Proxy] Initialized with",
		CustomXHRequest.proxyRules.length,
		"rules"
	);
}

/**
 * Example configuration for common proxy scenarios
 */
export const commonProxyConfigs = {
	// Redirect all API requests to a local development server
	localDevelopment: {
		rules: [
			{
				match: "api.example.com",
				replace: "localhost:3000",
			},
		],
	},

	// Add authentication token to all requests
	addAuthToken: {
		rules: [
			{
				match: /^https?:\/\//,
				replace: (url) => {
					const token = localStorage.getItem("xbbAccessToken");
					if (!token) return url;

					const separator = url.includes("?") ? "&" : "?";
					return `${url}${separator}token=${token}`;
				},
			},
		],
	},

	// Change API environment (e.g., from production to staging)
	changeEnvironment: {
		rules: [
			{
				match: "api.production.example.com",
				replace: "api.staging.example.com",
			},
		],
	},

	// Proxy for specific API endpoints
	specificEndpoints: {
		rules: [
			{
				match: /\/api\/v1\/users/,
				replace: "/mock-api/users",
			},
			{
				match: /\/api\/v1\/products/,
				replace: "/mock-api/products",
			},
		],
	},

	// Handle CORS issues by proxying through a CORS proxy
	corsProxy: {
		rules: [
			{
				match: /^https?:\/\/(?!localhost|127\.0\.0\.1)/,
				replace: (url) => {
					return `https://cors-anywhere.herokuapp.com/${url}`;
				},
			},
		],
	},
};

/**
 * Create a custom proxy configuration
 * @param {Array} rules - Array of proxy rules
 * @returns {Object} Proxy configuration
 */
export function createProxyConfig(rules = []) {
	return {
		rules,
	};
}
