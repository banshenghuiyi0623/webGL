export default function (gl) {
  var verticesSizes = new Float32Array([
    -0.5, 0.5, 10.0,
    -0.5, -0.5, 20.0,
    0.5, 0.5, 30.0
  ])

  var FSIZE = verticesSizes.BYTES_PER_ELEMENT
  var n = 3;// 点的个数
  // 创建缓冲区对象
  var vertextSizeBuffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertextSizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);
  
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);
  gl.enableVertexAttribArray(a_Position);

  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
  gl.enableVertexAttribArray(a_PointSize)

  return n;
}