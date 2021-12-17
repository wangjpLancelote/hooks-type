import {   
  Scene, 
  WebGLRenderer, 
  PerspectiveCamera,
} from 'three';

export interface cameraArg {
  fov: number; // 视野角度
  whRate: number; // 宽高比
  near: number; // 近截面
  far: number; // 远截面
}

export function useThreeBase (domWidth: number, domHeight: number, rendererCanvas?: HTMLCanvasElement, cameraArguments?: cameraArg) {
  const scene = new Scene(); // 场景
  const camera = new PerspectiveCamera(75, domWidth/domHeight / 2, 0.1, 1000); // 相机
  const renderer = new WebGLRenderer({ antialias: true, canvas: rendererCanvas }); // 渲染器

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.autoClear = true;
  renderer.autoClearColor = true;

  return { scene, camera, renderer };
}