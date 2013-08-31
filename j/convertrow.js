var ConvertRow = function () {
  this.element = document.createElement('div');
  this.element.className = 'convert-row';
};

ConvertRow.prototype.addImage = function (file) {
  var img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = function () {
    this.element.appendChild(img);
  }.bind(this);

  this.element.appendChild(img);

  var arrow = document.createElement('span');
  arrow.className = 'convert-row__arrow';
  arrow.innerHTML = '➩';
  this.element.appendChild(arrow);

  this.convert(img);
};

ConvertRow.prototype.convert = function (img) {
  //var img = new Image();
  //img.src = 'i/promo_200.jpg';
  img.onload = function (e) {
    var offreg = new Plugin(this.element, e.target, false, 0.7, 1);
    this.addDownloadLink(offreg);
  }.bind(this);
};

ConvertRow.prototype.addDownloadLink = function (offreg) {
  var a = document.createElement('a');
  a.href = offreg.c.toDataURL('image/jpeg');
  a.innerHTML = 'Download';
  a.setAttribute('download', 'stereome.jpg');
  this.element.appendChild(a);
};
