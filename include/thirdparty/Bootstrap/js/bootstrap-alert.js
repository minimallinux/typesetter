!function(a) {
  var g = function(b) {
    a(b).on("click", '[data-dismiss="alert"]', this.close);
  };
  g.prototype.close = function(b) {
    function e() {
      d.trigger("closed").remove();
    }
    var c = a(this), f = c.attr("data-target"), d;
    f || (f = (f = c.attr("href")) && f.replace(/.*(?=#[^\s]*$)/, ""));
    d = a(f);
    b && b.preventDefault();
    d.length || (d = c.hasClass("alert") ? c : c.parent());
    d.trigger(b = a.Event("close"));
    b.isDefaultPrevented() || (d.removeClass("in"), a.support.transition && d.hasClass("fade") ? d.on(a.support.transition.end, e) : e());
  };
  var h = a.fn.alert;
  a.fn.alert = function(b) {
    return this.each(function() {
      var e = a(this), c = e.data("alert");
      c || e.data("alert", c = new g(this));
      "string" == typeof b && c[b].call(e);
    });
  };
  a.fn.alert.Constructor = g;
  a.fn.alert.noConflict = function() {
    a.fn.alert = h;
    return this;
  };
  a(document).on("click.alert.data-api", '[data-dismiss="alert"]', g.prototype.close);
}(window.jQuery);
