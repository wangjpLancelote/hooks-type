precision highp float;
varying vec2 v_uv;
void main(){
  gl_Position=projectionMatrix*
  modelViewMatrix*
  vec4(position.xyz,1.);
  v_uv=uv;
}