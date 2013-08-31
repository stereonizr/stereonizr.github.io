var App = function () {
  var drop = document.body;
  var convertRows = document.getElementsByClassName('convert-rows')[0];

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
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
    return false;
  }

  function handleFileSelect(e) {
    var files = e.target.files;
    console.log(files);
    if (!files[0].type.match('image.*')) {
      console.log('Image!!');
    }
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('drop').insertAfter(span, null);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(files[0]);
  }

  drop.addEventListener('dragover', handleDragOver, false);
  drop.addEventListener('drop', handleDrop.bind(this), false);
//    drop.addEventListener('change', handleFileSelect, false);
};
