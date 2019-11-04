function makeSVG(name, attr) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var key in attr) {
      svg.setAttributeNS(null, key, attr[key]);
    }
    return svg;
  }
  function makeSET(svg, svgs) {
    for (var key in svgs) {
      svg.appendChild(svgs[key]);
    }
    return svg;
  }
  $(function () {
    var w;
    var h;
    w = h = 600;
    var r1 = 0.45 * w;
    var r2 = 0.42 * w;
    var sr = 0.40 * w;
    var mr = 0.36 * w;
    var hr = 0.28 * w;
    var cr = 0.02 * w;
    var svg = makeSVG('svg', {
      'id': 'canvas',
      'width': w,
      'height': h
    });
    var rec = makeSVG('rect', {
      'width': w,
      'height': h,
      'fill': '#ccc'
    });
    var cir = makeSVG('circle', {
      'cx': w / 2,
      'cy': h / 2,
      'r': r1,
      'fill': '#fff'
    });
    var hhand = makeSVG('line', {
      'id': 'hhand',
      'x1': w / 2,
      'y1': h / 2,
      'x2': 0,
      'y2': 0,
      'style': 'opacity:0;'
    });
    var mhand = makeSVG('line', {
      'id': 'mhand',
      'x1': w / 2,
      'y1': h / 2,
      'x2': 0,
      'y2': 0,
      'style': 'opacity:0;'
    });
    var shand = makeSVG('line', {
      'id': 'shand',
      'x1': w / 2,
      'y1': h / 2,
      'x2': 0,
      'y2': 0,
      'style': 'opacity:0;'
    });
    var cap = makeSVG('circle', {
      'cx': w / 2,
      'cy': h / 2,
      'r': cr,
      'fill': '#DF0101'
    });
    var svgset = makeSET(svg, {
      1: rec,
      2: cir,
      3: hhand,
      4: mhand,
      5: shand,
      6: cap
    });
    document.getElementById("clock").appendChild(svgset);
    var rf = Math.PI / 180;
    for (var i = 0; i < 360; i += 6) {
      var radian = (-90 + i) * rf;
      var cx = (w / 2 + r2 * Math.cos(radian)).toFixed(2);
      var cy = (h / 2 + r2 * Math.sin(radian)).toFixed(2);
      var point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      point.setAttributeNS(null, "cx", cx);
      point.setAttributeNS(null, "cy", cy);
      point.setAttributeNS(null, "fill", "black");
      if (i % 30 === 0) {
        point.setAttributeNS(null, "r", 0.009*w);
      } else {
        point.setAttributeNS(null, "r", 0.003*w);
      }
      document.getElementById("canvas").appendChild(point);
    }
    function updateClock(date) {
      var sec = date.getSeconds();
      var min = sec/60 + date.getMinutes();
      var hrs = min/60 + date.getHours();
      var sAng = (-90 + 6 * sec) * rf;
      var mAng = (-90 + 6 * min) * rf;
      var hAng = (-90 + 30* hrs) * rf;
      var sx2 = (w/2 + sr * Math.cos(sAng)).toFixed(2);
      var sy2 = (h/2 + sr * Math.sin(sAng)).toFixed(2);
      var mx2 = (w/2 + mr * Math.cos(mAng)).toFixed(2);
      var my2 = (h/2 + mr * Math.sin(mAng)).toFixed(2);
      var hx2 = (w/2 + hr * Math.cos(hAng)).toFixed(2);
      var hy2 = (h/2 + hr * Math.sin(hAng)).toFixed(2);
      document.getElementById("shand").setAttributeNS(null, "x2", sx2);
      document.getElementById("shand").setAttributeNS(null, "y2", sy2);
      document.getElementById("shand").setAttributeNS(null, "style", 'stroke:#DF0101;stroke-width:'+0.006*w+';opacity:1;');
      document.getElementById("mhand").setAttributeNS(null, "x2", mx2);
      document.getElementById("mhand").setAttributeNS(null, "y2", my2);
      document.getElementById("mhand").setAttributeNS(null, "style", 'stroke:#000;stroke-width:'+0.012*w+';opacity:1;');
      document.getElementById("hhand").setAttributeNS(null, "x2", hx2);
      document.getElementById("hhand").setAttributeNS(null, "y2", hy2);
      document.getElementById("hhand").setAttributeNS(null, "style", 'stroke:#000;stroke-width:'+0.018*w+';opacity:1;');
    }
    function detectChange(preSec) {
      var date = new Date();
      var curSec = date.getSeconds();
      if (preSec != curSec) {
        updateClock(date);
      }
    }
    setInterval(
      function () {
      var dat = new Date();
      var sec = dat.getSeconds;
      detectChange(sec);
    },20);
  });