export default function (gl, vShaderText, fShaderText) {
  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vShaderText);
  gl.compileShader(vertShader);

  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fShaderText);
  gl.compileShader(fragShader);
  //合并程序
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  gl.program = shaderProgram
}