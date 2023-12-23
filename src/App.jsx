import * as stylex from '@stylexjs/stylex';
import './App.css'

import { appStyles } from "./styles/app";
import { Tabs, Tab, } from "@nextui-org/react";
import CurrentTokenTab from './components/CurrentTokenTab';
import TokenDBTab from './components/TokenDBTab';


function App() {

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
            <TokenDBTab />
          </Tab>
        </Tabs>
      </div >
    </>

  )
}

export default App
