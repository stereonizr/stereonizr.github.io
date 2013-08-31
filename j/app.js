var App = function() {

};

App.prototype.convert = function(image) {
  var img = new Image();
  img.src = 'i/P8044656_3.JPG';
  img.onload = function(e) {
    var offreg = new Plugin($('.container'), e.target, false, 0.7, 1);
    this.addDownloadLink(offreg);
  }.bind(this);
};

App.prototype.addDownloadLink = function(offreg) {
  var a = document.createElement('a');
  a.href = offreg.c.toDataURL('image/jpeg');
  a.innerHTML = 'Download';
  a.setAttribute('download', 'stereome.jpg');
  document.body.appendChild(a);
};
