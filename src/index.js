import initProgram from './lib/initShader'
import vertexShaderSource from 'shaders/test_v.glsl'
import fragmentShaderSource from 'shaders/test_f.glsl'
import initVertexBuffers from './initVertexBuffers'

window.onload = main

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('c');
  //获取绘制二维上下文
  var gl = canvas.getContext('webgl');

  // Initialize shaders
  if (!initProgram(gl, vertexShaderSource, fragmentShaderSource)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the vertex information
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Set texture
  if (!initTextures(gl, n)) {
    console.log('Failed to intialize the texture.');
    return;
  }
}

function initTextures(gl, n) {
  var texture = gl.createTexture(); // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // Get the storage location of u_Sampler
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;
  }
  var image = new Image(); // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  image.onload = function () {
    loadTexture(gl, n, texture, u_Sampler, image);
  };
  // Tell the browser to load an image
  image.src = '../src/source/img/gift.png';

  return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler, 0);

  gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
}