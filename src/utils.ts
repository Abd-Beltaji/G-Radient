export function hsv2rgb(h: number, s: number, v: number) {
  var r: number, g: number, b: number;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: {
      r = v;
      g = t;
      b = p;
      return [r * 255, g * 255, b * 255];
    }
    case 1: {
      r = q;
      g = v;
      b = p;
      return [r * 255, g * 255, b * 255];
    }
    case 2: {
      r = p;
      g = v;
      b = t;
      return [r * 255, g * 255, b * 255];
    }
    case 3: {
      r = p;
      g = q;
      b = v;
      return [r * 255, g * 255, b * 255];
    }
    case 4: {
      r = t;
      g = p;
      b = v;
      return [r * 255, g * 255, b * 255];
    }
    case 5: {
      r = v;
      g = p;
      b = q;
      return [r * 255, g * 255, b * 255];
    }
  }
  return [0, 0, 0];
}

export function rgb2hsv(r: number, g: number, b: number) {
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b);
  let h =
    c && (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
}

export function asRGB(color: string): [number, number, number, number] {
  if (/#/g.test(color)) {
    // color is hex
    switch (color.length - 1) {
      case 8: {
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5, 7), 16);
        let a = parseInt(color.slice(7, 9), 16) / 255;
        return [r, g, b, a];
      }
      case 6: {
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5, 7), 16);
        return [r, g, b, 1];
      }
    }
  }
  return [0, 0, 0, 100];
}

export function hsv2hex(h: number, s: number, l: number, a: number) {
    console.log(h,s,l)
  let [r, g, b] = hsv2rgb(h, s, l);
//   console.log(r,g,b)
  let color = `#${
        ("0" + Math.round(r).toString(16)).slice(-2)
    }${
        ("0" + Math.round(g).toString(16)).slice(-2)
    }${
        ("0" + Math.round(b).toString(16)).slice(-2)
    }${
        ("0" + Math.round(a*255).toString(16)).slice(-2)
    }`
// alert(r+" "+g+" "+b)
// return `rgb(${r},${g},${b},${a})`
  return color;
}
