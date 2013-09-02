var ConvertRow = function () {
  this.element = document.createElement('div');
  this.element.className = 'convert-row';
};

ConvertRow.prototype.addImage = function (file) {
  var img = new Image();
  img.src = URL.createObjectURL(file);
  img.className = 'convert-row__original';
  img.onload = function () {
    this.resultElem = document.createElement('div');
    this.resultElem.style.minWidth = img.width + 'px';
    this.resultElem.style.minHeight = img.height + 'px';
    this.resultElem.className = 'convert-row__result';
    this.element.appendChild(this.resultElem);

    this.convert(img);
  }.bind(this);

  this.element.appendChild(img);

  var arrow = document.createElement('span');
  arrow.className = 'convert-row__arrow';
  arrow.innerHTML = '➩';
  this.element.appendChild(arrow);
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
