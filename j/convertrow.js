var ConvertRow = function () {
  this.element = document.createElement('div');
  this.element.className = 'convert-row';

  arrow.className = 'convert-row__arrow';
  arrow.innerHTML = '➩';
  this.element.appendChild(arrow);

};

ConvertRow.prototype.addImage = function (urlsrc) {
  var img = new Image();
  img.onload = function () {
    this.element.appendChild(img);

    this.resultElem = document.createElement('div');
    this.resultElem.style.minWidth = img.width;
    this.resultElem.style.minHeight = img.height;
  }.bind(this);
  img.src = urlsrc;

  this.element.appendChild(img);

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
