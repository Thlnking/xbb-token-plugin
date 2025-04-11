import React, { useState } from "react";
import styles from "/src/styles/content.module.css";
import CustomXHRequest from "./custom-xhrequest";
import { createProxyConfig, initializeProxy } from "./proxy-setup";

/**
 * Modal component for configuring proxy rules
 */
const ProxyConfigModal = ({ isOpen, onClose }) => {
	const [proxyRules, setProxyRules] = useState([{ match: "", replace: "" }]);

	// Add a new empty rule
	const addRule = () => {
		setProxyRules([...proxyRules, { match: "", replace: "" }]);
	};

	// Remove a rule at the specified index
	const removeRule = (index) => {
		const newRules = [...proxyRules];
		newRules.splice(index, 1);
		setProxyRules(newRules);
	};

	// Update a rule at the specified index
	const updateRule = (index, field, value) => {
		const newRules = [...proxyRules];
		newRules[index][field] = value;
		setProxyRules(newRules);
	};

	// Apply the configured proxy rules
	const applyRules = () => {
		// Filter out empty rules
		const validRules = proxyRules.filter(
			(rule) => rule.match.trim() !== "" && rule.replace.trim() !== ""
		);

		if (validRules.length === 0) {
			alert("请至少添加一条有效的代理规则");
			return;
		}

		// Create and apply the proxy configuration
		const config = createProxyConfig(validRules);
		initializeProxy(config);

		alert(`已应用 ${validRules.length} 条代理规则`);
		onClose();
	};

	// Clear all proxy rules
	const clearRules = () => {
		CustomXHRequest.clearProxyRules();
		alert("已清除所有代理规则");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<h3 className={styles.modalTitle}>配置请求代理规则</h3>

				<div className={styles.modalBody}>
					<div className={styles.rulesContainer}>
						{proxyRules.map((rule, index) => (
							<div key={index} className={styles.ruleRow}>
								<div className={styles.ruleInputs}>
									<input
										type="text"
										placeholder="匹配规则 (字符串或正则表达式)"
										value={rule.match}
										onChange={(e) => updateRule(index, "match", e.target.value)}
										className={styles.ruleInput}
									/>
									<span className={styles.arrowIcon}>→</span>
									<input
										type="text"
										placeholder="替换为"
										value={rule.replace}
										onChange={(e) =>
											updateRule(index, "replace", e.target.value)
										}
										className={styles.ruleInput}
									/>
								</div>
								<button
									onClick={() => removeRule(index)}
									className={styles.removeButton}>
									删除
								</button>
							</div>
						))}
					</div>

					<button onClick={addRule} className={styles.addButton}>
						添加规则
					</button>

					<div className={styles.helpText}>
						<p>
							<strong>使用说明：</strong>
						</p>
						<p>1. 匹配规则可以是字符串或正则表达式</p>
						<p>2. 例如：将 api.example.com 替换为 localhost:3000</p>
						<p>3. 或者：将 ^https:// 替换为 http://</p>
						<p>
							4. 注意：代理功能会对所有网络请求生效，包括 XMLHttpRequest 和
							fetch
						</p>
					</div>
				</div>

				<div className={styles.modalFooter}>
					<button onClick={applyRules} className={styles.applyButton}>
						应用规则
					</button>
					<button onClick={clearRules} className={styles.clearButton}>
						清除所有规则
					</button>
					<button onClick={onClose} className={styles.cancelButton}>
						取消
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProxyConfigModal;
