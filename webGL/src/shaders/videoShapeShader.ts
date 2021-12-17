export const VideoShapeShader = {
  vs: `
    precision highp float;
    varying vec2 v_uv;
    void main(){
      gl_Position=projectionMatrix*
      modelViewMatrix*
      vec4(position.xyz,1.);
      v_uv=uv;
    }
  `,
  fs: `
    precision highp float;
    varying vec2 v_uv;
    uniform sampler2D tex_0;
    void main(){
      vec4 texColor=texture2D(tex_0,vec2(1.-v_uv.x,v_uv.y));
      gl_FragColor=texColor;
    }
  `
}