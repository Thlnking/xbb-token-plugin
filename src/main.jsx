import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from "@nextui-org/react";

import App from './App.jsx'
import './main.css'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
