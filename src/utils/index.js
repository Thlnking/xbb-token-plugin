// 复制文本到剪贴板的函数
function copyTextToClipboard(text) {
    // 创建一个临时的textarea元素
    const textarea = document.createElement('textarea');
    // 设置textarea的值为要复制的文本
    textarea.value = text;
    // 将textarea元素添加到DOM中
    document.body.appendChild(textarea);
    // 选中textarea的文本
    textarea.select();
    // 执行浏览器的复制命令
    document.execCommand('copy');
    // 移除textarea元素
    document.body.removeChild(textarea);
}

export {
    copyTextToClipboard
}