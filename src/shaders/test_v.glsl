attribute vec4 a_Position;
attribute float a_PointSize;
void main() {
  //设置坐标
  gl_Position = a_Position;
  //设置尺寸
  gl_PointSize = a_PointSize;
}