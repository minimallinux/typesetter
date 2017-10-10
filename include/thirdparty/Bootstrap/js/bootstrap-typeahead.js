!function(b) {
  var g = function(a, c) {
    this.$element = b(a);
    this.options = b.extend({}, b.fn.typeahead.defaults, c);
    this.matcher = this.options.matcher || this.matcher;
    this.sorter = this.options.sorter || this.sorter;
    this.highlighter = this.options.highlighter || this.highlighter;
    this.updater = this.options.updater || this.updater;
    this.source = this.options.source;
    this.$menu = b(this.options.menu);
    this.shown = !1;
    this.listen();
  };
  g.prototype = {constructor:g, select:function() {
    var a = this.$menu.find(".active").attr("data-value");
    this.$element.val(this.updater(a)).change();
    return this.hide();
  }, updater:function(a) {
    return a;
  }, show:function() {
    var a = b.extend({}, this.$element.position(), {height:this.$element[0].offsetHeight});
    this.$menu.insertAfter(this.$element).css({top:a.top + a.height, left:a.left}).show();
    this.shown = !0;
    return this;
  }, hide:function() {
    this.$menu.hide();
    this.shown = !1;
    return this;
  }, lookup:function(a) {
    this.query = this.$element.val();
    return !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (a = b.isFunction(this.source) ? this.source(this.query, b.proxy(this.process, this)) : this.source) ? this.process(a) : this;
  }, process:function(a) {
    var c = this;
    a = b.grep(a, function(a) {
      return c.matcher(a);
    });
    a = this.sorter(a);
    return a.length ? this.render(a.slice(0, this.options.items)).show() : this.shown ? this.hide() : this;
  }, matcher:function(a) {
    return ~a.toLowerCase().indexOf(this.query.toLowerCase());
  }, sorter:function(a) {
    for (var b = [], e = [], d = [], f;f = a.shift();) {
      f.toLowerCase().indexOf(this.query.toLowerCase()) ? ~f.indexOf(this.query) ? e.push(f) : d.push(f) : b.push(f);
    }
    return b.concat(e, d);
  }, highlighter:function(a) {
    var b = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    return a.replace(new RegExp("(" + b + ")", "ig"), function(a, b) {
      return "<strong>" + b + "</strong>";
    });
  }, render:function(a) {
    var c = this;
    a = b(a).map(function(a, d) {
      a = b(c.options.item).attr("data-value", d);
      a.find("a").html(c.highlighter(d));
      return a[0];
    });
    a.first().addClass("active");
    this.$menu.html(a);
    return this;
  }, next:function(a) {
    a = this.$menu.find(".active").removeClass("active").next();
    a.length || (a = b(this.$menu.find("li")[0]));
    a.addClass("active");
  }, prev:function(a) {
    a = this.$menu.find(".active").removeClass("active").prev();
    a.length || (a = this.$menu.find("li").last());
    a.addClass("active");
  }, listen:function() {
    this.$element.on("focus", b.proxy(this.focus, this)).on("blur", b.proxy(this.blur, this)).on("keypress", b.proxy(this.keypress, this)).on("keyup", b.proxy(this.keyup, this));
    if (this.eventSupported("keydown")) {
      this.$element.on("keydown", b.proxy(this.keydown, this));
    }
    this.$menu.on("click", b.proxy(this.click, this)).on("mouseenter", "li", b.proxy(this.mouseenter, this)).on("mouseleave", "li", b.proxy(this.mouseleave, this));
  }, eventSupported:function(a) {
    var b = a in this.$element;
    b || (this.$element.setAttribute(a, "return;"), b = "function" === typeof this.$element[a]);
    return b;
  }, move:function(a) {
    if (this.shown) {
      switch(a.keyCode) {
        case 9:
        ;
        case 13:
        ;
        case 27:
          a.preventDefault();
          break;
        case 38:
          a.preventDefault();
          this.prev();
          break;
        case 40:
          a.preventDefault(), this.next();
      }
      a.stopPropagation();
    }
  }, keydown:function(a) {
    this.suppressKeyPressRepeat = ~b.inArray(a.keyCode, [40, 38, 9, 13, 27]);
    this.move(a);
  }, keypress:function(a) {
    this.suppressKeyPressRepeat || this.move(a);
  }, keyup:function(a) {
    switch(a.keyCode) {
      case 40:
      ;
      case 38:
      ;
      case 16:
      ;
      case 17:
      ;
      case 18:
        break;
      case 9:
      ;
      case 13:
        if (!this.shown) {
          return;
        }
        this.select();
        break;
      case 27:
        if (!this.shown) {
          return;
        }
        this.hide();
        break;
      default:
        this.lookup();
    }
    a.stopPropagation();
    a.preventDefault();
  }, focus:function(a) {
    this.focused = !0;
  }, blur:function(a) {
    this.focused = !1;
    !this.mousedover && this.shown && this.hide();
  }, click:function(a) {
    a.stopPropagation();
    a.preventDefault();
    this.select();
    this.$element.focus();
  }, mouseenter:function(a) {
    this.mousedover = !0;
    this.$menu.find(".active").removeClass("active");
    b(a.currentTarget).addClass("active");
  }, mouseleave:function(a) {
    this.mousedover = !1;
    !this.focused && this.shown && this.hide();
  }};
  var h = b.fn.typeahead;
  b.fn.typeahead = function(a) {
    return this.each(function() {
      var c = b(this), e = c.data("typeahead"), d = "object" == typeof a && a;
      e || c.data("typeahead", e = new g(this, d));
      if ("string" == typeof a) {
        e[a]();
      }
    });
  };
  b.fn.typeahead.defaults = {source:[], items:8, menu:'<ul class="typeahead dropdown-menu"></ul>', item:'<li><a href="#"></a></li>', minLength:1};
  b.fn.typeahead.Constructor = g;
  b.fn.typeahead.noConflict = function() {
    b.fn.typeahead = h;
    return this;
  };
  b(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(a) {
    a = b(this);
    a.data("typeahead") || a.typeahead(a.data());
  });
}(window.jQuery);
