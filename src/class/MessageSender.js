

class MessageSender {


    constructor(type) {
        this.type = type;
        if (this.type === 'content') {
            chrome.runtime.onMessage.addListener(MessageSender.contentOnMessage);
        } else if (this.type === 'popup') {
            chrome.runtime.onMessage.addListener(MessageSender.popupOnMessage);
        }
    }

    send(message) {
        if (this.type === 'content') {
            MessageSender.contentToPopup(message);
        } else if (this.type === 'popup') {
            MessageSender.popupToContent(message);
        }
    }


    static contentToPopup(message) {
        chrome.runtime.sendMessage(message, MessageSender.contentOnMessage);
    }


    static popupToContent(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, MessageSender.popupOnMessage);
        });
    }

    static contentOnMessage(request, sender, sendResponse) {

        if (request && request.user === 'popup') {
            console.log('%c [ request, sender, sendResponse ]-35', 'font-size:13px; background:pink; color:#bf2c9f;', request, sender, sendResponse)
        }

    }

    static popupOnMessage(request, sender, sendResponse) {
        if (request && request.user === 'content') {
            console.log('%c [ request, sender, sendResponse ]-44', 'font-size:13px; background:pink; color:#bf2c9f;', request, sender, sendResponse)
        }

    }

}


export default MessageSender;