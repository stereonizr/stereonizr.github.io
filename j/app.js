var App = function () {
  var drop = document.body;
  var convertRows = document.getElementsByClassName('convert-rows')[0];
  var pictures = [];

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
    var images = [];
    for (var i = 0; i < files.length; i++) {
      if (/image/.test(files[i].type)) {
        images.push(files[i]);
      }
    }

    for (i = 0; i < images.length; i++) {
      var img = new Image();
      img.src = URL.createObjectURL(images[i]);
      pictures.push(img);

      img.onload = function (e) {
        convertRows.appendChild(e.target);
      }.bind(this);

    }
    this.convert(pictures);
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
