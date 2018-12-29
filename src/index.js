import initProgram from './initShader'
import vertexShaderSource from './shaders/test_v.glsl'
import fragmentShaderSource from './shaders/test_f.glsl'
window.onload = function () {
  //获取canvas元素
  var canvas = document.getElementById('c');
  canvas.height = 400
  canvas.width = 400
  //获取绘制二维上下文
  var gl = canvas.getContext('webgl');

  //编译着色器
  const shaderProgram = initProgram(gl, vertexShaderSource, fragmentShaderSource)
  console.log(shaderProgram)
  // 获取attribute变量位置
  var a_Position = gl.getAttribLocation(shaderProgram, 'a_Position');
  var a_PointSize = gl.getAttribLocation(shaderProgram, 'a_PointSize')
  var u_FragColor = gl.getUniformLocation(shaderProgram, 'u_FragColor')

  // 将顶点位置传输给attribute变量
  // gl.vertexAttrib4f(a_Position, 0.0, 0.0, 0.0, 1.0)
  canvas.onmousedown = function (e) {
    click(e, gl, canvas, a_Position, u_FragColor)
  }

  gl.vertexAttrib1f(a_PointSize, 5.0)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)

  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(shaderProgram)
}

var g_points = [];
var g_colors = [];
function click(e, gl, canvas, a_Position, u_FragColor) {
  var x = e.clientX;
  var y = e.clientY;
  var rect = e.target.getBoundingClientRect();
  x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
  y =  (canvas.width/2 - (y - rect.top))/(canvas.width/2);
  g_points.push([x, y]);
  if (x >= 0.0 && y >= 0.0) {
    g_colors.push([1.0, 0.0, 0.0, 1.0])
  } else if (x < 0.0 && y > 0) {
    g_colors.push([0.0, 1.0, 0.0, 1.0])
  } else {
    g_colors.push([0.0, 0.0, 1.0, 1.0])
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  
  var len = g_points.length;
  for(var i = 0; i < len; i++) {
    gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0)
    gl.uniform4f(u_FragColor, g_colors[i][0], g_colors[i][1], g_colors[i][2], g_colors[i][3])
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}