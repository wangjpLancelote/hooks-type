import React, { useState, useEffect, useRef } from "react";

import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls';
import { useThreeBase } from '@/components/hooks/useBase';
import { 
  Mesh, ShaderMaterial, LineBasicMaterial, BufferGeometry, Line, Vector3, BufferAttribute, Texture, 
  SphereGeometry, DodecahedronGeometry, IcosahedronGeometry, MeshLambertMaterial, BoxGeometry,
  MeshPhongMaterial, Color, PointLight, AmbientLight, PlaneGeometry, DirectionalLight, SpotLight, Group
} from 'three';

import style from './index.module.less';

interface GroupProps {
  [propName: string] : any;
}

const GroupRender = ( props: GroupProps ) => {
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
      controls.addEventListener('change', renderDef)


      var geometry = new BoxGeometry(20, 20, 20);
      var material: any = new MeshLambertMaterial({color: 0x0000ff});
      material = new LineBasicMaterial({ color: 0x0000ff})
      var group = new Group();
      var mesh1 = new Line(geometry, material);
      var mesh2 = new Line(geometry, material);
      mesh2.translateX(25);
      //把mesh1型插入到组group中，mesh1作为group的子对象
      group.add(mesh1);
      //把mesh2型插入到组group中，mesh2作为group的子对象
      group.add(mesh2);
      //把group插入到场景中作为场景子对象
      scene.add(group);

      function renderDef () {
        renderer.render(scene, camera); // 渲染器添加场景和相机
        // requestAnimationFrame(renderDef);
      }
      renderDef();
    }
  }, [])

  return (
    <div className={ style['main'] } ref={ mainRef }></div>
  )
}

export default GroupRender;