!function(a) {
  var h = function(c, b) {
    this.options = a.extend({}, a.fn.affix.defaults, b);
    this.$window = a(window).on("scroll.affix.data-api", a.proxy(this.checkPosition, this)).on("click.affix.data-api", a.proxy(function() {
      setTimeout(a.proxy(this.checkPosition, this), 1);
    }, this));
    this.$element = a(c);
    this.checkPosition();
  };
  h.prototype.checkPosition = function() {
    if (this.$element.is(":visible")) {
      var c = a(document).height(), b = this.$window.scrollTop(), e = this.$element.offset(), d = this.options.offset, f = d.bottom, g = d.top;
      "object" != typeof d && (f = g = d);
      "function" == typeof g && (g = d.top());
      "function" == typeof f && (f = d.bottom());
      c = null != this.unpin && b + this.unpin <= e.top ? !1 : null != f && e.top + this.$element.height() >= c - f ? "bottom" : null != g && b <= g ? "top" : !1;
      this.affixed !== c && (this.affixed = c, this.unpin = "bottom" == c ? e.top - b : null, this.$element.removeClass("affix affix-top affix-bottom").addClass("affix" + (c ? "-" + c : "")));
    }
  };
  var k = a.fn.affix;
  a.fn.affix = function(c) {
    return this.each(function() {
      var b = a(this), e = b.data("affix"), d = "object" == typeof c && c;
      e || b.data("affix", e = new h(this, d));
      if ("string" == typeof c) {
        e[c]();
      }
    });
  };
  a.fn.affix.Constructor = h;
  a.fn.affix.defaults = {offset:0};
  a.fn.affix.noConflict = function() {
    a.fn.affix = k;
    return this;
  };
  a(window).on("load", function() {
    a('[data-spy="affix"]').each(function() {
      var c = a(this), b = c.data();
      b.offset = b.offset || {};
      b.offsetBottom && (b.offset.bottom = b.offsetBottom);
      b.offsetTop && (b.offset.top = b.offsetTop);
      c.affix(b);
    });
  });
}(window.jQuery);
