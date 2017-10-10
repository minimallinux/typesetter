(function(K){function x(a,b,c){var f=0,g=[0],l="",h=null,l=c||"UTF8";if("UTF8"!==l&&"UTF16BE"!==l&&"UTF16LE"!==l)throw"encoding must be UTF8, UTF16BE, or UTF16LE";if("HEX"===b){if(0!==a.length%2)throw"srcString of HEX type must be in byte increments";h=z(a);f=h.binLen;g=h.value}else if("TEXT"===b||"ASCII"===b)h=A(a,l),f=h.binLen,g=h.value;else if("B64"===b)h=B(a),f=h.binLen,g=h.value;else if("BYTES"===b)h=C(a),f=h.binLen,g=h.value;else throw"inputFormat must be HEX, TEXT, ASCII, B64, or BYTES";this.getHash=
function(a,b,c,l){var h=null,e=g.slice(),n=f,p;3===arguments.length?"number"!==typeof c&&(l=c,c=1):2===arguments.length&&(c=1);if(c!==parseInt(c,10)||1>c)throw"numRounds must a integer >= 1";switch(b){case "HEX":h=E;break;case "B64":h=F;break;case "BYTES":h=G;break;default:throw"format must be HEX, B64, or BYTES";}if("SHA-384"===a)for(p=0;p<c;p+=1)e=v(e,n,a),n=384;else if("SHA-512"===a)for(p=0;p<c;p+=1)e=v(e,n,a),n=512;else throw"Chosen SHA variant is not supported";return h(e,H(l))};this.getHMAC=
function(a,b,c,h,m){var e,n,p,r,q=[],I=[];switch(h){case "HEX":h=E;break;case "B64":h=F;break;case "BYTES":h=G;break;default:throw"outputFormat must be HEX, B64, or BYTES";}if("SHA-384"===c)n=128,r=384;else if("SHA-512"===c)n=128,r=512;else throw"Chosen SHA variant is not supported";if("HEX"===b)e=z(a),p=e.binLen,e=e.value;else if("TEXT"===b||"ASCII"===b)e=A(a,l),p=e.binLen,e=e.value;else if("B64"===b)e=B(a),p=e.binLen,e=e.value;else if("BYTES"===b)e=C(a),p=e.binLen,e=e.value;else throw"inputFormat must be HEX, TEXT, ASCII, B64, or BYTES";
a=8*n;b=n/4-1;if(n<p/8){for(e=v(e,p,c);e.length<=b;)e.push(0);e[b]&=4294967040}else if(n>p/8){for(;e.length<=b;)e.push(0);e[b]&=4294967040}for(n=0;n<=b;n+=1)q[n]=e[n]^909522486,I[n]=e[n]^1549556828;c=v(I.concat(v(q.concat(g),a+f,c)),a+r,c);return h(c,H(m))}}function m(a,b){this.a=a;this.b=b}function A(a,b){var c=[],f,g=[],l=0,h,t,m;if("UTF8"===b)for(h=0;h<a.length;h+=1)for(f=a.charCodeAt(h),g=[],128>f?g.push(f):2048>f?(g.push(192|f>>>6),g.push(128|f&63)):55296>f||57344<=f?g.push(224|f>>>12,128|f>>>
6&63,128|f&63):(h+=1,f=65536+((f&1023)<<10|a.charCodeAt(h)&1023),g.push(240|f>>>18,128|f>>>12&63,128|f>>>6&63,128|f&63)),t=0;t<g.length;t+=1){for(m=l>>>2;c.length<=m;)c.push(0);c[m]|=g[t]<<24-l%4*8;l+=1}else if("UTF16BE"===b||"UTF16LE"===b)for(h=0;h<a.length;h+=1){f=a.charCodeAt(h);"UTF16LE"===b&&(t=f&255,f=t<<8|f>>8);for(m=l>>>2;c.length<=m;)c.push(0);c[m]|=f<<16-l%4*8;l+=2}return{value:c,binLen:8*l}}function z(a){var b=[],c=a.length,f,g,l;if(0!==c%2)throw"String of HEX type must be in byte increments";
for(f=0;f<c;f+=2){g=parseInt(a.substr(f,2),16);if(isNaN(g))throw"String of HEX type contains invalid characters";for(l=f>>>3;b.length<=l;)b.push(0);b[f>>>3]|=g<<24-f%8*4}return{value:b,binLen:4*c}}function C(a){var b=[],c,f,g;for(f=0;f<a.length;f+=1)c=a.charCodeAt(f),g=f>>>2,b.length<=g&&b.push(0),b[g]|=c<<24-f%4*8;return{value:b,binLen:8*a.length}}function B(a){var b=[],c=0,f,g,l,h,m;if(-1===a.search(/^[a-zA-Z0-9=+\/]+$/))throw"Invalid character in base-64 string";g=a.indexOf("=");a=a.replace(/\=/g,
"");if(-1!==g&&g<a.length)throw"Invalid '=' found in base-64 string";for(g=0;g<a.length;g+=4){m=a.substr(g,4);for(l=h=0;l<m.length;l+=1)f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(m[l]),h|=f<<18-6*l;for(l=0;l<m.length-1;l+=1){for(f=c>>>2;b.length<=f;)b.push(0);b[f]|=(h>>>16-8*l&255)<<24-c%4*8;c+=1}}return{value:b,binLen:8*c}}function E(a,b){var c="",f=4*a.length,g,l;for(g=0;g<f;g+=1)l=a[g>>>2]>>>8*(3-g%4),c+="0123456789abcdef".charAt(l>>>4&15)+"0123456789abcdef".charAt(l&
15);return b.outputUpper?c.toUpperCase():c}function F(a,b){var c="",f=4*a.length,g,l,h;for(g=0;g<f;g+=3)for(h=g+1>>>2,l=a.length<=h?0:a[h],h=g+2>>>2,h=a.length<=h?0:a[h],h=(a[g>>>2]>>>8*(3-g%4)&255)<<16|(l>>>8*(3-(g+1)%4)&255)<<8|h>>>8*(3-(g+2)%4)&255,l=0;4>l;l+=1)c=8*g+6*l<=32*a.length?c+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h>>>6*(3-l)&63):c+b.b64Pad;return c}function G(a){var b="",c=4*a.length,f,g;for(f=0;f<c;f+=1)g=a[f>>>2]>>>8*(3-f%4)&255,b+=String.fromCharCode(g);
return b}function H(a){var b={outputUpper:!1,b64Pad:"="};try{a.hasOwnProperty("outputUpper")&&(b.outputUpper=a.outputUpper),a.hasOwnProperty("b64Pad")&&(b.b64Pad=a.b64Pad)}catch(c){}if("boolean"!==typeof b.outputUpper)throw"Invalid outputUpper formatting option";if("string"!==typeof b.b64Pad)throw"Invalid b64Pad formatting option";return b}function q(a,b){var c=null,c=new m(a.a,a.b);return 32>=b?new m(c.a>>>b|c.b<<32-b&4294967295,c.b>>>b|c.a<<32-b&4294967295):new m(c.b>>>b-32|c.a<<64-b&4294967295,
c.a>>>b-32|c.b<<64-b&4294967295)}function J(a,b){return 32>=b?new m(a.a>>>b,a.b>>>b|a.a<<32-b&4294967295):new m(0,a.a>>>b-32)}function L(a,b,c){return new m(a.a&b.a^~a.a&c.a,a.b&b.b^~a.b&c.b)}function M(a,b,c){return new m(a.a&b.a^a.a&c.a^b.a&c.a,a.b&b.b^a.b&c.b^b.b&c.b)}function N(a){var b=q(a,28),c=q(a,34);a=q(a,39);return new m(b.a^c.a^a.a,b.b^c.b^a.b)}function O(a){var b=q(a,14),c=q(a,18);a=q(a,41);return new m(b.a^c.a^a.a,b.b^c.b^a.b)}function P(a){var b=q(a,1),c=q(a,8);a=J(a,7);return new m(b.a^
c.a^a.a,b.b^c.b^a.b)}function Q(a){var b=q(a,19),c=q(a,61);a=J(a,6);return new m(b.a^c.a^a.a,b.b^c.b^a.b)}function R(a,b){var c,f,g;c=(a.b&65535)+(b.b&65535);f=(a.b>>>16)+(b.b>>>16)+(c>>>16);g=(f&65535)<<16|c&65535;c=(a.a&65535)+(b.a&65535)+(f>>>16);f=(a.a>>>16)+(b.a>>>16)+(c>>>16);return new m((f&65535)<<16|c&65535,g)}function S(a,b,c,f){var g,l,h;g=(a.b&65535)+(b.b&65535)+(c.b&65535)+(f.b&65535);l=(a.b>>>16)+(b.b>>>16)+(c.b>>>16)+(f.b>>>16)+(g>>>16);h=(l&65535)<<16|g&65535;g=(a.a&65535)+(b.a&65535)+
(c.a&65535)+(f.a&65535)+(l>>>16);l=(a.a>>>16)+(b.a>>>16)+(c.a>>>16)+(f.a>>>16)+(g>>>16);return new m((l&65535)<<16|g&65535,h)}function T(a,b,c,f,g){var l,h,t;l=(a.b&65535)+(b.b&65535)+(c.b&65535)+(f.b&65535)+(g.b&65535);h=(a.b>>>16)+(b.b>>>16)+(c.b>>>16)+(f.b>>>16)+(g.b>>>16)+(l>>>16);t=(h&65535)<<16|l&65535;l=(a.a&65535)+(b.a&65535)+(c.a&65535)+(f.a&65535)+(g.a&65535)+(h>>>16);h=(a.a>>>16)+(b.a>>>16)+(c.a>>>16)+(f.a>>>16)+(g.a>>>16)+(l>>>16);return new m((h&65535)<<16|l&65535,t)}function v(a,b,c){var f,
g,l,h,t,q,v,D,w,e,n,p,r,x,I,u,z,A,B,C,E,F,G,H,d,y=[],J,k=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,
3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];e=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428];g=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];if("SHA-384"===c||"SHA-512"===c)n=80,f=(b+128>>>10<<5)+31,x=32,I=2,d=m,u=R,z=S,A=T,
B=P,C=Q,E=N,F=O,H=M,G=L,k=[new d(k[0],3609767458),new d(k[1],602891725),new d(k[2],3964484399),new d(k[3],2173295548),new d(k[4],4081628472),new d(k[5],3053834265),new d(k[6],2937671579),new d(k[7],3664609560),new d(k[8],2734883394),new d(k[9],1164996542),new d(k[10],1323610764),new d(k[11],3590304994),new d(k[12],4068182383),new d(k[13],991336113),new d(k[14],633803317),new d(k[15],3479774868),new d(k[16],2666613458),new d(k[17],944711139),new d(k[18],2341262773),new d(k[19],2007800933),new d(k[20],
1495990901),new d(k[21],1856431235),new d(k[22],3175218132),new d(k[23],2198950837),new d(k[24],3999719339),new d(k[25],766784016),new d(k[26],2566594879),new d(k[27],3203337956),new d(k[28],1034457026),new d(k[29],2466948901),new d(k[30],3758326383),new d(k[31],168717936),new d(k[32],1188179964),new d(k[33],1546045734),new d(k[34],1522805485),new d(k[35],2643833823),new d(k[36],2343527390),new d(k[37],1014477480),new d(k[38],1206759142),new d(k[39],344077627),new d(k[40],1290863460),new d(k[41],
3158454273),new d(k[42],3505952657),new d(k[43],106217008),new d(k[44],3606008344),new d(k[45],1432725776),new d(k[46],1467031594),new d(k[47],851169720),new d(k[48],3100823752),new d(k[49],1363258195),new d(k[50],3750685593),new d(k[51],3785050280),new d(k[52],3318307427),new d(k[53],3812723403),new d(k[54],2003034995),new d(k[55],3602036899),new d(k[56],1575990012),new d(k[57],1125592928),new d(k[58],2716904306),new d(k[59],442776044),new d(k[60],593698344),new d(k[61],3733110249),new d(k[62],2999351573),
new d(k[63],3815920427),new d(3391569614,3928383900),new d(3515267271,566280711),new d(3940187606,3454069534),new d(4118630271,4000239992),new d(116418474,1914138554),new d(174292421,2731055270),new d(289380356,3203993006),new d(460393269,320620315),new d(685471733,587496836),new d(852142971,1086792851),new d(1017036298,365543100),new d(1126000580,2618297676),new d(1288033470,3409855158),new d(1501505948,4234509866),new d(1607167915,987167468),new d(1816402316,1246189591)],e="SHA-384"===c?[new d(3418070365,
e[0]),new d(1654270250,e[1]),new d(2438529370,e[2]),new d(355462360,e[3]),new d(1731405415,e[4]),new d(41048885895,e[5]),new d(3675008525,e[6]),new d(1203062813,e[7])]:[new d(g[0],4089235720),new d(g[1],2227873595),new d(g[2],4271175723),new d(g[3],1595750129),new d(g[4],2917565137),new d(g[5],725511199),new d(g[6],4215389547),new d(g[7],327033209)];else throw"Unexpected error in SHA-2 implementation";for(;a.length<=f;)a.push(0);a[b>>>5]|=128<<24-b%32;a[f]=b;J=a.length;for(p=0;p<J;p+=x){b=e[0];f=
e[1];g=e[2];l=e[3];h=e[4];t=e[5];q=e[6];v=e[7];for(r=0;r<n;r+=1)16>r?(w=r*I+p,D=a.length<=w?0:a[w],w=a.length<=w+1?0:a[w+1],y[r]=new d(D,w)):y[r]=z(C(y[r-2]),y[r-7],B(y[r-15]),y[r-16]),D=A(v,F(h),G(h,t,q),k[r],y[r]),w=u(E(b),H(b,f,g)),v=q,q=t,t=h,h=u(l,D),l=g,g=f,f=b,b=u(D,w);e[0]=u(b,e[0]);e[1]=u(f,e[1]);e[2]=u(g,e[2]);e[3]=u(l,e[3]);e[4]=u(h,e[4]);e[5]=u(t,e[5]);e[6]=u(q,e[6]);e[7]=u(v,e[7])}if("SHA-384"===c)a=[e[0].a,e[0].b,e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,e[4].b,e[5].a,e[5].b];
else if("SHA-512"===c)a=[e[0].a,e[0].b,e[1].a,e[1].b,e[2].a,e[2].b,e[3].a,e[3].b,e[4].a,e[4].b,e[5].a,e[5].b,e[6].a,e[6].b,e[7].a,e[7].b];else throw"Unexpected error in SHA-2 implementation";return a}"function"===typeof define&&define.amd?define(function(){return x}):"undefined"!==typeof exports?"undefined"!==typeof module&&module.exports?module.exports=exports=x:exports=x:K.jsSHA=x})(this);