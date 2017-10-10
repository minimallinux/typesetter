!function(b) {
  var l = function(a, e) {
    this.$element = b(a);
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = e;
    "hover" == this.options.pause && this.$element.on("mouseenter", b.proxy(this.pause, this)).on("mouseleave", b.proxy(this.cycle, this));
  };
  l.prototype = {cycle:function(a) {
    a || (this.paused = !1);
    this.interval && clearInterval(this.interval);
    this.options.interval && !this.paused && (this.interval = setInterval(b.proxy(this.next, this), this.options.interval));
    return this;
  }, getActiveIndex:function() {
    this.$active = this.$element.find(".item.active");
    this.$items = this.$active.parent().children();
    return this.$items.index(this.$active);
  }, to:function(a) {
    var e = this.getActiveIndex(), d = this;
    if (!(a > this.$items.length - 1 || 0 > a)) {
      return this.sliding ? this.$element.one("slid", function() {
        d.to(a);
      }) : e == a ? this.pause().cycle() : this.slide(a > e ? "next" : "prev", b(this.$items[a]));
    }
  }, pause:function(a) {
    a || (this.paused = !0);
    this.$element.find(".next, .prev").length && b.support.transition.end && (this.$element.trigger(b.support.transition.end), this.cycle(!0));
    clearInterval(this.interval);
    this.interval = null;
    return this;
  }, next:function() {
    if (!this.sliding) {
      return this.slide("next");
    }
  }, prev:function() {
    if (!this.sliding) {
      return this.slide("prev");
    }
  }, slide:function(a, e) {
    var d = this.$element.find(".item.active"), c = e || d[a](), f = this.interval, h = "next" == a ? "left" : "right", g = "next" == a ? "first" : "last", k = this;
    this.sliding = !0;
    f && this.pause();
    c = c.length ? c : this.$element.find(".item")[g]();
    g = b.Event("slide", {relatedTarget:c[0], direction:h});
    if (!c.hasClass("active")) {
      this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
        var a = b(k.$indicators.children()[k.getActiveIndex()]);
        a && a.addClass("active");
      }));
      if (b.support.transition && this.$element.hasClass("slide")) {
        this.$element.trigger(g);
        if (g.isDefaultPrevented()) {
          return;
        }
        c.addClass(a);
        c[0].offsetWidth;
        d.addClass(h);
        c.addClass(h);
        this.$element.one(b.support.transition.end, function() {
          c.removeClass([a, h].join(" ")).addClass("active");
          d.removeClass(["active", h].join(" "));
          k.sliding = !1;
          setTimeout(function() {
            k.$element.trigger("slid");
          }, 0);
        });
      } else {
        this.$element.trigger(g);
        if (g.isDefaultPrevented()) {
          return;
        }
        d.removeClass("active");
        c.addClass("active");
        this.sliding = !1;
        this.$element.trigger("slid");
      }
      f && this.cycle();
      return this;
    }
  }};
  var m = b.fn.carousel;
  b.fn.carousel = function(a) {
    return this.each(function() {
      var e = b(this), d = e.data("carousel"), c = b.extend({}, b.fn.carousel.defaults, "object" == typeof a && a), f = "string" == typeof a ? a : c.slide;
      d || e.data("carousel", d = new l(this, c));
      if ("number" == typeof a) {
        d.to(a);
      } else {
        if (f) {
          d[f]();
        } else {
          c.interval && d.pause().cycle();
        }
      }
    });
  };
  b.fn.carousel.defaults = {interval:5E3, pause:"hover"};
  b.fn.carousel.Constructor = l;
  b.fn.carousel.noConflict = function() {
    b.fn.carousel = m;
    return this;
  };
  b(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(a) {
    var e = b(this), d, c = b(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
    d = b.extend({}, c.data(), e.data());
    var f;
    c.carousel(d);
    (f = e.attr("data-slide-to")) && c.data("carousel").pause().to(f).cycle();
    a.preventDefault();
  });
}(window.jQuery);
