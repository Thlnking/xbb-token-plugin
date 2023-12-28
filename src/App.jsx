import * as stylex from '@stylexjs/stylex';
import './App.css'

import { useEffect, useState } from 'react';
import { appStyles } from "./styles/app";
import { Tabs, Tab, } from "@nextui-org/react";
import CurrentTokenTab from './components/CurrentTokenTab';
import TokenDBTab from './components/TokenDBTab';

import MessageSender from '@/class/MessageSender';
import { useCallback } from 'react';




function App() {

  const [messageSender, setMessageSender] = useState(null)
  const [tokenDBManager, setTokenDBManager] = useState(null)
  const [allToken, setAllToken] = useState([])

  useEffect(() => {
    setMessageSender(new MessageSender('popup'))
  }, [])

  useEffect(() => {
    setTokenDBManager(messageSender?.tokenDBManager)
  }, [messageSender])

  const refreshAllToken = useCallback(() => {
    setAllToken([...(tokenDBManager?.getTokenList() || [])])
  }, [tokenDBManager])

  useEffect(() => {
    refreshAllToken()
    if (messageSender) {
      messageSender.callback = refreshAllToken
    }
  }, [refreshAllToken, messageSender])


  return (
    <>
      <div
        {
        ...stylex.props(
          appStyles.wrap,
        )
        }
      >
        <Tabs variant='underlined' aria-label="Options" color='default'>
          <Tab className="py-0 " key="token_operate" title="当前 Token">
            <CurrentTokenTab />
          </Tab>
          <Tab className="py-0" key="token_db" title="Token 库">
            <TokenDBTab key={allToken.length} allToken={allToken} />
          </Tab>
        </Tabs>
      </div >
    </>

  )
}

export default App
