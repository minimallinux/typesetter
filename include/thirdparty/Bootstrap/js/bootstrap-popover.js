!function(a) {
  var e = function(c, a) {
    this.init("popover", c, a);
  };
  e.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, {constructor:e, setContent:function() {
    var a = this.tip(), b = this.getTitle(), d = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b);
    a.find(".popover-content")[this.options.html ? "html" : "text"](d);
    a.removeClass("fade top bottom left right in");
  }, hasContent:function() {
    return this.getTitle() || this.getContent();
  }, getContent:function() {
    var a = this.$element, b = this.options;
    return ("function" == typeof b.content ? b.content.call(a[0]) : b.content) || a.attr("data-content");
  }, tip:function() {
    this.$tip || (this.$tip = a(this.options.template));
    return this.$tip;
  }, destroy:function() {
    this.hide().$element.off("." + this.type).removeData(this.type);
  }});
  var f = a.fn.popover;
  a.fn.popover = function(c) {
    return this.each(function() {
      var b = a(this), d = b.data("popover"), f = "object" == typeof c && c;
      d || b.data("popover", d = new e(this, f));
      if ("string" == typeof c) {
        d[c]();
      }
    });
  };
  a.fn.popover.Constructor = e;
  a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, {placement:"right", trigger:"click", content:"", template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'});
  a.fn.popover.noConflict = function() {
    a.fn.popover = f;
    return this;
  };
}(window.jQuery);
