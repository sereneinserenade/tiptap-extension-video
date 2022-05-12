import { useState } from 'react'

import { NextUIProvider, createTheme, Switch } from '@nextui-org/react';
import { FiSun, FiMoon } from 'react-icons/fi'

import { Home } from './views'

import './App.scss'


function App() {
  const [isDark, setIsDark] = useState<boolean>(false)

  const darkTheme = createTheme({ type: 'dark' })

  const lightTheme = createTheme({ type: 'light' })

  return (
    <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
      <Home />

      <section
        onClick={() => setIsDark(!isDark)}
        className='theme-switcher-section flex items-center gap-1rem'
        aria-label='theme-switcher-section'
      >
        <Switch checked={isDark} onChange={(e) => setIsDark(e.target.checked)} iconOff={<FiSun />} iconOn={<FiMoon />}></Switch>
      </section>
    </NextUIProvider>
  );
}


export default App
