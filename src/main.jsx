import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from "@nextui-org/react";

import App from './App.jsx'
import './main.css'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)


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
chrome.runtime?.onMessage.addListener((request) => popupOnMessage(request, this.tokenDBManager, this.callback));
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
