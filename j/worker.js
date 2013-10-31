onmessage = function (event) {
  var data = event.data,
    output = data.output,
    src1 = data.src1,
    src2 = data.src2;
  screenBlend(src1, output);
  screenBlend(src2, output);
  invert(output);

  postMessage(output);
};

function screenBlend (src, dst) {
    var sA, dA, len = dst.data.length;
    var sRA, sGA, sBA, dRA, dGA, dBA, dA2;
    var demultiply;

    for (var px = 0; px < len; px += 4) {
        sA = src.data[px + 3] / 255;
        dA = dst.data[px + 3] / 255;
        dA2 = (sA + dA - sA * dA);
        dst.data[px + 3] = dA2 * 255;

        sRA = src.data[px  ] / 255 * sA;
        dRA = dst.data[px  ] / 255 * dA;
        sGA = src.data[px + 1] / 255 * sA;
        dGA = dst.data[px + 1] / 255 * dA;
        sBA = src.data[px + 2] / 255 * sA;
        dBA = dst.data[px + 2] / 255 * dA;

        demultiply = 255 / dA2;

        dst.data[px  ] = (sRA + dRA - sRA * dRA) * demultiply;
        dst.data[px + 1] = (sGA + dGA - sGA * dGA) * demultiply;
        dst.data[px + 2] = (sBA + dBA - sBA * dBA) * demultiply;
    }

}

function invert (pixels) {
  for (var i = 0; i < pixels.data.length - 4; i += 4) {
    pixels.data[i] = 255 - pixels.data[i];
    pixels.data[i + 1] = 255 - pixels.data[i + 1];
    pixels.data[i + 2] = 255 - pixels.data[i + 2];
  }

}