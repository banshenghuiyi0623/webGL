import initProgram from './initShader'
import vertexShaderSource from 'shaders/test_v.glsl'
import fragmentShaderSource from 'shaders/test_f.glsl'
import initVertexBuffers from './initVertexBuffers'
window.onload = function () {
  //获取canvas元素
  var canvas = document.getElementById('c');
  //获取绘制二维上下文
  var gl = canvas.getContext('webgl');
  //编译着色器
  initProgram(gl, vertexShaderSource, fragmentShaderSource)

  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  var n = initVertexBuffers(gl)

  gl.useProgram(gl.program)
  gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.POINTS, 0, n)
}
