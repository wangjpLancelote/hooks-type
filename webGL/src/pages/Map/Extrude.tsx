import React, { useState, useEffect, useRef } from "react";

import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls';
import { useThreeBase } from '@/components/hooks/useBase';
import { 
  Mesh, ShaderMaterial, LineBasicMaterial, BufferGeometry, Line, Vector3, BufferAttribute, Texture, 
  SphereGeometry, DodecahedronGeometry, IcosahedronGeometry, MeshLambertMaterial, BoxGeometry,
  MeshPhongMaterial, Color, ExtrudeGeometry, Shape, PointsMaterial, Points, SplineCurve, Vector2, LineCurve3, CubicBezierCurve3, QuadraticBezierCurve3, CatmullRomCurve3
} from 'three';

import style from './index.module.less';

interface ExtrudeProps {
  [propName: string] : any;
}

/** 拉伸成型 通过绘制的二维图形拉伸成为三维图形 */
const Extrude = (props: ExtrudeProps) => {
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      const mainDom = mainRef.current as HTMLElement;
      const mainWidth = mainDom.clientWidth;
      const mainHeight = mainDom.clientHeight;
      const { scene, camera, renderer  } = useThreeBase(mainWidth, mainHeight, undefined, { fov: 45, whRate: mainWidth/mainHeight, near: 1, far: 500 });
      renderer.setClearColor(new Color(0xCCCCCC));
      renderer.setSize(mainWidth, mainHeight);
      if (!mainDom.hasChildNodes()) mainDom.appendChild(renderer.domElement);
      camera.position.set(0, 0, 400);
      camera.lookAt(0, 0, 0); // 设置好相机
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
      controls.maxDistance = 400;
      controls.addEventListener('change', renderDef);

      function renderDef () {
        renderer.render(scene, camera); // 渲染器添加场景和相机
        // requestAnimationFrame(renderDef);
      }
      renderDef();

      /** shape轮廓 通过顶点设置 设置三维轮廓，通过4条直线画出二维图形 */
      const shape = new Shape();
      shape.moveTo(0, 0); // 起点
      shape.lineTo(0, 100); // 第二点
      shape.lineTo(100, 100); // 第三点
      shape.lineTo(100, 0); // 第四点
      shape.lineTo(0, 0); // 回到起点，画出四条线

      const geometry = new ExtrudeGeometry(
        shape,
        {
          bevelEnabled: false, // 无倒角   
        }
      );
      

      const material = new PointsMaterial({
        color: 0x0000ff,
        size: 5
      });

      // const mesh = new Points(geometry, material);
      // scene.add(mesh);

      const vec1 = new Vector3(-10, -50, -50);
      const vec2 = new Vector3(10, 0, 0);
      const vec3 = new Vector3(8, 50, 50);
      const vec4 = new Vector3(-5, 0, 100);

      const curve = new CatmullRomCurve3([vec1, vec2, vec3, vec4]);
      const extrudeSetting = {
        bevelEnabled: false,
        steps: 50,
        extrudePath: curve,
      }
      const extrudeGeometry = new ExtrudeGeometry(shape, extrudeSetting);
      const mesh = new Mesh(extrudeGeometry, material);

      scene.add(mesh);
    }  
  }, [])


  return (
    <div className={ style['main'] } ref={ mainRef }></div>
  )
}

export default Extrude;