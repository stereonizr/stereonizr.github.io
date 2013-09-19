var ConvertRow = function () {
  this.element = document.createElement('div');
  this.element.className = 'convert-row';
};

ConvertRow.prototype.addImage = function (file) {
  this._originalImg = new Image();
  this._originalImg.src = URL.createObjectURL(file);
  this._originalImg.className = 'convert-row__original';
  this._originalImg.onload = this._onOriginalLoad.bind(this);

  this.element.appendChild(this._originalImg);
};

ConvertRow.prototype._onOriginalLoad = function() {
  var arrow = document.createElement('span');
  arrow.className = 'convert-row__arrow';
  arrow.innerHTML = '➩';
  arrow.onclick = function() {
    this.convert(this._originalImg);
  }.bind(this);
  this.element.appendChild(arrow);

  this.resultElem = document.createElement('div');
  this.resultElem.style.minWidth = this._originalImg.width + 'px';
  this.resultElem.style.minHeight = this._originalImg.height + 'px';
  this.resultElem.className = 'convert-row__result';
  this.element.appendChild(this.resultElem);

  this.convert(this._originalImg);
};

ConvertRow.prototype.convert = function (img) {
  var offreg = new Plugin(this.resultElem, img, false, 0.7, 1);
  this.addDownloadLink(offreg);
};

ConvertRow.prototype.addDownloadLink = function (offreg) {
  var div = document.createElement('div');

  var a = document.createElement('a');
  a.href = offreg.c.toDataURL('image/jpeg');
  a.innerHTML = 'Download';
  a.className = 'convert-row__download';
  a.setAttribute('download', 'stereome.jpg');
  div.appendChild(a);

  this.resultElem.appendChild(div);
};
