import TokenDBManager from '@/class/TokenDBManager';
const popupOnMessage = (request, tokenDBManager, callback) => {
    if (request && request.user === 'content') {

        // 获取到的数据
        const { action, data } = request;
        // 通过 action 来判断需要做什么操作
        if (action === 'saveToken') {
            // 保存 token
            if (data.xbbAccessToken) {
                console.log('[ data ] >', data, tokenDBManager)
                tokenDBManager.saveToken(data, callback);
            }
            callback && callback();
        } else if (action === 'setCurrentToken') {
            if (data.xbbAccessToken) {
                console.log('%c [ data ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', data)
                // 保存当前页面的 token
                tokenDBManager.setCurrentToken(data, callback);
            }
        }
    }
}



const contentOnMessage = (request, sender, sendResponse) => {
    if (request && request.user === 'popup') {
        console.log('%c [ request, sender, sendResponse ]-35', 'font-size:13px; background:pink; color:#bf2c9f;', request, sender, sendResponse)
        const { action } = request;

        if (action === 'getCurrentToken') {
            const tokenDBManager = new TokenDBManager();
            const currentToken = tokenDBManager.getCurrentToken();
            sendResponse({
                action: 'setCurrentToken',
                data: currentToken,
            });
        }
    }
}

class MessageSender {
    constructor(type) {
        this.type = type;
        if (this.type === 'content') {
            chrome.runtime?.onMessage.addListener((request, sender, sendResponse) => contentOnMessage(request, sender, sendResponse));
        } else if (this.type === 'popup') {
            this.tokenDBManager = new TokenDBManager();
            chrome.runtime?.onMessage.addListener((request) => popupOnMessage(request, this.tokenDBManager, this.callback));
        }
    }

    send(message) {
        if (this.type === 'content') {
            this.contentToPopup(message);
        } else if (this.type === 'popup') {
            this.popupToContent(message);
        }
    }


    contentToPopup(message) {
        chrome.runtime.sendMessage(message, this.contentOnMessage);
    }


    popupToContent(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, this.popupOnMessage);
        });
    }

}


export default MessageSender;