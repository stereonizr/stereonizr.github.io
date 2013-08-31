var App = function () {
    var drop = document.body;
    var drawCanvas = document.getElementById('canvas').getContext('2d');

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


            img.onload = function () {
                var ratio = drawCanvas.width / img.width;
                console.log(drawCanvas.width, drawCanvas.height);
                console.log(img.width, img.height);
                drawCanvas.drawImage(img, 0, 0, 100, 100);

                alert('Drop!');
            };

        }
        return false;
    }

    function handleFileSelect(e) {
        var files = e.target.files;
        console.log(files);
        if (!files[0].type.match('image.*')) {
            console.log('Image!!');
//            continue;
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
    drop.addEventListener('drop', handleDrop, false);
//    drop.addEventListener('change', handleFileSelect, false);
};

App.prototype.convert = function (image) {
    $('.container').offreg('i/P8044656_2.JPG', false, 0.7, 1);
};
