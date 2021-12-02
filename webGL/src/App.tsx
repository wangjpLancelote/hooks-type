import React, { Suspense, useState, useEffect, StrictMode } from 'react'
import styled from 'styled-components';
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import '@/styles/App.css'
import '@/styles/index.css'
import Home from '@/pages/Home/Index';
import Menu from '@/components/Menu/Index';
import Sea from '@/pages/Sea/Index';
import Cube from './pages/Cube/Index';
import * as THREE from 'three';

/** vite 引入examples文件 */
import.meta.globEager('../node_modules/three/examples/jsm/loaders/DRACOLoader')
import.meta.globEager('../node_modulesthree/examples/jsm/loaders/DDSLoader')
import.meta.globEager('../node_modulesthree/examples/jsm/loaders/GLTFLoader')
import.meta.globEager('../node_modulesthree/examples/jsm/controls/OrbitControls')
import.meta.globEager('../node_modulesthree/examples/jsm/controls/TrackballControls')
import.meta.globEager('../node_modulesthree/examples/jsm/loaders/RGBELoader')
import.meta.globEager('../node_modulessthree/examples/jsm/loaders/HDRCubeTextureLoader')

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
              <Route exact strict path="/sea" component={Sea} />
              <Route exact strict path="/cube" component={Cube} />
              <Redirect from="/*" to="/" />
            </Switch>
          </Menu>
        </AppWrapper>
      </HashRouter>
      </Suspense>
  )
}

export default App
