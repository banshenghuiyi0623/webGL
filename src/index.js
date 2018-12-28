import initProgram from './initShader'
import vertexShaderSource from './shaders/test_v.glsl'
import fragmentShaderSource from './shaders/test_f.glsl'
window.onload = function () {
  //获取canvas元素
  var canvas = document.getElementById('c');
  //获取绘制二维上下文
  var gl = canvas.getContext('webgl');

  //编译着色器
  const shaderProgram = initProgram(gl, vertexShaderSource, fragmentShaderSource)
  console.log(gl)
  // 获取attribute变量位置
  var a_Position = gl.getAttribLocation(shaderProgram, 'a_Position');

  // 将顶点位置传输给attribute变量
  gl.vertexAttrib4f(a_Position, 0.0, 0.0, 0.0, 1.0)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(shaderProgram)

  //绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);
}
