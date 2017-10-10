var hexcase = 0, b64pad = "";
function hex_sha1(b) {
  return rstr2hex(rstr_sha1(str2rstr_utf8(b)));
}
function b64_sha1(b) {
  return rstr2b64(rstr_sha1(str2rstr_utf8(b)));
}
function any_sha1(b, e) {
  return rstr2any(rstr_sha1(str2rstr_utf8(b)), e);
}
function hex_hmac_sha1(b, e) {
  return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(b), str2rstr_utf8(e)));
}
function b64_hmac_sha1(b, e) {
  return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(b), str2rstr_utf8(e)));
}
function any_hmac_sha1(b, e, a) {
  return rstr2any(rstr_hmac_sha1(str2rstr_utf8(b), str2rstr_utf8(e)), a);
}
function sha1_vm_test() {
  return "a9993e364706816aba3e25717850c26c9cd0d89d" == hex_sha1("abc").toLowerCase();
}
function rstr_sha1(b) {
  return binb2rstr(binb_sha1(rstr2binb(b), 8 * b.length));
}
function rstr_hmac_sha1(b, e) {
  var a = rstr2binb(b);
  16 < a.length && (a = binb_sha1(a, 8 * b.length));
  for (var c = Array(16), d = Array(16), f = 0;16 > f;f++) {
    c[f] = a[f] ^ 909522486, d[f] = a[f] ^ 1549556828;
  }
  a = binb_sha1(c.concat(rstr2binb(e)), 512 + 8 * e.length);
  return binb2rstr(binb_sha1(d.concat(a), 672));
}
function rstr2hex(b) {
  try {
    hexcase;
  } catch (f) {
    hexcase = 0;
  }
  for (var e = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", a = "", c, d = 0;d < b.length;d++) {
    c = b.charCodeAt(d), a += e.charAt(c >>> 4 & 15) + e.charAt(c & 15);
  }
  return a;
}
function rstr2b64(b) {
  try {
    b64pad;
  } catch (g) {
    b64pad = "";
  }
  for (var e = "", a = b.length, c = 0;c < a;c += 3) {
    for (var d = b.charCodeAt(c) << 16 | (c + 1 < a ? b.charCodeAt(c + 1) << 8 : 0) | (c + 2 < a ? b.charCodeAt(c + 2) : 0), f = 0;4 > f;f++) {
      e = 8 * c + 6 * f > 8 * b.length ? e + b64pad : e + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >>> 6 * (3 - f) & 63);
    }
  }
  return e;
}
function rstr2any(b, e) {
  var a = e.length, c = [], d, f, g, h, k = Array(Math.ceil(b.length / 2));
  for (d = 0;d < k.length;d++) {
    k[d] = b.charCodeAt(2 * d) << 8 | b.charCodeAt(2 * d + 1);
  }
  for (;0 < k.length;) {
    h = [];
    for (d = g = 0;d < k.length;d++) {
      if (g = (g << 16) + k[d], f = Math.floor(g / a), g -= f * a, 0 < h.length || 0 < f) {
        h[h.length] = f;
      }
    }
    c[c.length] = g;
    k = h;
  }
  a = "";
  for (d = c.length - 1;0 <= d;d--) {
    a += e.charAt(c[d]);
  }
  c = Math.ceil(8 * b.length / (Math.log(e.length) / Math.log(2)));
  for (d = a.length;d < c;d++) {
    a = e[0] + a;
  }
  return a;
}
function str2rstr_utf8(b) {
  for (var e = "", a = -1, c, d;++a < b.length;) {
    c = b.charCodeAt(a), d = a + 1 < b.length ? b.charCodeAt(a + 1) : 0, 55296 <= c && 56319 >= c && 56320 <= d && 57343 >= d && (c = 65536 + ((c & 1023) << 10) + (d & 1023), a++), 127 >= c ? e += String.fromCharCode(c) : 2047 >= c ? e += String.fromCharCode(192 | c >>> 6 & 31, 128 | c & 63) : 65535 >= c ? e += String.fromCharCode(224 | c >>> 12 & 15, 128 | c >>> 6 & 63, 128 | c & 63) : 2097151 >= c && (e += String.fromCharCode(240 | c >>> 18 & 7, 128 | c >>> 12 & 63, 128 | c >>> 6 & 63, 128 | c & 
    63));
  }
  return e;
}
function str2rstr_utf16le(b) {
  for (var e = "", a = 0;a < b.length;a++) {
    e += String.fromCharCode(b.charCodeAt(a) & 255, b.charCodeAt(a) >>> 8 & 255);
  }
  return e;
}
function str2rstr_utf16be(b) {
  for (var e = "", a = 0;a < b.length;a++) {
    e += String.fromCharCode(b.charCodeAt(a) >>> 8 & 255, b.charCodeAt(a) & 255);
  }
  return e;
}
function rstr2binb(b) {
  for (var e = Array(b.length >> 2), a = 0;a < e.length;a++) {
    e[a] = 0;
  }
  for (a = 0;a < 8 * b.length;a += 8) {
    e[a >> 5] |= (b.charCodeAt(a / 8) & 255) << 24 - a % 32;
  }
  return e;
}
function binb2rstr(b) {
  for (var e = "", a = 0;a < 32 * b.length;a += 8) {
    e += String.fromCharCode(b[a >> 5] >>> 24 - a % 32 & 255);
  }
  return e;
}
function binb_sha1(b, e) {
  b[e >> 5] |= 128 << 24 - e % 32;
  b[(e + 64 >> 9 << 4) + 15] = e;
  for (var a = Array(80), c = 1732584193, d = -271733879, f = -1732584194, g = 271733878, h = -1009589776, k = 0;k < b.length;k += 16) {
    for (var n = c, m = d, p = f, q = g, r = h, l = 0;80 > l;l++) {
      a[l] = 16 > l ? b[k + l] : bit_rol(a[l - 3] ^ a[l - 8] ^ a[l - 14] ^ a[l - 16], 1);
      var t = safe_add(safe_add(bit_rol(c, 5), sha1_ft(l, d, f, g)), safe_add(safe_add(h, a[l]), sha1_kt(l))), h = g, g = f, f = bit_rol(d, 30), d = c, c = t;
    }
    c = safe_add(c, n);
    d = safe_add(d, m);
    f = safe_add(f, p);
    g = safe_add(g, q);
    h = safe_add(h, r);
  }
  return [c, d, f, g, h];
}
function sha1_ft(b, e, a, c) {
  return 20 > b ? e & a | ~e & c : 40 > b ? e ^ a ^ c : 60 > b ? e & a | e & c | a & c : e ^ a ^ c;
}
function sha1_kt(b) {
  return 20 > b ? 1518500249 : 40 > b ? 1859775393 : 60 > b ? -1894007588 : -899497514;
}
function safe_add(b, e) {
  var a = (b & 65535) + (e & 65535);
  return (b >> 16) + (e >> 16) + (a >> 16) << 16 | a & 65535;
}
function bit_rol(b, e) {
  return b << e | b >>> 32 - e;
}
hexcase = 0;
b64pad = "";
function hex_md5(b) {
  return rstr2hex(rstr_md5(str2rstr_utf8(b)));
}
function b64_md5(b) {
  return rstr2b64(rstr_md5(str2rstr_utf8(b)));
}
function any_md5(b, e) {
  return rstr2any(rstr_md5(str2rstr_utf8(b)), e);
}
function hex_hmac_md5(b, e) {
  return rstr2hex(rstr_hmac_md5(str2rstr_utf8(b), str2rstr_utf8(e)));
}
function b64_hmac_md5(b, e) {
  return rstr2b64(rstr_hmac_md5(str2rstr_utf8(b), str2rstr_utf8(e)));
}
function any_hmac_md5(b, e, a) {
  return rstr2any(rstr_hmac_md5(str2rstr_utf8(b), str2rstr_utf8(e)), a);
}
function md5_vm_test() {
  return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc").toLowerCase();
}
function rstr_md5(b) {
  return binl2rstr(binl_md5(rstr2binl(b), 8 * b.length));
}
function rstr_hmac_md5(b, e) {
  var a = rstr2binl(b);
  16 < a.length && (a = binl_md5(a, 8 * b.length));
  for (var c = Array(16), d = Array(16), f = 0;16 > f;f++) {
    c[f] = a[f] ^ 909522486, d[f] = a[f] ^ 1549556828;
  }
  a = binl_md5(c.concat(rstr2binl(e)), 512 + 8 * e.length);
  return binl2rstr(binl_md5(d.concat(a), 640));
}
function rstr2hex(b) {
  try {
    hexcase;
  } catch (f) {
    hexcase = 0;
  }
  for (var e = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", a = "", c, d = 0;d < b.length;d++) {
    c = b.charCodeAt(d), a += e.charAt(c >>> 4 & 15) + e.charAt(c & 15);
  }
  return a;
}
function rstr2b64(b) {
  try {
    b64pad;
  } catch (h) {
    b64pad = "";
  }
  for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = "", c = b.length, d = 0;d < c;d += 3) {
    for (var f = b.charCodeAt(d) << 16 | (d + 1 < c ? b.charCodeAt(d + 1) << 8 : 0) | (d + 2 < c ? b.charCodeAt(d + 2) : 0), g = 0;4 > g;g++) {
      a = 8 * d + 6 * g > 8 * b.length ? a + b64pad : a + e.charAt(f >>> 6 * (3 - g) & 63);
    }
  }
  return a;
}
function rstr2any(b, e) {
  var a = e.length, c, d, f, g, h, k = Array(Math.ceil(b.length / 2));
  for (c = 0;c < k.length;c++) {
    k[c] = b.charCodeAt(2 * c) << 8 | b.charCodeAt(2 * c + 1);
  }
  var n = Math.ceil(8 * b.length / (Math.log(e.length) / Math.log(2))), m = Array(n);
  for (d = 0;d < n;d++) {
    h = [];
    for (c = g = 0;c < k.length;c++) {
      if (g = (g << 16) + k[c], f = Math.floor(g / a), g -= f * a, 0 < h.length || 0 < f) {
        h[h.length] = f;
      }
    }
    m[d] = g;
    k = h;
  }
  a = "";
  for (c = m.length - 1;0 <= c;c--) {
    a += e.charAt(m[c]);
  }
  return a;
}
function str2rstr_utf8(b) {
  for (var e = "", a = -1, c, d;++a < b.length;) {
    c = b.charCodeAt(a), d = a + 1 < b.length ? b.charCodeAt(a + 1) : 0, 55296 <= c && 56319 >= c && 56320 <= d && 57343 >= d && (c = 65536 + ((c & 1023) << 10) + (d & 1023), a++), 127 >= c ? e += String.fromCharCode(c) : 2047 >= c ? e += String.fromCharCode(192 | c >>> 6 & 31, 128 | c & 63) : 65535 >= c ? e += String.fromCharCode(224 | c >>> 12 & 15, 128 | c >>> 6 & 63, 128 | c & 63) : 2097151 >= c && (e += String.fromCharCode(240 | c >>> 18 & 7, 128 | c >>> 12 & 63, 128 | c >>> 6 & 63, 128 | c & 
    63));
  }
  return e;
}
function str2rstr_utf16le(b) {
  for (var e = "", a = 0;a < b.length;a++) {
    e += String.fromCharCode(b.charCodeAt(a) & 255, b.charCodeAt(a) >>> 8 & 255);
  }
  return e;
}
function str2rstr_utf16be(b) {
  for (var e = "", a = 0;a < b.length;a++) {
    e += String.fromCharCode(b.charCodeAt(a) >>> 8 & 255, b.charCodeAt(a) & 255);
  }
  return e;
}
function rstr2binl(b) {
  for (var e = Array(b.length >> 2), a = 0;a < e.length;a++) {
    e[a] = 0;
  }
  for (a = 0;a < 8 * b.length;a += 8) {
    e[a >> 5] |= (b.charCodeAt(a / 8) & 255) << a % 32;
  }
  return e;
}
function binl2rstr(b) {
  for (var e = "", a = 0;a < 32 * b.length;a += 8) {
    e += String.fromCharCode(b[a >> 5] >>> a % 32 & 255);
  }
  return e;
}
function binl_md5(b, e) {
  b[e >> 5] |= 128 << e % 32;
  b[(e + 64 >>> 9 << 4) + 14] = e;
  for (var a = 1732584193, c = -271733879, d = -1732584194, f = 271733878, g = 0;g < b.length;g += 16) {
    var h = a, k = c, n = d, m = f, a = md5_ff(a, c, d, f, b[g + 0], 7, -680876936), f = md5_ff(f, a, c, d, b[g + 1], 12, -389564586), d = md5_ff(d, f, a, c, b[g + 2], 17, 606105819), c = md5_ff(c, d, f, a, b[g + 3], 22, -1044525330), a = md5_ff(a, c, d, f, b[g + 4], 7, -176418897), f = md5_ff(f, a, c, d, b[g + 5], 12, 1200080426), d = md5_ff(d, f, a, c, b[g + 6], 17, -1473231341), c = md5_ff(c, d, f, a, b[g + 7], 22, -45705983), a = md5_ff(a, c, d, f, b[g + 8], 7, 1770035416), f = md5_ff(f, a, c, 
    d, b[g + 9], 12, -1958414417), d = md5_ff(d, f, a, c, b[g + 10], 17, -42063), c = md5_ff(c, d, f, a, b[g + 11], 22, -1990404162), a = md5_ff(a, c, d, f, b[g + 12], 7, 1804603682), f = md5_ff(f, a, c, d, b[g + 13], 12, -40341101), d = md5_ff(d, f, a, c, b[g + 14], 17, -1502002290), c = md5_ff(c, d, f, a, b[g + 15], 22, 1236535329), a = md5_gg(a, c, d, f, b[g + 1], 5, -165796510), f = md5_gg(f, a, c, d, b[g + 6], 9, -1069501632), d = md5_gg(d, f, a, c, b[g + 11], 14, 643717713), c = md5_gg(c, d, 
    f, a, b[g + 0], 20, -373897302), a = md5_gg(a, c, d, f, b[g + 5], 5, -701558691), f = md5_gg(f, a, c, d, b[g + 10], 9, 38016083), d = md5_gg(d, f, a, c, b[g + 15], 14, -660478335), c = md5_gg(c, d, f, a, b[g + 4], 20, -405537848), a = md5_gg(a, c, d, f, b[g + 9], 5, 568446438), f = md5_gg(f, a, c, d, b[g + 14], 9, -1019803690), d = md5_gg(d, f, a, c, b[g + 3], 14, -187363961), c = md5_gg(c, d, f, a, b[g + 8], 20, 1163531501), a = md5_gg(a, c, d, f, b[g + 13], 5, -1444681467), f = md5_gg(f, a, 
    c, d, b[g + 2], 9, -51403784), d = md5_gg(d, f, a, c, b[g + 7], 14, 1735328473), c = md5_gg(c, d, f, a, b[g + 12], 20, -1926607734), a = md5_hh(a, c, d, f, b[g + 5], 4, -378558), f = md5_hh(f, a, c, d, b[g + 8], 11, -2022574463), d = md5_hh(d, f, a, c, b[g + 11], 16, 1839030562), c = md5_hh(c, d, f, a, b[g + 14], 23, -35309556), a = md5_hh(a, c, d, f, b[g + 1], 4, -1530992060), f = md5_hh(f, a, c, d, b[g + 4], 11, 1272893353), d = md5_hh(d, f, a, c, b[g + 7], 16, -155497632), c = md5_hh(c, d, 
    f, a, b[g + 10], 23, -1094730640), a = md5_hh(a, c, d, f, b[g + 13], 4, 681279174), f = md5_hh(f, a, c, d, b[g + 0], 11, -358537222), d = md5_hh(d, f, a, c, b[g + 3], 16, -722521979), c = md5_hh(c, d, f, a, b[g + 6], 23, 76029189), a = md5_hh(a, c, d, f, b[g + 9], 4, -640364487), f = md5_hh(f, a, c, d, b[g + 12], 11, -421815835), d = md5_hh(d, f, a, c, b[g + 15], 16, 530742520), c = md5_hh(c, d, f, a, b[g + 2], 23, -995338651), a = md5_ii(a, c, d, f, b[g + 0], 6, -198630844), f = md5_ii(f, a, 
    c, d, b[g + 7], 10, 1126891415), d = md5_ii(d, f, a, c, b[g + 14], 15, -1416354905), c = md5_ii(c, d, f, a, b[g + 5], 21, -57434055), a = md5_ii(a, c, d, f, b[g + 12], 6, 1700485571), f = md5_ii(f, a, c, d, b[g + 3], 10, -1894986606), d = md5_ii(d, f, a, c, b[g + 10], 15, -1051523), c = md5_ii(c, d, f, a, b[g + 1], 21, -2054922799), a = md5_ii(a, c, d, f, b[g + 8], 6, 1873313359), f = md5_ii(f, a, c, d, b[g + 15], 10, -30611744), d = md5_ii(d, f, a, c, b[g + 6], 15, -1560198380), c = md5_ii(c, 
    d, f, a, b[g + 13], 21, 1309151649), a = md5_ii(a, c, d, f, b[g + 4], 6, -145523070), f = md5_ii(f, a, c, d, b[g + 11], 10, -1120210379), d = md5_ii(d, f, a, c, b[g + 2], 15, 718787259), c = md5_ii(c, d, f, a, b[g + 9], 21, -343485551), a = safe_add(a, h), c = safe_add(c, k), d = safe_add(d, n), f = safe_add(f, m)
  }
  return [a, c, d, f];
}
function md5_cmn(b, e, a, c, d, f) {
  return safe_add(bit_rol(safe_add(safe_add(e, b), safe_add(c, f)), d), a);
}
function md5_ff(b, e, a, c, d, f, g) {
  return md5_cmn(e & a | ~e & c, b, e, d, f, g);
}
function md5_gg(b, e, a, c, d, f, g) {
  return md5_cmn(e & c | a & ~c, b, e, d, f, g);
}
function md5_hh(b, e, a, c, d, f, g) {
  return md5_cmn(e ^ a ^ c, b, e, d, f, g);
}
function md5_ii(b, e, a, c, d, f, g) {
  return md5_cmn(a ^ (e | ~c), b, e, d, f, g);
}
function safe_add(b, e) {
  var a = (b & 65535) + (e & 65535);
  return (b >> 16) + (e >> 16) + (a >> 16) << 16 | a & 65535;
}
function bit_rol(b, e) {
  return b << e | b >>> 32 - e;
}
;