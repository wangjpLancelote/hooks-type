import { useState, useEffect } from "react";
import './index.less';
import { 
  Scene, 
  WebGLRenderer, 
  PerspectiveCamera, 
  LineBasicMaterial, 
  BoxGeometry, 
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
  MeshBasicMaterial
 } from 'three';


interface ICube {
  [propName: string] : any
}
const Cube = (props: ICube) => {
  const scene = new Scene(); // 场景
  const camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); // 相机
  const render = new WebGLRenderer(); // 渲染器
  render.setSize(window.innerWidth, window.innerHeight);

  const ref = document.getElementById('renderBox');
  ref?.appendChild(render.domElement);

  const geometry = new BoxBufferGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: '#cccccc' });
  const cube = new Mesh(geometry, material);

  camera.position.z = 5;


  scene.add(cube);

  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    render.render(scene, camera);
  }

  animate();

  const renderBox = () => {
    return <div dangerouslySetInnerHTML={ { __html: `${render.domElement}` } }></div>
  }
  
  return (
    <div className="container">
      <div className="renderBox" id="renderBox">
      </div>
    </div>
  )
}


export default Cube;

