attribute vec4 a_Position;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;
void main() {
  //设置坐标
  gl_Position =  a_Position;
  v_TexCoord = a_TexCoord;
}