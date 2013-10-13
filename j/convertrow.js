var ConvertRow = function () {
  this.element = document.createElement('div');
  this.element.className = 'convert';
  this.container = document.createElement('div');
  this.container.className = 'convert__row';
  this.element.appendChild(this.container);
};

ConvertRow.prototype.addImage = function (file) {
  // don't user "URL.createObjectURL", it is exception in FF "NS_ERROR_NOT_AVAILABLE: Component is not available" for big images

  var fileReader = new FileReader();
  fileReader.onload = this._onFileReaderLoad.bind(this);
  fileReader.readAsDataURL(file);
};

ConvertRow.prototype._onFileReaderLoad = function(e) {
  this._beforeImg = new Image();
  this._beforeImg.src = e.target.result;
  this._beforeImg.className = 'convert__before';
  this._beforeImg.onload = this._onOriginalLoad.bind(this);

  this.container.appendChild(this._beforeImg);
};

// after read file
ConvertRow.prototype._onOriginalLoad = function() {
  var arrow = document.createElement('div');
  arrow.className = 'convert__arrow';
  var arrowSymbol = document.createElement('div');
  arrowSymbol.className = 'convert__arrow-symbol';
  arrowSymbol.innerHTML = '➩';
  arrowSymbol.onclick = function() {
    this.convert(this._beforeImg);
  }.bind(this);
  arrow.appendChild(arrowSymbol);
  this.container.appendChild(arrow);

  this.resultElem = document.createElement('div');
  this.resultElem.style.minWidth = this._beforeImg.width + 'px';
  this.resultElem.style.minHeight = this._beforeImg.height + 'px';
  this.resultElem.className = 'convert__result';
  this.container.appendChild(this.resultElem);

  this.convert(this._beforeImg);
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
  a.className = 'convert__download';
  a.setAttribute('download', 'stereome.jpg');
  div.appendChild(a);

  this.resultElem.appendChild(div);
};
