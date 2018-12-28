attribute vec4 a_position;
void main() {
  //设置坐标
  gl_Position = a_position;
  //设置尺寸
  gl_PointSize = 10.0;
}