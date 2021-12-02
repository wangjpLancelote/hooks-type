/** 海面水纹 shader GLSL文件 */
export const seaShader = {
  vs: `
    uniform float time;
    void main () {
      float x = position.x;
      float y = position.y;
      float PI = 3.141592653589;

      float sz = 0.0;
      float ti = 0.06;
      float index = 1.0;

      vec2 dir;
      for(int i = 0;i<4;i++){
        ti = ti + 0.0005;
        index = index + 0.1;
        if(mod(index,2.0)==0.0){
            dir = vec2(1.0,ti);
        }else{
            dir = vec2(-1.0,ti);
        }
        float l1 = 2.0 * PI / (0.5); //波长
        float s1 = 10.0 * 2.0 / l1; //速度
        float z1 = 1.0 * sin(dot(normalize(dir),vec2(x,y)) * l1 + time * s1); //正弦波方程式
        sz +=z1;
      }
      gl_Position = projectionMatrix * modelViewMatrix * vec4(x,y,sin(sz) * 10.0,1.0);
    }
  `,
  fs: `
  void main(){
    gl_FragColor = vec4(90./255.,160./255.,248./255.,1.0);      
  }
  `
}