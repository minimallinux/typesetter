$(function() {
  $("a.ExtraEditLink").detach();
  $(".editable_area").removeClass("editable_area");
  (function() {
    $("html").addClass("edit_layout");
    if ("undefined" != typeof gpLayouts) {
      var d = $('<div class="draggable_droparea" id="theme_content_drop"></div>').appendTo("#gp_admin_html"), e = $(".gp_inner_links");
      $(".gp_output_area").each(function(a) {
        var b = $(this);
        a = e.eq(a);
        if (0 < a.length) {
          $('<div class="draggable_element" style="position:absolute;min-height:20px;min-width:20px;"></div>').appendTo(d).append(a).append('<div class="decrease_z_index" title="move behind"><i class="fa fa-minus-square"></i></div>').on("gp_position", function() {
            var a = $gp.Coords(b);
            a.h = Math.max(20, a.h);
            $(this).css({top:a.top, left:a.left, width:a.w, height:a.h});
          }).on("hover", function() {
            $(this).css("z-index", "+=500");
          }, function() {
            $(this).css("z-index", "-=500");
          }).find(".decrease_z_index").on("click", function() {
            $(this).closest(".draggable_element").trigger("mouseleave").css("z-index", "-=1");
          });
        }
      });
      var a = $("#theme_content_drop .draggable_element");
      a.trigger("gp_position");
      window.setInterval(function() {
        a.trigger("gp_position");
      }, 2000);
      $gp.$win.resize(function() {
        a.trigger("gp_position");
      });
    }
  })();
  window.self !== window.top && $("a").each(function() {
    0 < this.href.indexOf("Admin_Theme_Content") || (this.target = "_parent");
  });
  $gp.links.layout_id = function(d, e) {
    function a() {
      b.hide();
      $("body").off(".layout_id");
    }
    d.preventDefault();
    var f = $(this).offset();
    $("#current_color").css("background-color", e);
    var b = $("#layout_ident").show().css({left:f.left + 20, top:f.top}).appendTo("#gp_admin_html"), c = b.find("form").get(0);
    c && $(this).find("input").each(function(a, b) {
      c[b.name] && (c[b.name].value = b.value);
    });
    b.find("a.color").off("click").on("click", function() {
      var a = $(this).data("arg");
      $("#current_color").css("background-color", a);
      c.color.value = a;
    });
    b.find("input.close_color_dialog").off("click").on("click", function() {
      a();
    });
    $("body").on("click.layout_id", function(b) {
      $(b.target).closest("#layout_ident").length || a();
    }).on("keydown.layout_id", function(b) {
      27 === b.keyCode && (b.preventDefault(), a());
    });
  };
  $(".theme_select select").change(function() {
    "" != this.value && (window.location = "layout" == this.name ? this.form.action + "/" + this.value : this.form.action + "?cmd=preview&theme=" + this.value);
  });
  $gp.iframeloaded = function() {
    $gp.loaded();
  };
});
