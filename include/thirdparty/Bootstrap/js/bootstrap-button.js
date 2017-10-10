!function(b) {
  var c = function(a, e) {
    this.$element = b(a);
    this.options = b.extend({}, b.fn.button.defaults, e);
  };
  c.prototype.setState = function(a) {
    var b = this.$element, d = b.data(), c = b.is("input") ? "val" : "html";
    a += "Text";
    d.resetText || b.data("resetText", b[c]());
    b[c](d[a] || this.options[a]);
    setTimeout(function() {
      "loadingText" == a ? b.addClass("disabled").attr("disabled", "disabled") : b.removeClass("disabled").removeAttr("disabled");
    }, 0);
  };
  c.prototype.toggle = function() {
    var a = this.$element.closest('[data-toggle="buttons-radio"]');
    a && a.find(".active").removeClass("active");
    this.$element.toggleClass("active");
  };
  var f = b.fn.button;
  b.fn.button = function(a) {
    return this.each(function() {
      var e = b(this), d = e.data("button"), f = "object" == typeof a && a;
      d || e.data("button", d = new c(this, f));
      "toggle" == a ? d.toggle() : a && d.setState(a);
    });
  };
  b.fn.button.defaults = {loadingText:"loading..."};
  b.fn.button.Constructor = c;
  b.fn.button.noConflict = function() {
    b.fn.button = f;
    return this;
  };
  b(document).on("click.button.data-api", "[data-toggle^=button]", function(a) {
    a = b(a.target);
    a.hasClass("btn") || (a = a.closest(".btn"));
    a.button("toggle");
  });
}(window.jQuery);
