
onmessage = function (event) {
  var data = event.data,
      dst = data.output,
      src = data.src;

  var sA, dA, len = dst.data.length;
  var sRA, sGA, sBA, dRA, dGA, dBA, dA2;
  var demultiply;

  for (var px=0;px<len;px+=4){
    sA  = src.data[px+3]/255;
    dA  = dst.data[px+3]/255;
    dA2 = (sA + dA - sA*dA);
    dst.data[px+3] = dA2*255;

    sRA = src.data[px  ]/255*sA;
    dRA = dst.data[px  ]/255*dA;
    sGA = src.data[px+1]/255*sA;
    dGA = dst.data[px+1]/255*dA;
    sBA = src.data[px+2]/255*sA;
    dBA = dst.data[px+2]/255*dA;

    demultiply = 255 / dA2;

    dst.data[px  ] = (sRA + dRA - sRA*dRA) * demultiply;
    dst.data[px+1] = (sGA + dGA - sGA*dGA) * demultiply;
    dst.data[px+2] = (sBA + dBA - sBA*dBA) * demultiply;
  }
  postMessage({output: dst});
};
