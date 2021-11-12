import React, { Suspense, useState, useEffect, StrictMode } from 'react'
import styled from 'styled-components';
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import '@/styles/App.css'
import '@/styles/index.css'
import Home from '@/pages/Home/Index';
import Menu from '@/components/Menu/Index';
import * as THREE from 'three';
// require('three/examples/jsm/loaders/DRACOLoader');
// require('three/examples/jsm/loaders/DDSLoader');
// require('three/examples/jsm/loaders/GLTFLoader');
// require('three/examples/jsm/controls/OrbitControls');
// require('three/examples/jsm/controls/TrackballControls');
// require('three/examples/jsm/loaders/RGBELoader');
// require('three/examples/jsm/loaders/HDRCubeTextureLoader');

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
              <Redirect from="/*" to="/" />
            </Switch>
          </Menu>
        </AppWrapper>
      </HashRouter>
      </Suspense>
  )
}

export default App
