import React, { useState, useEffect, useRef } from "react";

import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls';
import { useThreeBase } from '@/components/hooks/useBase';
import { 
  Mesh, ShaderMaterial, LineBasicMaterial, BufferGeometry, Line, Vector3, BufferAttribute, Texture, 
  SphereGeometry, DodecahedronGeometry, IcosahedronGeometry, MeshLambertMaterial, BoxGeometry,
  MeshPhongMaterial, Color, PointLight, AmbientLight, PlaneGeometry, DirectionalLight, SpotLight, Group
} from 'three';

import style from './index.module.less';

interface MapRenderProps {
  [propName: string] : any;
}
const MapRender = (props: MapRenderProps) => {
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

      /** 点光源 */
      const light = new PointLight(0xffffff);
      /** 环境光 */
      const ambient = new AmbientLight(0xffffff);

      light.position.set(200, 300, 400); //点光源位置
      scene.add(light); // 将光源加入到场景中 
      // scene.add(ambient);

      const lineMaterial = new LineBasicMaterial({ color: 0x0000ff }); // 使用材质
      const meshMetrtial = new MeshLambertMaterial({
        color: 0x0000ff
      });
      /** 材质高光 需要有光源才能显示 */
      const meshPongMeterial = new MeshPhongMaterial({
        color:0x0000ff,
        specular:0x4488ee,
        shininess:12
      })
      // const geometry = new BufferGeometry();
      // const vector1 = new Vector3(-10, 0, 0);
      // const vector2 = new Vector3(0, 10, 0);
      // const vector3 = new Vector3(10, 0, 0);
      // const vertices = new Float32Array([
      //   -1.0, -1.0,  1.0,
      //   1.0, -1.0,  1.0,
      //   1.0,  1.0,  1.0,

      //   1.0,  1.0,  1.0,
      //   -1.0,  1.0,  1.0,
      //   -1.0, -1.0,  1.0
      // ]);
      // geometry.setAttribute('position', new BufferAttribute(vertices, 3));
      // let geometry: any = new SphereGeometry(60, 40, 40);
      let geometry = new BoxGeometry(100, 100, 100);
      // geometry = new DodecahedronGeometry(40);
      // geometry = new IcosahedronGeometry(40);

      const line = new Line(geometry, lineMaterial);
      const mesh = new Mesh(geometry, meshMetrtial);
      const meshPong = new Mesh(geometry, meshPongMeterial);
      mesh.translateY(120);
      mesh.castShadow = true;

      /** 创建平面几何体 */
      const planeGeometry = new PlaneGeometry(300, 200);
      const planeMeterial = new MeshLambertMaterial({
        color: 0x999999
      });
      const planeMesh = new Mesh(planeGeometry, planeMeterial);
      scene.add(planeMesh);
      planeMesh.rotateX(-Math.PI / 2);
      planeMesh.position.y = -20;
      planeMesh.receiveShadow = true;

      /** 方向光 */
      const directionalLight = new DirectionalLight(0xffffff, 1);
      directionalLight.position.set(60, 100, 40);
      scene.add(directionalLight); // 
      directionalLight.castShadow = true;
      /** 设置阴影区域大小 */
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 300;
      directionalLight.shadow.camera.left = -50;
      directionalLight.shadow.camera.right= 50;
      directionalLight.shadow.camera.top = 200;
      directionalLight.shadow.camera.bottom = -100;

      /** 聚光灯 模拟色为白色 */
      const spotLight = new SpotLight(0xffffff); // 
      spotLight.position.set(100, 90, 100); // 聚光灯位置
      spotLight.angle = Math.PI / 6; // 光源发散角度
      scene.add(spotLight);
      spotLight.castShadow = true;
      spotLight.shadow.camera.near = 1; //最近
      spotLight.shadow.camera.far = 300; // 最远
      spotLight.shadow.camera.fov = 20; // 角度

      /** 投影质量 */
      directionalLight.shadow.mapSize.set(1024, 1024);


      // scene.add(line); // 场景内添加相应的元素
      scene.add(mesh); // 网格
      // scene.add(meshPong); // 光源

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

export default MapRender;