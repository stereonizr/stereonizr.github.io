// IE10 support
console.time = console.time || function(){};
console.timeEnd = console.timeEnd || function(){};

var App = function () {
  this.promoRow = document.getElementById('promo');
  this.convertRows = document.getElementById('convert_rows');

  this.initPromo();
  this.initDnD();
};

App.prototype.initDnD = function () {
  var drop = document.body;
  var dropPopup;
  var uploadImage = document.getElementById('file_input');


  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'copy';
  }

  function handleDragEnter() {
    if (dropPopup) {
      return;
    }
    dropPopup = document.createElement('div');
    dropPopup.addEventListener('dragleave', handleDragLeave, false);
    dropPopup.className = 'drop-popup';
    drop.appendChild(dropPopup);
  }

  function handleDragLeave() {
    drop.removeChild(dropPopup);
    dropPopup = null;
  }

  function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
      if (/image/.test(files[i].type)) {
        this.addImage(files[i]);
      }
    }
    if (dropPopup) {
      drop.removeChild(dropPopup);
      dropPopup = null;
    }
    return false;
  }

  var handleFileSelect = function(e) {
    var files = e.target.files;
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      if (/image/.test(files[i].type)) {
        this.addImage(files[i]);
      } else {
        console.log('Image!!');
      }
    }
    return false;
  }.bind(this);

  drop.addEventListener('dragover', handleDragOver, false);
  drop.addEventListener('dragenter', handleDragEnter, false);
  drop.addEventListener('drop', handleDrop.bind(this), false);
  uploadImage.addEventListener('change', handleFileSelect, false);
};

App.prototype.initPromo = function() {
  var arrow = document.getElementById('promo_arrow').onclick = function() {
    this.convertPromoImage();
  }.bind(this);
};

App.prototype.convertPromoImage = function() {
  var originalImg = document.getElementById('promo_original');
  var result = document.getElementById('promo_result');
  result.innerHTML = '';
  var offreg = new Plugin(result, originalImg, false, 0.7, 1);
};

App.prototype.hidePromo = function() {
  this.convertRows.classList.add('convert-rows_promo_hide');
  this.promoRow.style.marginBottom = -this.promoRow.offsetHeight + 'px';
  // remove for fix chrome rendering animations bugs after add more images
  setTimeout(function() {
    this.convertRows.removeChild(this.promoRow);
    this.promoRow = null;
  }.bind(this), 1000);
};

App.prototype.addImage = function(file) {
  var convertRow = new ConvertRow();
  convertRow.addImage(file);
  // insert to top
  if (this.promoRow) {
    this.convertRows.appendChild(convertRow.element);
    this.hidePromo();
  } else {
    this.convertRows.insertBefore(convertRow.element, this.convertRows.firstChild);
  }
};
