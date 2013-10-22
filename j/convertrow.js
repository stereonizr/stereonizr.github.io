var ConvertRow = function () {
  // лучше создать сразу все элементы, чтобы таблица не пересчитывала все размеры после вставки картинки
  this._beforeElement = document.createElement('div');
  this._arrowElement = document.createElement('div');
  this._afterElement = document.createElement('div');
  this._preloader = document.createElement('div');

  this._beforeElement.className = 'convert__before';
  this._arrowElement.className = 'convert__arrow';
  this._afterElement.className = 'convert__after';
  this._preloader.className = 'convert__preloader';

  this.container = document.createElement('div');
  this.container.className = 'convert__row';
  this.container.appendChild(this._beforeElement);
  this.container.appendChild(this._arrowElement);
  this.container.appendChild(this._afterElement);
  this._afterElement.appendChild(this._preloader);

  this.element = document.createElement('div');
  this.element.className = 'convert';
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
  this._beforeImg.className = 'convert__before-img';
  this._beforeImg.onload = this._onBeforeImgLoad.bind(this);

  this._beforeElement.appendChild(this._beforeImg);
};

// after read file
ConvertRow.prototype._onBeforeImgLoad = function() {
  var arrowSymbol = document.createElement('div');
  arrowSymbol.className = 'convert__arrow-symbol';
  arrowSymbol.innerHTML = '➩';
  arrowSymbol.onclick = function() {
    this._afterElement.innerHTML = '';
    this.convert(this._beforeImg);
  }.bind(this);
  this._arrowElement.appendChild(arrowSymbol);

  this._beforeImg.style.maxWidth = this._beforeImg.naturalWidth + 'px';

  //this._afterElement.style.minWidth = this._beforeImg.width + 'px';
  //this._afterElement.style.minHeight = this._beforeImg.height + 'px';

  this.convert(this._beforeImg);
};

ConvertRow.prototype.convert = function (img) {
  var offreg = new Plugin(this._afterElement, img, false, 0.7, 1);
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

  this._afterElement.appendChild(div);
};
