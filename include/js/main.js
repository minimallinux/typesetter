var gplinks = {}, gpinputs = {}, gpresponse = {}, $gp = {inputs:{}, response:{}, error:"There was an error processing the last request. Please reload this page to continue.", jGoTo:function(a, b) {
  $gp.loading();
  a = $gp.jPrep(a);
  $.getJSON(a, function(c, a, g) {
    $gp.Response.call(b, c, a, g);
  });
}, cGoTo:function(a, b) {
  var c = $(a), d = a.search;
  (c = c.data("nonce")) && (d += "&verified=" + encodeURIComponent(c));
  $gp.Cookie("cookie_cmd", encodeURIComponent(d), 1);
  b ? $gp.Reload() : window.location = strip_from(strip_from(a.href, "#"), "?");
}, post:function(a, b) {
  $gp.loading();
  var c = $(a).closest("form"), d = c.serialize() + "&verified=" + encodeURIComponent(post_nonce);
  if ("INPUT" === a.nodeName || "BUTTON" === a.nodeName) {
    d += "&" + encodeURIComponent(a.name) + "=" + encodeURIComponent(a.value);
  }
  b && (d += "&" + b);
  $.post($gp.jPrep(c.attr("action")), d, function(c, d, b) {
    $gp.Response.call(a, c, d, b);
  }, "json");
  return !1;
}, post_link:function(a) {
  $gp.loading();
  var b = $(a);
  b = strip_to(a.search, "?") + "&gpreq=json&jsoncallback=?&verified=" + encodeURIComponent(b.data("nonce"));
  $.post(strip_from(a.href, "?"), b, function(c, d, b) {
    $gp.Response.call(a, c, d, b);
  }, "json");
}, postC:function(a, b, c, d, g) {
  c = c || $gp.Response;
  d = d || "json";
  "object" === typeof b && (b = $.param(b));
  b += "&verified=" + encodeURIComponent(post_nonce);
  "json" === d && (b += "&gpreq=json&jsoncallback=?");
  $.post(strip_from(a, "?"), b, function(a, d, b) {
    c.call(g, a, d, b);
  }, d);
}, cboxSettings:function(a) {
  a = a || {};
  "object" != typeof colorbox_lang && (colorbox_lang = {});
  return $.extend(colorbox_lang, {opacity:0.75, maxWidth:"90%", maxHeight:"90%"}, a);
}, Cookie:function(a, b, c) {
  var d = "";
  c && (d = new Date, d.setTime(d.getTime() + 864E5 * c), d = "; expires=" + d.toGMTString());
  document.cookie = a + "=" + b + d + "; path=/";
}, jPrep:function(a, b) {
  b = "undefined" === typeof b ? "gpreq=json&jsoncallback=?" : b;
  a = strip_from(a, "#");
  -1 === a.indexOf("?") ? a += "?" : a.indexOf("?") !== a.length - 1 && (a += "&");
  return a + b;
}, Response:function(a, b, c) {
  function d(c, a, d) {
    "window" == c && (c = window);
    c = $(c);
    if ("function" == typeof c[a]) {
      c[a](d);
    }
  }
  $(".messages").detach();
  try {
    "undefined" == typeof gp_editing && $gp.CloseAdminBox();
  } catch (e) {
  }
  try {
    $.fn.colorbox.close();
  } catch (e) {
  }
  var g = this;
  $.each(a, function(a, f) {
    if ("function" === typeof $gp.response[f.DO]) {
      $gp.response[f.DO].call(g, f, b, c);
    } else {
      if ("function" === typeof gpresponse[f.DO]) {
        console.log("gpresponse is deprecated as of 3.6"), gpresponse[f.DO].call(g, f, b, c);
      } else {
        switch(f.DO) {
          case "replace":
            d(f.SELECTOR, "replaceWith", f.CONTENT);
            break;
          case "inner":
            d(f.SELECTOR, "html", f.CONTENT);
            break;
          case "admin_box_data":
            $gp.AdminBoxC(f.CONTENT);
            break;
          case "messages":
            $(f.CONTENT).appendTo("body").show().css({top:0});
            break;
          case "reload":
            $gp.Reload();
            break;
          default:
            d(f.SELECTOR, f.DO, f.CONTENT);
        }
      }
    }
  });
  $gp.loaded();
}, loading:function() {
  var a = $("#loading1");
  0 == a.length && (a = $('<div id="loading1"><i class="fa fa-spinner fa-pulse fa-3x"></i></div>').appendTo("body"));
  a.css("zIndex", 99000).fadeIn();
}, loaded:function() {
  $("#loading1").clearQueue().fadeOut();
}, CopyVals:function(a, b) {
  var c = $(a).find("form").get(0);
  c && $(b).find("input").each(function(a, b) {
    c[b.name] && (c[b.name].value = b.value);
  });
}, Reload:function() {
  typeof req_type && "post" == req_type ? window.location.href = strip_from(window.location.href, "#") : window.location.reload(!0);
}, links:{gallery:function(a, b) {
  a.preventDefault();
  b = "" === b ? this : "a[rel=" + b + "],a." + b;
  $.colorbox.remove();
  $(b).colorbox($gp.cboxSettings({resize:!0, rel:b, title:function() {
    var c = $(this);
    return c.closest("li").find(".caption").data("originalContent") || c.closest("li").find(".caption").text() || c.attr("title") || "";
  }}));
  $(this).trigger("click.cbox");
}}};
$gp.Cookie("cookie_cmd", "", -1);
$(function() {
  function a(c) {
    return btoa(encodeURIComponent(c).replace(/%([0-9A-F]{2})/g, function(c, a) {
      return String.fromCharCode("0x" + a);
    }));
  }
  var b = $(document);
  $("body").addClass("STCLASS");
  b.ajaxError(function(c, b, g, e) {
    $gp.loaded();
    if ("abort" != b.statusText && "function" !== typeof g.error && "" != e) {
      c = {thrownError:e};
      for (var d = "name message fileName lineNumber columnNumber stack".split(" "), h = 0; h < d.length; h++) {
        e.hasOwnProperty(d[h]) && (c[d[h]] = e[d[h]]);
      }
      e.hasOwnProperty("lineNumber") && (e = e.lineNumber, d = b.responseText.split("\n"), c["Line-" + (e - 1)] = d[e - 2], c["Line-" + e] = d[e - 1], c["Line-" + (e + 1)] = d[e]);
      c.responseStatus = b.status;
      c.statusText = b.statusText;
      c.url = g.url;
      c.type = g.type;
      c.browser = navigator.userAgent;
      c.responseText = b.responseText;
      g.data && (c.ajaxdata = g.data.substr(0, 100));
      window.console && console.log && console.log(c);
      "undefined" !== typeof debugjs && "send" === debugjs && (g.data && (c.data = g.data), c.cmd = "javascript_error", $.ajax({type:"POST", url:"https://www.typesettercms.com/Resources", data:c, success:function() {
      }, error:function() {
      }}));
      "undefined" !== typeof $gp.AdminBoxC && "undefined" != typeof JSON ? (delete c.responseText, b = JSON.stringify(c), b = a(b), b = b.replace(/\=/g, ""), b = b.replace(/\+/g, "-").replace(/\//g, "_"), $gp.AdminBoxC('<div class="inline_box"><h3>Error</h3><p>' + $gp.error + '</p><a href="' + ("http://www.typesettercms.com/index.php/Debug?data=" + b) + '" target="_blank">More Info<?a></div>')) : alert($gp.error);
    }
  });
  b.on("click", "input,button", function(c) {
    var a = $(this);
    $(this.form).filter("[method=post]").filter(":not(:has(input[type=hidden][name=verified]))").append('<input type="hidden" name="verified" value="' + post_nonce + '" />');
    if (!a.hasClass("gpvalidate") || "function" != typeof this.form.checkValidity || this.form.checkValidity()) {
      if (a.hasClass("gpconfirm") && !confirm(this.title)) {
        c.preventDefault();
      } else {
        var b = a.data("cmd");
        b || (b = strip_from(a.attr("class"), " "));
        if ("function" === typeof $gp.inputs[b]) {
          return $gp.inputs[b].call(this, c);
        }
        if ("function" === typeof gpinputs[b]) {
          return console.log("gpinputs is deprecated as of 3.6"), gpinputs[b].call(this, c, c);
        }
        switch(b) {
          case "gppost":
          case "gpajax":
            return c.preventDefault(), $gp.post(this);
        }
        return !0;
      }
    }
  });
  b.delegate(".expand_child", {mouseenter:function() {
    var a = $(this).addClass("expand");
    a.hasClass("simple_top") && a.addClass("simple_top_hover");
  }, mouseleave:function() {
    $(this).removeClass("expand simple_top_hover");
  }});
  b.on("click", "a", function(a) {
    var b = $(this), c = b.data("cmd"), e = b.data("arg");
    c || (c = b.attr("name"), e = b.attr("rel"));
    if (b.hasClass("gpconfirm") && !confirm(this.title)) {
      a.preventDefault();
    } else {
      if ("function" === typeof $gp.links[c]) {
        return $gp.links[c].call(this, a, e);
      }
      if ("function" === typeof gplinks[c]) {
        return console.log("gplinks is deprecated as of 3.6"), gplinks[c].call(this, e, a);
      }
      switch(c) {
        case "toggle_show":
          $(e).toggle();
          break;
        case "inline_box":
          $gp.CopyVals(e, this);
          $(this).colorbox($gp.cboxSettings({inline:!0, href:e, open:!0}));
          break;
        case "postlink":
          $gp.post_link(this);
          break;
        case "gpajax":
          $gp.jGoTo(this.href, this);
          break;
        case "creq":
          $gp.cGoTo(this, !0);
          break;
        case "cnreq":
          $gp.cGoTo(this, !1);
          break;
        case "close_message":
          b.closest("div").slideUp();
          break;
        default:
          return !0;
      }
      a.preventDefault();
      return !1;
    }
  });
});
function strip_to(a, b) {
  if (!a) {
    return a;
  }
  var c = a.indexOf(b);
  return -1 < c ? a.substr(c + 1) : a;
}
function strip_from(a, b) {
  if (!a) {
    return a;
  }
  var c = a.indexOf(b);
  -1 < c && (a = a.substr(0, c));
  return a;
}
function jPrep(a, b) {
  return $gp.jPrep(a, b);
}
function ajaxResponse(a, b, c) {
  return $gp.Response(a, b, c);
}
function loading() {
  $gp.loading();
}
function loaded() {
  $gp.loaded();
}
;