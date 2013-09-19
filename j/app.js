var App = function () {
  var drop = document.body;
  var convertRows = document.getElementsByClassName('convert-rows')[0];
  var dropPopup;
  var uploadImage = document.getElementsByClassName('file_label')[0];

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
    dropPopup.innerHTML = 'Upload your photo';
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
        var convertRow = new ConvertRow();
        convertRow.addImage(files[i]);
        convertRows.appendChild(convertRow.element);
      }
    }
    if (dropPopup) {
      drop.removeChild(dropPopup);
      dropPopup = null;
    }
    return false;
  }

  function handleFileSelect(e) {
    var files = e.target.files;
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      if (/image/.test(files[i].type)) {
        var convertRow = new ConvertRow();
        convertRow.addImage(files[i]);
        convertRows.appendChild(convertRow.element);
      } else {
        console.log('Image!!');
      }
    }
    return false;
  }

  drop.addEventListener('dragover', handleDragOver, false);
  drop.addEventListener('dragenter', handleDragEnter, false);
  drop.addEventListener('drop', handleDrop.bind(this), false);
  uploadImage.addEventListener('change', handleFileSelect, false);
};
