
onmessage = function (ev) {
  var percent = ev.data;
  postMessage(percent);
};

