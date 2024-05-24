import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core';
import App from './App.jsx'
import '@mantine/core/styles.css'

const theme = createTheme({
  primaryColor: 'green',
  colors: {
    javascript: ['#fffbe1', '#fcf6ce', '#f7eca0', '#f3e26f', '#efd945', '#edd42a', '#ecd118', '#d1b806', '#baa400', '#a08d00'],
    rust: ['#faf3f0', '#eee5e1', '#dfc9bc', '#d0aa94', '#c48f71', '#be7f5b', '#bb764f', '#a56540', '#935938', '#814b2c'],
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
