(function(d, r) {
  function x(a, b, f, c, h) {
    var g = !1;
    a.contents().detach().each(function() {
      var e = d(this);
      if ("undefined" == typeof this) {
        return !0;
      }
      if (e.is("script, .dotdotdot-keep")) {
        a.append(e);
      } else {
        if (g) {
          return !0;
        }
        a.append(e);
        if (h && !e.is(c.after) && !e.find(c.after).length) {
          a[a.is("a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style") ? "after" : "append"](h);
        }
        n(f, c) && (g = 3 == this.nodeType ? t(e, b, f, c, h) : x(e, b, f, c, h));
        g || h && h.detach();
      }
    });
    b.addClass("is-truncated");
    return g;
  }
  function t(a, b, f, c, h) {
    var g = a[0];
    if (!g) {
      return !1;
    }
    var e = A(g), l = -1 !== e.indexOf(" ") ? " " : "\u3000";
    l = "letter" == c.wrap ? "" : l;
    var k = e.split(l), q = -1, w = -1, u = 0, m = k.length - 1;
    c.fallbackToLetter && 0 === u && 0 === m && (l = "", k = e.split(l), m = k.length - 1);
    if (c.maxLength) {
      e = z(e.trim().substr(0, c.maxLength), c), p(g, e);
    } else {
      for (; u <= m && (0 !== u || 0 !== m);) {
        e = Math.floor((u + m) / 2);
        if (e == w) {
          break;
        }
        w = e;
        p(g, k.slice(0, w + 1).join(l) + c.ellipsis);
        f.children().each(function() {
          d(this).toggle().toggle();
        });
        n(f, c) ? (m = w, c.fallbackToLetter && 0 === u && 0 === m && (l = "", k = k[0].split(l), w = q = -1, u = 0, m = k.length - 1)) : u = q = w;
      }
      -1 == q || 1 === k.length && 0 === k[0].length ? (f = a.parent(), a.detach(), a = h && h.closest(f).length ? h.length : 0, f.contents().length > a ? g = y(f.contents().eq(-1 - a), b) : (g = y(f, b, !0), a || f.detach()), g && (e = z(A(g), c), p(g, e), a && h && (b = h.parent(), d(g).parent().append(h), d.trim(b.html()) || b.remove()))) : (e = z(k.slice(0, q + 1).join(l), c), p(g, e));
    }
    return !0;
  }
  function n(a, b) {
    return a.innerHeight() > b.maxHeight || b.maxLength && a.text().trim().length > b.maxLength;
  }
  function z(a, b) {
    for (; -1 < d.inArray(a.slice(-1), b.lastCharacter.remove);) {
      a = a.slice(0, -1);
    }
    0 > d.inArray(a.slice(-1), b.lastCharacter.noEllipsis) && (a += b.ellipsis);
    return a;
  }
  function B(a) {
    return {width:a.innerWidth(), height:a.innerHeight()};
  }
  function p(a, b) {
    a.innerText ? a.innerText = b : a.nodeValue ? a.nodeValue = b : a.textContent && (a.textContent = b);
  }
  function A(a) {
    return a.innerText ? a.innerText : a.nodeValue ? a.nodeValue : a.textContent ? a.textContent : "";
  }
  function C(a) {
    do {
      a = a.previousSibling;
    } while (a && 1 !== a.nodeType && 3 !== a.nodeType);
    return a;
  }
  function y(a, b, f) {
    var c = a && a[0];
    if (c) {
      if (!f) {
        if (3 === c.nodeType) {
          return c;
        }
        if (d.trim(a.text())) {
          return y(a.contents().last(), b);
        }
      }
      for (f = C(c); !f;) {
        a = a.parent();
        if (a.is(b) || !a.length) {
          return !1;
        }
        f = C(a[0]);
      }
      if (f) {
        return y(d(f), b);
      }
    }
    return !1;
  }
  function D(a, b) {
    return a ? "string" === typeof a ? (a = d(a, b), a.length ? a : !1) : a.jquery ? a : !1 : !1;
  }
  if (!d.fn.dotdotdot) {
    d.fn.dotdotdot = function(a) {
      if (0 === this.length) {
        return d.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), this;
      }
      if (1 < this.length) {
        return this.each(function() {
          d(this).dotdotdot(a);
        });
      }
      var b = this, f = b.contents();
      b.data("dotdotdot") && b.trigger("destroy.dot");
      b.data("dotdotdot-style", b.attr("style") || "");
      b.css("word-wrap", "break-word");
      "nowrap" === b.css("white-space") && b.css("white-space", "normal");
      b.bind_events = function() {
        b.bind("update.dot", function(a, e) {
          b.removeClass("is-truncated");
          a.preventDefault();
          a.stopPropagation();
          switch(typeof c.height) {
            case "number":
              c.maxHeight = c.height;
              break;
            case "function":
              c.maxHeight = c.height.call(b[0]);
              break;
            default:
              for (var k = c, g = b.innerHeight(), m = ["paddingTop", "paddingBottom"], q = 0, p = m.length; q < p; q++) {
                var v = parseInt(b.css(m[q]), 10);
                isNaN(v) && (v = 0);
                g -= v;
              }
              k.maxHeight = g;
          }
          c.maxHeight += c.tolerance;
          if ("undefined" != typeof e) {
            if ("string" == typeof e || "nodeType" in e && 1 === e.nodeType) {
              e = d("<div />").append(e).contents();
            }
            e instanceof d && (f = e);
          }
          l = b.wrapInner('<div class="dotdotdot" />').children();
          l.contents().detach().end().append(f.clone(!0)).find("br").replaceWith("  <br />  ").end().css({"max-height":"none", height:"auto", width:"auto", border:"none", padding:0, margin:0});
          k = m = !1;
          h.afterElement && (m = h.afterElement.clone(!0), m.show(), h.afterElement.detach());
          if (n(l, c)) {
            if ("children" == c.wrap) {
              k = l;
              g = c;
              q = k.children();
              p = !1;
              k.empty();
              v = 0;
              for (var t = q.length; v < t; v++) {
                var r = q.eq(v);
                k.append(r);
                m && k.append(m);
                if (n(k, g)) {
                  r.remove();
                  p = !0;
                  break;
                } else {
                  m && m.detach();
                }
              }
              k = p;
            } else {
              k = x(l, b, l, c, m);
            }
          }
          l.replaceWith(l.contents());
          l = null;
          d.isFunction(c.callback) && c.callback.call(b[0], k, f);
          return h.isTruncated = k;
        }).bind("isTruncated.dot", function(a, c) {
          a.preventDefault();
          a.stopPropagation();
          "function" == typeof c && c.call(b[0], h.isTruncated);
          return h.isTruncated;
        }).bind("originalContent.dot", function(a, c) {
          a.preventDefault();
          a.stopPropagation();
          "function" == typeof c && c.call(b[0], f);
          return f;
        }).bind("destroy.dot", function(a) {
          a.preventDefault();
          a.stopPropagation();
          b.unwatch().unbind_events().contents().detach().end().append(f).attr("style", b.data("dotdotdot-style") || "").removeClass("is-truncated").data("dotdotdot", !1);
        });
        return b;
      };
      b.unbind_events = function() {
        b.unbind(".dot");
        return b;
      };
      b.watch = function() {
        b.unwatch();
        if ("window" == c.watch) {
          var a = d(window), f = a.width(), l = a.height();
          a.bind("resize.dot" + h.dotId, function() {
            f == a.width() && l == a.height() && c.windowResizeFix || (f = a.width(), l = a.height(), e && clearInterval(e), e = setTimeout(function() {
              b.trigger("update.dot");
            }, 100));
          });
        } else {
          g = B(b), e = setInterval(function() {
            if (b.is(":visible")) {
              var a = B(b);
              if (g.width != a.width || g.height != a.height) {
                b.trigger("update.dot"), g = a;
              }
            }
          }, 500);
        }
        return b;
      };
      b.unwatch = function() {
        d(window).unbind("resize.dot" + h.dotId);
        e && clearInterval(e);
        return b;
      };
      var c = d.extend(!0, {}, d.fn.dotdotdot.defaults, a), h = {}, g = {}, e = null, l = null;
      c.lastCharacter.remove instanceof Array || (c.lastCharacter.remove = d.fn.dotdotdot.defaultArrays.lastCharacter.remove);
      c.lastCharacter.noEllipsis instanceof Array || (c.lastCharacter.noEllipsis = d.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis);
      h.afterElement = D(c.after, b);
      h.isTruncated = !1;
      h.dotId = E++;
      b.data("dotdotdot", !0).bind_events().trigger("update.dot");
      c.watch && b.watch();
      return b;
    };
    d.fn.dotdotdot.defaults = {ellipsis:"\u2026 ", wrap:"word", fallbackToLetter:!0, lastCharacter:{}, tolerance:0, callback:null, after:null, height:null, watch:!1, windowResizeFix:!0, maxLength:null};
    d.fn.dotdotdot.defaultArrays = {lastCharacter:{remove:" \u3000,;.!?".split(""), noEllipsis:[]}};
    d.fn.dotdotdot.debug = function(a) {
    };
    var E = 1, F = d.fn.html;
    d.fn.html = function(a) {
      return a != r && !d.isFunction(a) && this.data("dotdotdot") ? this.trigger("update", [a]) : F.apply(this, arguments);
    };
    var G = d.fn.text;
    d.fn.text = function(a) {
      return a != r && !d.isFunction(a) && this.data("dotdotdot") ? (a = d("<div />").text(a).html(), this.trigger("update", [a])) : G.apply(this, arguments);
    };
  }
})(jQuery);
jQuery(document).ready(function(d) {
  d(".dot-ellipsis").each(function() {
    var r = d(this).hasClass("dot-resize-update"), x = d(this).hasClass("dot-timer-update"), t = 0, n = d(this).attr("class").split(/\s+/);
    d.each(n, function(d, n) {
      var p = n.match(/^dot-height-(\d+)$/);
      null !== p && (t = Number(p[1]));
    });
    n = {};
    x && (n.watch = !0);
    r && (n.watch = "window");
    0 < t && (n.height = t);
    d(this).dotdotdot(n);
  });
});
jQuery(window).on("load", function() {
  jQuery(".dot-ellipsis.dot-load-update").trigger("update.dot");
});
