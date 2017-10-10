!function(b) {
  var f = function(a, c) {
    this.options = c;
    this.$element = b(a).delegate('[data-dismiss="modal"]', "click.dismiss.modal", b.proxy(this.hide, this));
    this.options.remote && this.$element.find(".modal-body").load(this.options.remote);
  };
  f.prototype = {constructor:f, toggle:function() {
    return this[this.isShown ? "hide" : "show"]();
  }, show:function() {
    var a = this, c = b.Event("show");
    this.$element.trigger(c);
    this.isShown || c.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
      var c = b.support.transition && a.$element.hasClass("fade");
      a.$element.parent().length || a.$element.appendTo(document.body);
      a.$element.show();
      c && a.$element[0].offsetWidth;
      a.$element.addClass("in").attr("aria-hidden", !1);
      a.enforceFocus();
      c ? a.$element.one(b.support.transition.end, function() {
        a.$element.focus().trigger("shown");
      }) : a.$element.focus().trigger("shown");
    }));
  }, hide:function(a) {
    a && a.preventDefault();
    a = b.Event("hide");
    this.$element.trigger(a);
    this.isShown && !a.isDefaultPrevented() && (this.isShown = !1, this.escape(), b(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), b.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal());
  }, enforceFocus:function() {
    var a = this;
    b(document).on("focusin.modal", function(b) {
      a.$element[0] === b.target || a.$element.has(b.target).length || a.$element.focus();
    });
  }, escape:function() {
    var a = this;
    if (this.isShown && this.options.keyboard) {
      this.$element.on("keyup.dismiss.modal", function(b) {
        27 == b.which && a.hide();
      });
    } else {
      this.isShown || this.$element.off("keyup.dismiss.modal");
    }
  }, hideWithTransition:function() {
    var a = this, c = setTimeout(function() {
      a.$element.off(b.support.transition.end);
      a.hideModal();
    }, 500);
    this.$element.one(b.support.transition.end, function() {
      clearTimeout(c);
      a.hideModal();
    });
  }, hideModal:function() {
    var a = this;
    this.$element.hide();
    this.backdrop(function() {
      a.removeBackdrop();
      a.$element.trigger("hidden");
    });
  }, removeBackdrop:function() {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  }, backdrop:function(a) {
    var c = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var d = b.support.transition && c;
      this.$backdrop = b('<div class="modal-backdrop ' + c + '" />').appendTo(document.body);
      this.$backdrop.click("static" == this.options.backdrop ? b.proxy(this.$element[0].focus, this.$element[0]) : b.proxy(this.hide, this));
      d && this.$backdrop[0].offsetWidth;
      this.$backdrop.addClass("in");
      a && (d ? this.$backdrop.one(b.support.transition.end, a) : a());
    } else {
      !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), b.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(b.support.transition.end, a) : a()) : a && a();
    }
  }};
  var g = b.fn.modal;
  b.fn.modal = function(a) {
    return this.each(function() {
      var c = b(this), d = c.data("modal"), e = b.extend({}, b.fn.modal.defaults, c.data(), "object" == typeof a && a);
      d || c.data("modal", d = new f(this, e));
      if ("string" == typeof a) {
        d[a]();
      } else {
        e.show && d.show();
      }
    });
  };
  b.fn.modal.defaults = {backdrop:!0, keyboard:!0, show:!0};
  b.fn.modal.Constructor = f;
  b.fn.modal.noConflict = function() {
    b.fn.modal = g;
    return this;
  };
  b(document).on("click.modal.data-api", '[data-toggle="modal"]', function(a) {
    var c = b(this), d = c.attr("href"), e = b(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), d = e.data("modal") ? "toggle" : b.extend({remote:!/#/.test(d) && d}, e.data(), c.data());
    a.preventDefault();
    e.modal(d).one("hide", function() {
      c.focus();
    });
  });
}(window.jQuery);
