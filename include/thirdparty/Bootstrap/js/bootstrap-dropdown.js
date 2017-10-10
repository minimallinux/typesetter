!function(d) {
  function g() {
    d("[data-toggle=dropdown]").each(function() {
      f(d(this)).removeClass("open");
    });
  }
  function f(b) {
    var a = b.attr("data-target");
    a || (a = (a = b.attr("href")) && /#/.test(a) && a.replace(/.*(?=#[^\s]*$)/, ""));
    (a = a && d(a)) && a.length || (a = b.parent());
    return a;
  }
  var e = function(b) {
    var a = d(b).on("click.dropdown.data-api", this.toggle);
    d("html").on("click.dropdown.data-api", function() {
      a.parent().removeClass("open");
    });
  };
  e.prototype = {constructor:e, toggle:function(b) {
    b = d(this);
    var a, c;
    if (!b.is(".disabled, :disabled")) {
      return a = f(b), c = a.hasClass("open"), g(), c || a.toggleClass("open"), b.focus(), !1;
    }
  }, keydown:function(b) {
    var a, c, e;
    if (/(38|40|27)/.test(b.keyCode) && (a = d(this), b.preventDefault(), b.stopPropagation(), !a.is(".disabled, :disabled"))) {
      c = f(a);
      e = c.hasClass("open");
      if (!e || e && 27 == b.keyCode) {
        return 27 == b.which && c.find("[data-toggle=dropdown]").focus(), a.click();
      }
      a = d("[role=menu] li:not(.divider):visible a", c);
      a.length && (c = a.index(a.filter(":focus")), 38 == b.keyCode && 0 < c && c--, 40 == b.keyCode && c < a.length - 1 && c++, ~c || (c = 0), a.eq(c).focus());
    }
  }};
  var h = d.fn.dropdown;
  d.fn.dropdown = function(b) {
    return this.each(function() {
      var a = d(this), c = a.data("dropdown");
      c || a.data("dropdown", c = new e(this));
      "string" == typeof b && c[b].call(a);
    });
  };
  d.fn.dropdown.Constructor = e;
  d.fn.dropdown.noConflict = function() {
    d.fn.dropdown = h;
    return this;
  };
  d(document).on("click.dropdown.data-api", g).on("click.dropdown.data-api", ".dropdown form", function(b) {
    b.stopPropagation();
  }).on("click.dropdown-menu", function(b) {
    b.stopPropagation();
  }).on("click.dropdown.data-api", "[data-toggle=dropdown]", e.prototype.toggle).on("keydown.dropdown.data-api", "[data-toggle=dropdown], [role=menu]", e.prototype.keydown);
}(window.jQuery);
