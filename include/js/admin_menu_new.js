$(function() {
  function m(a) {
    a = a.find("a.gp_label");
    return 0 == a.length ? "" : a.data("arg");
  }
  function h(a) {
    $("#admin_menu .current").removeClass("current");
    if (a.length) {
      a.addClass("current");
      r(a);
      var b = f.height(), c = g.height();
      c < b && g.css("min-height", b);
      if (a = a.position()) {
        var d = 0;
        0 < a.top && (d = Math.round(a.top / c * 100));
        b = a.top - d / 120 * b;
        b = Math.max(0, b);
        f.stop().animate({top:b});
      }
    } else {
      f.hide();
    }
  }
  function r(a) {
    var b = t, c = jQuery.extend({}, a.find(".gp_label").data("json")), d = 1 < a.length, e = a.closest("li");
    d ? (c.key = a.find(".gp_label").map(function() {
      return $(this).data("arg");
    }).toArray().join(","), c.files = a.length) : a.find(".external").length ? b = u : a.find(".extra").length && (b = v);
    c = $.extend({}, {title:"", layout_color:"", layout_label:"", types:"", size:"", mtime:"", opts:""}, c);
    var q;
    $.each("title key url layout_label types size mtime opts files".split(" "), function() {
      q = new RegExp("(%5B" + this + "%5D|\\[" + this + "\\])", "gi");
      b = b.replace(q, c[this]);
    });
    f.show().html(b).find(".layout_icon").css({background:c.layout_color});
    a = [];
    d ? (a.push(".not_multiple"), f.find(".only_multiple").show()) : a.push(".only_multiple");
    e.hasClass("private-list") ? a.push(".vis_public") : e.hasClass("private-inherited") ? (a.push(".vis_private"), a.push(".vis_public")) : a.push(".vis_private");
    c.special && a.push(".not_special");
    c.has_layout ? a.push(".no_layout") : a.push(".has_layout");
    c.level >= max_level_index && a.push(".insert_child");
    f.find(a.join(",")).hide();
  }
  function n() {
    var a = $("#admin_menu"), b = {path:gpBLink + "/Admin/Menu", expires:100};
    if (0 < a.length) {
      var c = w("gp_menu_hide") || "";
      c = decodeURIComponent(c);
      var d = $("#gp_curr_menu").val();
      c = c.replace(new RegExp("#" + d + "=\\[[^#=\\]\\[]*\\]", ""), "");
      var e = "#" + $("#gp_curr_menu").val() + "=[";
      a.find(".hidechildren > div > .gp_label").each(function(a, b) {
        e += $(b).data("arg") + ",";
      });
      e += "]";
      $.cookie("gp_menu_hide", c + e, b);
    }
    $.cookie("gp_menu_prefs", $("#gp_menu_select_form").serialize(), b);
  }
  function w(a) {
    a += "=";
    for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
      for (var d = b[c]; " " == d.charAt(0);) {
        d = d.substring(1, d.length);
      }
      if (0 == d.indexOf(a)) {
        return d.substring(a.length, d.length);
      }
    }
    return !1;
  }
  var g = $("#admin_menu"), f = $("#admin_menu_tools"), k = !1, p = !1, l = !1, t = $("#menu_info").html(), u = $("#menu_info_extern").html(), v = $("#menu_info_extra").html();
  g.nestedSortable({disableNesting:"no-nest", forcePlaceholderSize:!0, handle:"a.sort", items:"li", opacity:.8, placeholder:"placeholder", tabSize:25, toleranceElement:"> div", listType:"ul", delay:2, stop:function(a, b) {
    var c = b.item, d = c.parent().siblings("div"), e = c.children("div");
    c = {cmd:"drag", drag_key:m(e), parent:m(d), prev:m(c.prev().children("div")), hidden:c.closest("#menu_available_list").length};
    0 < d.length && d.parent(":not(.haschildren)").addClass("haschildren");
    0 < l.length && 0 == l.find("li").length && l.removeClass("haschildren");
    h(e);
    $gp.loading();
    c = jQuery.param(c, !0);
    $gp.postC(window.location.href, c);
  }, start:function(a, b) {
    l = b.item.parent().siblings("div").parent();
  }}).disableSelection();
  gpresponse.gp_menu_prep = function() {
    var a = $(".current:first");
    k = a.attr("id");
    p = $("#admin_menu .gp_label").index(a.find(".gp_label"));
  };
  gpresponse.gp_menu_refresh = function(a) {
    var b;
    g.nestedSortable("refresh");
    k && (b = $("#" + k));
    k && b.length || (0 < p && (b = $("#admin_menu .gp_label").eq(p).parent()), b && b.length || (b = $(".gp_label:first").parent()));
    h(b);
  };
  $gp.links.menu_info = function(a) {
    a.preventDefault();
    var b = $(this), c = b.parent();
    if (a.ctrlKey) {
      c.toggleClass("current"), c = $(".current");
    } else {
      if (a.shiftKey) {
        $("#admin_menu .current").removeClass("current");
        a = $("#admin_menu .gp_label");
        b = a.index(this);
        var d = 0, e = $(".last_clicked");
        e.length && (d = a.index(e));
        var f = Math.min(b, d), g = Math.max(b, d);
        a.each(function(a) {
          a >= f && a <= g && $(this).parent().addClass("current");
        });
        c = $("#admin_menu .current");
      } else {
        $(".last_clicked").removeClass("last_clicked"), b.addClass("last_clicked");
      }
    }
    window.setTimeout(function() {
      h(c);
    }, 100);
  };
  $gp.links.expand_img = function(a) {
    $gp.links.menu_info.call(this, a);
    $li = $(this).closest("li");
    $li.hasClass("haschildren") && ($li.toggleClass("hidechildren"), n());
  };
  $("#gp_menu_select").change(function() {
    n();
    var a = window.location.href;
    a.indexOf("?") ? window.location = strip_from(a, "?") : $gp.Reload();
  });
  (function() {
    var a = $("#admin_menu").find("div:first");
    h(a);
    n();
  })();
});
