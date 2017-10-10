+function(b) {
  function f(a) {
    return this.each(function() {
      var c = b(this), e = c.data("bs.button"), g = "object" == typeof a && a;
      e || c.data("bs.button", e = new d(this, g));
      "toggle" == a ? e.toggle() : a && e.setState(a);
    });
  }
  var d = function(a, c) {
    this.$element = b(a);
    this.options = b.extend({}, d.DEFAULTS, c);
    this.isLoading = !1;
  };
  d.VERSION = "3.3.6";
  d.DEFAULTS = {loadingText:"loading..."};
  d.prototype.setState = function(a) {
    var c = this.$element, e = c.is("input") ? "val" : "html", d = c.data();
    a += "Text";
    null == d.resetText && c.data("resetText", c[e]());
    setTimeout(b.proxy(function() {
      c[e](null == d[a] ? this.options[a] : d[a]);
      "loadingText" == a ? (this.isLoading = !0, c.addClass("disabled").attr("disabled", "disabled")) : this.isLoading && (this.isLoading = !1, c.removeClass("disabled").removeAttr("disabled"));
    }, this), 0);
  };
  d.prototype.toggle = function() {
    var a = !0, c = this.$element.closest('[data-toggle="buttons"]');
    if (c.length) {
      var b = this.$element.find("input");
      "radio" == b.prop("type") ? (b.prop("checked") && (a = !1), c.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == b.prop("type") && (b.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active"));
      b.prop("checked", this.$element.hasClass("active"));
      a && b.trigger("change");
    } else {
      this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    }
  };
  var h = b.fn.button;
  b.fn.button = f;
  b.fn.button.Constructor = d;
  b.fn.button.noConflict = function() {
    b.fn.button = h;
    return this;
  };
  b(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(a) {
    var c = b(a.target);
    c.hasClass("btn") || (c = c.closest(".btn"));
    f.call(c, "toggle");
    b(a.target).is('input[type="radio"]') || b(a.target).is('input[type="checkbox"]') || a.preventDefault();
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(a) {
    b(a.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(a.type));
  });
}(jQuery);
