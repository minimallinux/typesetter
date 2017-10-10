!function(c) {
  var g = function(a, b) {
    this.init("tooltip", a, b);
  };
  g.prototype = {constructor:g, init:function(a, b, d) {
    var e;
    this.type = a;
    this.$element = c(b);
    this.options = this.getOptions(d);
    this.enabled = !0;
    b = this.options.trigger.split(" ");
    for (d = b.length;d--;) {
      if (e = b[d], "click" == e) {
        this.$element.on("click." + this.type, this.options.selector, c.proxy(this.toggle, this));
      } else {
        "manual" != e && (a = "hover" == e ? "mouseenter" : "focus", e = "hover" == e ? "mouseleave" : "blur", this.$element.on(a + "." + this.type, this.options.selector, c.proxy(this.enter, this)), this.$element.on(e + "." + this.type, this.options.selector, c.proxy(this.leave, this)));
      }
    }
    this.options.selector ? this._options = c.extend({}, this.options, {trigger:"manual", selector:""}) : this.fixTitle();
  }, getOptions:function(a) {
    a = c.extend({}, c.fn[this.type].defaults, this.$element.data(), a);
    a.delay && "number" == typeof a.delay && (a.delay = {show:a.delay, hide:a.delay});
    return a;
  }, enter:function(a) {
    var b = c.fn[this.type].defaults, d = {}, e;
    this._options && c.each(this._options, function(a, c) {
      b[a] != c && (d[a] = c);
    }, this);
    e = c(a.currentTarget)[this.type](d).data(this.type);
    if (!e.options.delay || !e.options.delay.show) {
      return e.show();
    }
    clearTimeout(this.timeout);
    e.hoverState = "in";
    this.timeout = setTimeout(function() {
      "in" == e.hoverState && e.show();
    }, e.options.delay.show);
  }, leave:function(a) {
    var b = c(a.currentTarget)[this.type](this._options).data(this.type);
    this.timeout && clearTimeout(this.timeout);
    if (!b.options.delay || !b.options.delay.hide) {
      return b.hide();
    }
    b.hoverState = "out";
    this.timeout = setTimeout(function() {
      "out" == b.hoverState && b.hide();
    }, b.options.delay.hide);
  }, show:function() {
    var a, b, d, e, f;
    b = c.Event("show");
    if (this.hasContent() && this.enabled && (this.$element.trigger(b), !b.isDefaultPrevented())) {
      a = this.tip();
      this.setContent();
      this.options.animation && a.addClass("fade");
      e = "function" == typeof this.options.placement ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement;
      a.detach().css({top:0, left:0, display:"block"});
      this.options.container ? a.appendTo(this.options.container) : a.insertAfter(this.$element);
      b = this.getPosition();
      d = a[0].offsetWidth;
      a = a[0].offsetHeight;
      switch(e) {
        case "bottom":
          f = {top:b.top + b.height, left:b.left + b.width / 2 - d / 2};
          break;
        case "top":
          f = {top:b.top - a, left:b.left + b.width / 2 - d / 2};
          break;
        case "left":
          f = {top:b.top + b.height / 2 - a / 2, left:b.left - d};
          break;
        case "right":
          f = {top:b.top + b.height / 2 - a / 2, left:b.left + b.width};
      }
      this.applyPlacement(f, e);
      this.$element.trigger("shown");
    }
  }, applyPlacement:function(a, b) {
    var d = this.tip(), c = d[0].offsetWidth, f = d[0].offsetHeight, g, h, k;
    d.offset(a).addClass(b).addClass("in");
    g = d[0].offsetWidth;
    h = d[0].offsetHeight;
    "top" == b && h != f && (a.top = a.top + f - h, k = !0);
    "bottom" == b || "top" == b ? (f = 0, 0 > a.left && (f = -2 * a.left, a.left = 0, d.offset(a), g = d[0].offsetWidth), this.replaceArrow(f - c + g, g, "left")) : this.replaceArrow(h - f, h, "top");
    k && d.offset(a);
  }, replaceArrow:function(a, b, c) {
    this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "");
  }, setContent:function() {
    var a = this.tip(), b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b);
    a.removeClass("fade in top bottom left right");
  }, hide:function() {
    function a() {
      var a = setTimeout(function() {
        b.off(c.support.transition.end).detach();
      }, 500);
      b.one(c.support.transition.end, function() {
        clearTimeout(a);
        b.detach();
      });
    }
    var b = this.tip(), d = c.Event("hide");
    this.$element.trigger(d);
    if (!d.isDefaultPrevented()) {
      return b.removeClass("in"), c.support.transition && this.$tip.hasClass("fade") ? a() : b.detach(), this.$element.trigger("hidden"), this;
    }
  }, fixTitle:function() {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
  }, hasContent:function() {
    return this.getTitle();
  }, getPosition:function() {
    var a = this.$element[0];
    return c.extend({}, "function" == typeof a.getBoundingClientRect ? a.getBoundingClientRect() : {width:a.offsetWidth, height:a.offsetHeight}, this.$element.offset());
  }, getTitle:function() {
    var a = this.$element, b = this.options;
    return a.attr("data-original-title") || ("function" == typeof b.title ? b.title.call(a[0]) : b.title);
  }, tip:function() {
    return this.$tip = this.$tip || c(this.options.template);
  }, arrow:function() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  }, validate:function() {
    this.$element[0].parentNode || (this.hide(), this.options = this.$element = null);
  }, enable:function() {
    this.enabled = !0;
  }, disable:function() {
    this.enabled = !1;
  }, toggleEnabled:function() {
    this.enabled = !this.enabled;
  }, toggle:function(a) {
    a = a ? c(a.currentTarget)[this.type](this._options).data(this.type) : this;
    a.tip().hasClass("in") ? a.hide() : a.show();
  }, destroy:function() {
    this.hide().$element.off("." + this.type).removeData(this.type);
  }};
  var l = c.fn.tooltip;
  c.fn.tooltip = function(a) {
    return this.each(function() {
      var b = c(this), d = b.data("tooltip"), e = "object" == typeof a && a;
      d || b.data("tooltip", d = new g(this, e));
      if ("string" == typeof a) {
        d[a]();
      }
    });
  };
  c.fn.tooltip.Constructor = g;
  c.fn.tooltip.defaults = {animation:!0, placement:"top", selector:!1, template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger:"hover focus", title:"", delay:0, html:!1, container:!1};
  c.fn.tooltip.noConflict = function() {
    c.fn.tooltip = l;
    return this;
  };
}(window.jQuery);
