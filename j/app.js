var App = function () {
    var drop = document.body;
    var drawCanvas = document.getElementById('canvas').getContext('2d');
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
        console.log(images);

        for (i = 0; i < images.length; i++) {
            var img = new Image();
            img.src = URL.createObjectURL(images[i]);
            pictures.push(img);

            img.onload = function(e) {
                var ratio = drawCanvas.width / e.target.width;
                console.log(drawCanvas.width, drawCanvas.height);
                console.log(e.target.width, e.target.height);
                drawCanvas.drawImage(e.target, 0, 0, 100, 100);

                alert('Drop!');
            };

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

App.prototype.convert = function(img) {
  //var img = new Image();
  //img.src = 'i/promo_200.jpg';
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
