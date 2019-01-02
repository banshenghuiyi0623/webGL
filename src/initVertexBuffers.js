export default function (gl) {
  var vertices = new Float32Array([
    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
  ])
  var n = 3;// 点的个数
  // 创建缓冲区对象
  var vertextBuffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertextBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  return n;
}