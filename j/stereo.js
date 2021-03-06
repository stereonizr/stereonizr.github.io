/**
 * Offreg jQuery plug-in
 * Make Like Print
 *
 * @author Jean-Christophe Nicolas <mrjcnicolas@gmail.com>
 * @homepage http://bite-software.co.uk/offreg/
 * @version 0.0.1
 * @license MIT http://opensource.org/licenses/MIT
 * @date 26-06-2013
 */

var Plugin = function (me, img, png, rot, axis, callback) {
  this.el = me;
  this.img = img;
  this.w = 0;
  this.h = 0;
  this.rot = rot;
  this.axis = (!axis) ? rot : axis;

  this.png = (png) ? png : false;
  this.bg = '#000';

  this.pixelData = [];
  this.rgb = [];

  this.init();
};

Plugin.prototype.init = function () {
  this.progress = document.createElement('progress');
  this.progress.max = 100;
  this.progress.value = 1;
  this.el.appendChild(this.progress);

  setTimeout(function() {
    this.c = document.createElement('canvas');
    this.ctx = this.c.getContext("2d");

    // initialise dimensions
    this.w = this.img.naturalWidth;
    this.h = this.img.naturalHeight;

    this.c.width = this.w;
    this.c.height = this.h;

    this.padding = 0.95;  // percentage reduction of image within origin boundaries
    this.imgw = this.w * this.padding;
    this.imgh = this.h * this.padding;

    this.buildLayerData();
  }.bind(this), 100);

};

Plugin.prototype.buildLayerData = function () {
  console.time('buildLayer');
  var pixels = this.pixelData,
    degMax = 2 * this.rot,
    offMax = 10 * this.axis;

  if (degMax < 0.1) {
    degMax = 0.1;
  }
  if (offMax < 0.1) {
    offMax = 0.1;
  }

  for (var i = 0; i < 3; i++) {		// construct postioning of offsets

    var deg = -degMax + Math.random() * (degMax * 2),
      offx = Math.random() * (offMax * 2) - offMax,
      offy = Math.random() * (offMax * 2) - offMax;

    this.ctx.save();

    this.ctx.translate(this.w / 2, this.h / 2);
    this.ctx.rotate(this.toRad(deg));

    if (!this.png) { // if jpg -> set bg colour to $(selector)
      this.ctx.fillStyle = this.bg;
      this.ctx.fillRect(-this.imgw * 1.5, -this.imgh * 1.5, this.w * 3, this.h * 3);
    }

    this.ctx.drawImage(this.img, -this.imgw / 2, -this.imgh / 2, this.imgw, this.imgh);

    pixels[i] = this.ctx.getImageData(offx, offy, this.w, this.h);

    this.ctx.restore();
    // this.ctx.clearRect(0,0,this.w,this.h);

  }
  console.timeEnd('buildLayer');
  this.updateProgressBar(40);
  this.convertToRGBChannels();
};


Plugin.prototype.convertToRGBChannels = function () {
  console.time('torgb');
  var rgb = this.rgb; // rgb -> temp place to copy the pixel data -
  // convert them to their respective colour channel -
  // then return them to original imageData source.

  for (var ch = 0; ch < 3; ch++) {

    rgb[ch] = this.pixelData[ch].data;

    var channel = rgb[ch];

    for (var i = 0; i < channel.length - 4; i += 4) {

      switch (ch) {
        case 0: // red channel
          channel[i] = 255 - channel[i];
          channel[i + 1] = 0;
          channel[i + 2] = 0;
          break;
        case 1: // green channel
          channel[i] = 0;
          channel[i + 1] = 255 - channel[i + 1];
          channel[i + 2] = 0;
          break;
        case 2: // blue channel
          channel[i] = 0;
          channel[i + 1] = 0;
          channel[i + 2] = 255 - channel[i + 2];
          break;
      }

    }
    this.pixelData[ch].data = channel;

  }
  console.timeEnd('torgb');
  this.updateProgressBar(70);
  this.merge();
};


Plugin.prototype.merge = function () {
  if (!window.Worker) {
    alert('Doesn\'t support workers');
    return;
  }
  var src1 = this.pixelData[0];
  var src2 = this.pixelData[2];

  var output = this.pixelData[1];
  var worker = new Worker('j/worker.js');
  console.time('worker');
  worker.postMessage({
    src1: src1,
    src2: src2,
    output: output
  });
  worker.onmessage = function (event) {
    output = event.data;
    this.deploy(output);
  }.bind(this);
  console.timeEnd('worker');
};

Plugin.prototype.deploy = function (dst) {

  console.time('deploy');
  this.ctx.putImageData(dst, 0, 0);

  if (!this.png) { // dirty jpeg hack -> was creating a black background -> line width test on smaller images
    this.ctx.strokeStyle = this.bg;
    this.ctx.lineWidth = 25; // needs to become dynamic based on source dimensions
    this.ctx.strokeRect(0, -0, this.w, this.h);
  }

  this.el.removeChild(this.progress);

  var img = this.convertCanvasToImage(this.c);
  this.el.appendChild(img);

  // TODO(pk): move logic to up
  img.className = 'convert__after-img';
  img.onload = function () {
    img.style.maxWidth = img.naturalWidth + 'px';
    // correct resize for IE10
    img.removeAttribute('height');
    img.removeAttribute('width');
  };
  console.timeEnd('deploy');
  if (this.callback) {
    this.callback();
  }
};

Plugin.prototype.toRad = function (deg) {
  return deg / 180 * Math.PI;
};

Plugin.prototype.convertCanvasToImage = function (canvas) {
  console.time('tocanvas');
  var image = new Image();
  image.src = (this.png) ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg");
  console.timeEnd('tocanvas');
  this.updateProgressBar(85);
  return image;
};

Plugin.prototype.updateProgressBar = function(percent) {
  this.progress.value = percent;
};
