precision highp float;
varying vec2 v_uv;
uniform sampler2D tex_0;
void main(){
  vec4 texColor=texture2D(tex_0,vec2(1.-v_uv.x,v_uv.y));
  gl_FragColor=texColor;
}