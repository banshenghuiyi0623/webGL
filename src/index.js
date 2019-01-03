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

  var ANGLE = 45.0;
  var radian = Math.PI * ANGLE / 180.0;
  var cosB = Math.cos(radian),
    sinB = Math.sin(radian);

  var xformMatrix = new Float32Array([
    cosB, sinB, 0.0, 0.0,
    -sinB, cosB, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ]);

  var xformMatrix2 = new Float32Array([
    1.0, 0.0, 0.0, 0.3,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ]);

  var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  var u_xformMatrix2 = gl.getUniformLocation(gl.program, 'u_xformMatrix2');
  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
  var n = initVertexBuffers(gl)
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  var currentAngle = 0.0;

  var ANGLE_STEP = 45.0;

  function draw(gl, n, currentAngle) {
    // 设置旋转矩阵
    // var radian = Math.PI * currentAngle / 180.0
    var sinB = Math.sin(currentAngle),
      cosB = Math.cos(currentAngle);
    var xformMatrix = new Float32Array([
      cosB, sinB, 0, 0,
      -sinB, cosB, 0, 0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ])
    // 将旋转矩阵传输给定点着色器
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  var g_last = Date.now()

  function animate(angle) {
    var now = Date.now()
    var elapsed = now - g_last; // 毫秒
    g_last = now;
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360;
  }

  function tick() {
    currentAngle = animate(currentAngle);
    draw(gl, n, currentAngle);
    requestAnimationFrame(tick)
  }

  gl.useProgram(gl.program)
  tick()

  // gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
  gl.uniformMatrix4fv(u_xformMatrix2, false, xformMatrix2);
  gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0)
  gl.drawArrays(gl.TRIANGLES, 0, n)
}


