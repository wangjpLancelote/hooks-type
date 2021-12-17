import { useState, useEffect } from "react";
import './index.less';
import { 
  Scene, 
  WebGLRenderer, 
  PerspectiveCamera, 
  LineBasicMaterial, 
  Vector3, 
  Line, 
  ConeGeometry, 
  ShaderMaterial, 
  PlaneGeometry, 
  Mesh, 
  DoubleSide, 
  BoxHelper, 
  WebGLShader,
  BoxBufferGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Box3,
  Color,
  BoxGeometry,
  AmbientLight,
 } from 'three';

 import { WebGLUniforms } from "three";
//  import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
 import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls';
 import { LightProbeGenerator  } from 'three/examples/jsm/lights/LightProbeGenerator';


interface ICube {
  [propName: string] : any
}
const Cube = (props: ICube) => {
  const ref = document.getElementById('renderBox');
  const domWidth = ref?.clientWidth || 0;
  const domHeight = ref?.clientHeight || 0;
  const scene = new Scene(); // 场景
  const camera = new PerspectiveCamera(75, domWidth/domHeight / 2, 0.1, 1000); // 相机
  camera.zoom = 1;
  const render = new WebGLRenderer({ antialias: true }); // 渲染器
  render.setPixelRatio( window.devicePixelRatio );
  render.autoClear = true;
  render.autoClearColor = true;
  render.setClearColor(new Color(0xCCCCCC));
  // render.setSize(window.innerWidth, window.innerHeight);
  render.setSize(600, 600);
  // render.setViewport(50, 50, 100, 100);

  if (!ref?.hasChildNodes()) {
    ref?.appendChild(render.domElement);
  }

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cubeMaterial = new MeshLambertMaterial({
    color: 0x00ffff,
    wireframe: true,
  })
  const cube = new Mesh(geometry, material);
  cube.material.color.set('0x00ffff')
  cube.position.set(0, 0, 0);

  camera.position.z = 5;

  const controls = new OrbitControls( camera, render.domElement );

  const ambientLight = new AmbientLight(0x222222);
  scene.add(ambientLight);

  const actRender = () => {
    const animate = () => {
      /** 旋转动画 */
      // requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
  
      scene.add(cube);
  
      render.render(scene, camera);
    }
    animate();
  }

  actRender();
  controls.addEventListener( 'change', actRender );
  controls.minDistance = 1;
  controls.maxDistance = 400;
  controls.enablePan = false;

  
  return (
    <div className="container">
      <div className="renderBoxEl" id="renderBox">
      </div>
    </div>
  )
}


export default Cube;

