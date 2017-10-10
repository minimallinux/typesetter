(function(e) {
  jQuery.scrollSpeed = function(p, c, k) {
    var f = e(document), d = e(window), q = e("html, body"), r = k || "default", a = 0, g = !1, h, l, m, n;
    d.on("mousewheel DOMMouseScroll", function(b) {
      a = 0 == a ? e(window).scrollTop() : a;
      b = window.event || b;
      b = b.originalEvent ? b.originalEvent : b;
      0 < (b.detail ? -40 * b.detail : b.wheelDelta) ? (n = !0, m = !1) : (m = !0, n = !1);
      h = f.height() > d.height();
      g = !0;
      h && (l = d.height(), m && (a = a + l >= f.height() ? a : a += p), n && (a = 0 >= a ? 0 : a -= p), q.stop().animate({scrollTop:a}, c, r, function() {
        g = !1;
      }));
      return !1;
    }).on("scroll", function() {
      h && !g && (a = d.scrollTop());
    }).on("resize", function() {
      h && !g && (l = d.height());
    });
  };
  jQuery.easing["default"] = function(e, c, k, f, d) {
    return -f * ((c = c / d - 1) * c * c * c - 1) + k;
  };
})(jQuery);
