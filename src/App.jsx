import * as stylex from '@stylexjs/stylex';
import './App.css'

import { appStyles } from "./styles/app";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import CurrentToken from './components/CurrentToken';
import TokenInput from './components/TokenInput';



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
          <Tab key="token_operate" title="当前 Token">
            <CurrentToken />
            <TokenInput />
          </Tab>
          <Tab key="token_db" title="Token 库">

          </Tab>
        </Tabs>
      </div>
    </>

  )
}

export default App
