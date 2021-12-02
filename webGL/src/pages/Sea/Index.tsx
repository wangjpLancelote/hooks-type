import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { Scene, WebGLRenderer, PerspectiveCamera, LineBasicMaterial, BoxGeometry, Vector3, Line, ConeGeometry, ShaderMaterial, PlaneGeometry, Mesh, DoubleSide } from 'three';
import { seaShader } from '@/shaders/seaShader';


interface ISea {
  [propName: string]: any
}

const Sea = (props: ISea) => {

  const [ seaMaterial, setSeaMaterial ] = useState<Record<string, any>>({}); //保存THREE 实例
  const ref = useRef(null);
  
  useEffect(() => {
    const box = document.getElementById('renderBox');

    const scene = new Scene(); // 创建场景
    const camera = new PerspectiveCamera(75, (box?.clientWidth || 0) / (box?.clientHeight || 0), 0.1, 1000); // 创建相机 视野角度 -> 宽高比 -> 近截面 -> 远截面
    // camera.position.z = 5;
    const renderDom = new WebGLRenderer();
    const material = new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: seaShader.vs,
      fragmentShader: seaShader.fs,
      side: DoubleSide,
      wireframe: true
    });

    const geometry = new PlaneGeometry(200, 200, 50, 10);
    const plane = new Mesh(geometry, material); // 构建网格面
    scene.add(plane);

    renderDom.setSize(box?.clientWidth || 0, box?.clientHeight || 0);
    

    box?.appendChild(renderDom.domElement);

    setSeaMaterial(material);

    const animate = () => {
      requestAnimationFrame(animate);
      renderDom.render(scene, camera);
      material.uniforms.time.value += 0.01;
    }
    animate();
  }, [])

  return (
    <div className='container' >
      <div className="renderBox" id="renderBox">
      </div>
    </div>
  )
}

Sea.displayName = 'Sea';

export default Sea;