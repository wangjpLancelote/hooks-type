import React, { Suspense, useState, useEffect } from 'react'
import styled from 'styled-components';
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import '@/styles/App.css'
import '@/styles/index.css'
import Home from '@/pages/Home/Index';
import Menu from '@/components/Menu/Index';
import * as THREE from 'three';

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: hidden;
`
window['THREE'] = THREE;

function App() {
  return (
    <Suspense fallback={ null }>
      <HashRouter>
        <AppWrapper>
          <Menu>
            <Switch>
              <Route exact strict path="/" component={Home} />
              <Redirect from="/*" to="/" />
            </Switch>
          </Menu>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}

export default App
