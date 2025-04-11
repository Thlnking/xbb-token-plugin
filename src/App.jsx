import './App.css'

import { useEffect, useState } from 'react';
import styles from "./styles/app.module.css";
import { Tabs, Tab, } from "@nextui-org/react";
import CurrentTokenTab from './components/CurrentTokenTab';
import TokenDBTab from './components/TokenDBTab';

import MessageSender from '@/class/MessageSender';
import { useCallback } from 'react';
import TokenDBManager from './class/TokenDBManager';




function App() {

  const [messageSender, setMessageSender] = useState(null)
  const [allToken, setAllToken] = useState([])

  const [currentToken, setCurrentToken] = useState(null)


  const getCurrentToken = useCallback(() => {
    if (messageSender) {
      messageSender.send({
        user: 'popup',
        action: 'getCurrentToken',
        data: null
      })
    }
  }, [messageSender])


  const setPageToken = useCallback((token) => {
    if (messageSender) {
      messageSender.send({
        user: 'popup',
        action: 'setPageToken',
        data: token
      })
    }
  }, [messageSender])



  useEffect(() => {
    setMessageSender(new MessageSender('popup'))
  }, [])

  useEffect(() => {
    setCurrentToken({
      useName: '获取中'
    })
  }, [])


  useEffect(() => {
    getCurrentToken()
    setTimeout(() => {
      setCurrentToken(JSON.parse(localStorage.getItem('currentToken') || '{}'))
    }
      , 1000)
  }, [getCurrentToken, messageSender])


  const refreshAllToken = useCallback(() => {
    const tokenDb = new TokenDBManager()
    setAllToken([...(tokenDb?.getTokenList() || [])])
  }, [])




  useEffect(() => {
    refreshAllToken()
    if (messageSender) {
      messageSender.callback = refreshAllToken
    }
  }, [refreshAllToken, messageSender])


  return (
    <>
      <div
        className={styles.wrap}
      >
        <Tabs variant='underlined' aria-label="Options" color='default'>
          <Tab className="py-0 " key="token_operate" title="当前 Token">
            <CurrentTokenTab currentToken={currentToken} refreshAllToken={refreshAllToken} setInputToken={setPageToken} />
          </Tab>
          <Tab className="py-0 " key="token_db" title={
            <span>Token库 </span>
          }>
            <div className='overflow-scroll h-[340px] '>
              <TokenDBTab key={allToken.length} allToken={allToken} refreshAllToken={refreshAllToken} setToken={setPageToken} />
            </div>
          </Tab>
        </Tabs>
      </div >
    </>

  )
}

export default App
