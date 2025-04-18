import TokenDBManager from '@/class/TokenDBManager';
import TokenInfo from './TokenInfo';
const popupOnMessage = (request, tokenDBManager, callback) => {
    setTimeout(() => {
        console.log('%c [ request ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', request)
    }, 3000)
    if (request && request.user === 'content') {

        // 获取到的数据
        const { action, data } = request;
        console.log('%c [ request ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', request)

        // 通过 action 来判断需要做什么操作
        if (action === 'saveToken') {
            // 保存 token
            if (data.xbbAccessToken) {
                console.log('[ data ] >', data, tokenDBManager)
                tokenDBManager.saveToken(data, callback);
            }
            callback && callback();
        }
    }
}



const contentOnMessage = (request, sender, sendResponse) => {
    if (request && request.user === 'popup') {
        console.log('%c [ request, sender, sendResponse ]-35', 'font-size:13px; background:pink; color:#bf2c9f;', request, sender, sendResponse)
        const { action } = request;

        if (action === 'getCurrentToken') {
            const currentToken = TokenInfo.getCurrentTokenInfo();
            sendResponse({
                action: 'setCurrentToken',
                data: currentToken,
            });
        } else if (action === 'setPageToken') {
            const { data } = request;
            Object
                .entries(data)
                .forEach(
                    ([key, value]) => {
                        localStorage.setItem(key, value);
                        console.log('localStorage Setting ' + [key] + ' to', value);
                    })
            window.location.href = window.location.origin + '/#/app/home';
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
        console.log('%c [ message ]-60', 'font-size:13px; background:pink; color:#bf2c9f;', message)

        chrome.runtime.sendMessage(message, this.contentOnMessage);
    }


    popupToContent(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, this.popupOnMessage, (response) => {


                if (response && response.action === 'setCurrentToken') {
                    const { data } = response;

                    TokenDBManager.setCurrentToken(data);
                }
                console.log('%c [ response ]-72', 'font-size:13px; background:pink; color:#bf2c9f;', response)
            });
        });
    }

}


export default MessageSender;