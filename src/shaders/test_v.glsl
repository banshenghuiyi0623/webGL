attribute vec4 a_Position;
uniform mat4 u_xformMatrix;
uniform mat4 u_xformMatrix2;
void main() {
  //设置坐标
  gl_Position = u_xformMatrix * u_xformMatrix2 * a_Position;
}