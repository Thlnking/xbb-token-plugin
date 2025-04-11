/**
 * URLProxyManager - A utility to intercept and modify XMLHttpRequest URLs
 * This implementation uses monkey patching to ensure it works even if XMLHttpRequest is replaced
 */
class URLProxyManager {
	constructor() {
		this.proxyRules = [];
		this.isInitialized = false;
		this.originalXHR = null;
		this.originalFetch = null;
	}

	/**
	 * Add a proxy rule to intercept and replace URLs
	 * @param {Object} rule - The proxy rule
	 * @param {string|RegExp} rule.match - URL pattern to match (string or RegExp)
	 * @param {string|Function} rule.replace - Replacement URL or function that returns a URL
	 */
	addProxyRule(rule) {
		if (!rule || !rule.match || !rule.replace) {
			console.error("Invalid proxy rule:", rule);
			return;
		}
		this.proxyRules.push(rule);
		console.log(
			`[URLProxyManager] Added proxy rule: ${rule.match} -> ${rule.replace}`
		);
	}

	/**
	 * Clear all proxy rules
	 */
	clearProxyRules() {
		this.proxyRules = [];
		console.log("[URLProxyManager] Cleared all proxy rules");
	}

	/**
	 * Apply proxy rules to transform the URL
	 * @param {string} url - The original URL
	 * @returns {string} - The transformed URL
	 */
	applyProxyRules(url) {
		console.log("[ url, this ] >", url, this);
		if (!url || this.proxyRules.length === 0) {
			return url;
		}

		let newUrl = url;

		for (const rule of this.proxyRules) {
			if (typeof rule.match === "string" && url.includes(rule.match)) {
				// String match
				if (typeof rule.replace === "function") {
					newUrl = rule.replace(url);
				} else {
					newUrl = url.replace(rule.match, rule.replace);
				}
				break;
			} else if (rule.match instanceof RegExp && rule.match.test(url)) {
				// RegExp match
				if (typeof rule.replace === "function") {
					newUrl = rule.replace(url);
				} else {
					newUrl = url.replace(rule.match, rule.replace);
				}
				break;
			}
		}

		return newUrl;
	}

	/**
	 * Initialize the proxy functionality by monkey patching XMLHttpRequest
	 * This ensures our proxy works even if other libraries replace XMLHttpRequest
	 */
	initialize() {
		if (this.isInitialized) {
			console.warn("[URLProxyManager] Already initialized");
			return;
		}

		// 防御性保存当前实际的XMLHttpRequest
		this.originalXHR = window.XMLHttpRequest;
		this.originalFetch = window.fetch;

		// 监听DOM变化以检测新脚本加载
		this.setupMutationObserver();

		// Create a proxy for XMLHttpRequest
		const proxyManager = this;

		// Patch the XMLHttpRequest prototype's open method
		const originalOpen = window.XMLHttpRequest.prototype.open;
		window.XMLHttpRequest.prototype.open = function (
			method,
			url,
			async = true,
			username = null,
			password = null
		) {
			console.log(
				"[ method, url, async, username, password ] >",
				method,
				url,
				async,
				username,
				password
			);
			const originalUrl = url;
			const newUrl = proxyManager.applyProxyRules(url);

			// Log the URL replacement if it occurred
			if (newUrl !== originalUrl) {
				console.log(
					`[URLProxyManager] Proxying XHR request: ${originalUrl} -> ${newUrl}`
				);
			}

			// Store the original URL for reference
			this.originalUrl = originalUrl;

			// Call the original open method with the potentially modified URL
			return originalOpen.call(this, method, newUrl, async, username, password);
		};

		// Add a method to get the original URL to the prototype
		window.XMLHttpRequest.prototype.getOriginalUrl = function () {
			return this.originalUrl;
		};

		// Also proxy fetch if available
		if (typeof window.fetch === "function") {
			const originalFetch = window.fetch;
			window.fetch = function (input, init) {
				let url =
					typeof input === "string"
						? input
						: input instanceof URL
						? input.toString()
						: input.url;
				const originalUrl = url;
				const newUrl = proxyManager.applyProxyRules(url);

				if (newUrl !== originalUrl) {
					console.log(
						`[URLProxyManager] Proxying fetch request: ${originalUrl} -> ${newUrl}`
					);

					// Update the input with the new URL
					if (typeof input === "string") {
						input = newUrl;
					} else if (input instanceof URL) {
						input = new URL(newUrl);
					} else {
						input.url = newUrl;
					}
				}

				return originalFetch.call(window, input, init);
			};
		}

		this.isInitialized = true;
		console.log("[URLProxyManager] Initialized");

		// 添加重新初始化保护
		this.reinitializeHandler = () => this.safeReinitialize();
		window.addEventListener("xhr-override-detected", this.reinitializeHandler);
	}

	/**
	 * Restore the original XMLHttpRequest and fetch
	 */
	restore() {
		if (!this.isInitialized) {
			console.warn("[URLProxyManager] Not initialized, nothing to restore");
			return;
		}

		window.XMLHttpRequest.prototype.open = this.originalXHR.prototype.open;
		delete window.XMLHttpRequest.prototype.getOriginalUrl;

		if (this.originalFetch) {
			window.fetch = this.originalFetch;
		}

		this.isInitialized = false;
		console.log("[URLProxyManager] Restored original XMLHttpRequest and fetch");
	}

	/**
	 * 设置MutationObserver监听脚本加载
	 */
	setupMutationObserver() {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				for (const node of mutation.addedNodes) {
					if (
						node.tagName === "SCRIPT" &&
						node.src.includes("dingtalk-wpkReporter.js")
					) {
						console.log("[URLProxyManager] 检测到第三方脚本加载:", node.src);
						// 延迟执行以确保脚本已加载完成
						setTimeout(() => this.safeReinitialize(), 100);
					}
				}
			}
		});
		console.log("[ observer, document ] >", document, observer);

		observer.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
	}

	/**
	 * 安全重新初始化（带防护机制）
	 */
	safeReinitialize() {
		if (this.isInitialized) {
			this.restore();
		}
		// 重新获取当前XHR（可能是被第三方脚本覆盖后的版本）
		this.originalXHR = window.XMLHttpRequest;
		this.initialize();
		console.log("[URLProxyManager] 已重新初始化应对第三方脚本覆盖");
	}
}

// Create a singleton instance
const proxyManager = new URLProxyManager();

/**
 * CustomXHRequest - A compatibility class that provides the same interface as before
 * but delegates to the URLProxyManager singleton
 */
class CustomXHRequest extends XMLHttpRequest {
	// Static configuration for URL proxying
	static proxyRules = [];

	/**
	 * Add a proxy rule to intercept and replace URLs
	 * @param {Object} rule - The proxy rule
	 * @param {string|RegExp} rule.match - URL pattern to match (string or RegExp)
	 * @param {string|Function} rule.replace - Replacement URL or function that returns a URL
	 */
	static addProxyRule(rule) {
		if (!rule || !rule.match || !rule.replace) {
			console.error("Invalid proxy rule:", rule);
			return;
		}
		CustomXHRequest.proxyRules.push(rule);

		// Also add the rule to the proxy manager
		proxyManager.addProxyRule(rule);

		// Initialize the proxy manager if not already initialized
		if (!proxyManager.isInitialized) {
			proxyManager.initialize();
		}
	}

	/**
	 * Clear all proxy rules
	 */
	static clearProxyRules() {
		CustomXHRequest.proxyRules = [];
		proxyManager.clearProxyRules();
	}

	constructor() {
		super();
		this.open = this.open.bind(this);
		this.send = this.send.bind(this);
		this.addEventListener = this.addEventListener.bind(this);
		this.originalUrl = null; // Store the original URL for reference
	}

	/**
	 * Override the open method to intercept and replace URLs
	 */
	open(method, url, async = true, username = null, password = null) {
		// 检测XHR是否被覆盖
		if (
			!Object.prototype.hasOwnProperty.call(
				window.XMLHttpRequest.prototype,
				"open"
			)
		) {
			window.dispatchEvent(new CustomEvent("xhr-override-detected"));
		}

		this.originalUrl = url; // Store the original URL
		let newUrl = this.applyProxyRules(url);

		// Log the URL replacement if it occurred
		if (newUrl !== url) {
			console.log(`[CustomXHRequest] Proxying request: ${url} -> ${newUrl}`);
		}

		// Call the original open method with the potentially modified URL
		return super.open(method, newUrl, async, username, password);
	}

	/**
	 * Apply proxy rules to transform the URL
	 * @param {string} url - The original URL
	 * @returns {string} - The transformed URL
	 */
	applyProxyRules(url) {
		if (!url || CustomXHRequest.proxyRules.length === 0) {
			return url;
		}

		let newUrl = url;

		for (const rule of CustomXHRequest.proxyRules) {
			if (typeof rule.match === "string" && url.includes(rule.match)) {
				// String match
				if (typeof rule.replace === "function") {
					newUrl = rule.replace(url);
				} else {
					newUrl = url.replace(rule.match, rule.replace);
				}
				break;
			} else if (rule.match instanceof RegExp && rule.match.test(url)) {
				// RegExp match
				if (typeof rule.replace === "function") {
					newUrl = rule.replace(url);
				} else {
					newUrl = url.replace(rule.match, rule.replace);
				}
				break;
			}
		}

		return newUrl;
	}

	/**
	 * Get the original URL that was intercepted
	 * @returns {string|null} - The original URL
	 */
	getOriginalUrl() {
		return this.originalUrl;
	}
}

export default CustomXHRequest;
