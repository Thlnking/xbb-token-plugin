// 复制文本到剪贴板的函数
function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard successfully!');
        })
        .catch((error) => {
            console.error('Error copying text to clipboard:', error);
        });
}

export {
    copyTextToClipboard
}