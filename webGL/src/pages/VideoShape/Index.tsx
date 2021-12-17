import React, { useState, useEffect, useRef } from 'react';
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
  ShapeGeometry,
  SphereGeometry,
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
  VideoTexture,
  Uniform,
} from 'three';
import { seaShader } from '@/shaders/seaShader';
import { OrbitControls  } from 'three/examples/jsm/controls/OrbitControls';
import { useThreeBase } from '@/components/hooks/useBase';
import { VideoShapeShader } from '@/shaders/videoShapeShader';


interface VideoShapeProps {
  [propName: string]: any;
}

const VideoShape = (props: VideoShapeProps) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ videoTexture, setVideoTexture ] = useState<VideoTexture>(); // 视频全景
  
  
  useEffect(() => {
    if (videoRef.current && canvasRef.current) {

      const videoTextureInstance = new VideoTexture(videoRef.current);
      videoTextureInstance.needsUpdate = true;
      videoTextureInstance.updateMatrix();
      setVideoTexture(videoTextureInstance);
      const { scene, camera, renderer } = useThreeBase((videoRef.current as HTMLElement).clientWidth, (videoRef.current as HTMLElement).clientHeight, canvasRef.current);
      camera.position.z = 50;
      const controls = new OrbitControls(camera, renderer.domElement); // 控制器
      controls.maxDistance = 100;
      controls.update();
      scene.add(camera);

      /** 初始化网格 */
      const initMesh = () => {
        const geometry = new SphereGeometry(100, 32, 16);
        const material = new ShaderMaterial({
          wireframe: false,
          side: DoubleSide,
          uniforms: {
            'text_0': new Uniform(videoTextureInstance),
          },
          vertexShader: VideoShapeShader.vs,
          fragmentShader: VideoShapeShader.fs,
        });
        const mesh = new Mesh(geometry, material);
        return mesh;
      }

      const mesh = initMesh();
      scene.add(mesh);

      const animation = () => {
        requestAnimationFrame(animation);
        renderer.render(scene, camera);
      }

      animation();
      
    }
  }, [])

  return (
    <div className="vidoeShape">
      <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" ref={ videoRef } preload='auto' controls loop></video>
      <canvas ref={ canvasRef } style={{ "width": "80%", "height": "823px" }}
      width="1920"
      height="823"
      ></canvas>
    </div>
  )
}

VideoShape.displayName = 'VideoShape';

export default VideoShape;
