function gp_init_inline_edit(c, f) {
  $gp.LoadStyle(CajonParallax.base + "/CajonParallax_edit.css");
  gp_editing.editor_tools();
  var e = gp_editing.get_edit_area(c);
  gp_editor = {edit_div:gp_editing.get_edit_area(c), save_path:gp_editing.get_path(c), destroy:function() {
  }, isDirty:!1, resetDirty:function() {
  }, ui:{}, options:{image_src:"", alt_text:"", scrolling:"", scroll_speed:"", halign:"", scaling:""}, checkDirty:function() {
    return gp_editor.isDirty;
  }, gp_saveData:function() {
    var a = gp_editor.edit_div.clone();
    a.find("img").removeAttr("style");
    a.find(".gpclear").remove();
    a = a.html();
    gp_editor.isDirty = !1;
    return "&gpcontent=" + encodeURIComponent(a);
  }, selectImage:function() {
    gp_editor.selectUsingFinder(gp_editor.setImage);
  }, setImage:function(a) {
    gp_editor.options.image_src = a;
    gp_editor.generateAltText(!1);
    gp_editor.updateEditor();
    gp_editor.updateElement();
    gp_editor.isDirty = !0;
  }, selectUsingFinder:function(a) {
    gp_editor.FinderSelect = function(b) {
      "" != b && ($.isFunction(a) ? a(b) : !1);
      setTimeout(function() {
        delete gp_editor.FinderSelect;
      }, 150);
      return !0;
    };
    var b = window.open(gpFinderUrl, "gpFinder", "menubar=no,width=960,height=540");
    window.focus && b.focus();
  }, getOptions:function() {
    var a = gp_editor.edit_div.find(".cajon-parallax-image"), b = a.attr("class").split(" "), c = "parallax", d = "cover";
    $.each(b, function(a, b) {
      -1 != b.indexOf("scroll-") && (c = b.trim().substr(7));
      -1 != b.indexOf("scaling-") && (d = b.trim().substr(8));
    });
    gp_editor.options = {image_src:a.find("img").attr("src") || "", alt_text:a.find("img").attr("alt") || "Parallax Image", halign:a.attr("data-halign") || "50", scroll_speed:a.attr("data-scroll-speed") || "50", scrolling:c, scaling:d};
  }, updateElement:function() {
    e.find(".cajon-parallax-image").css({"background-image":"url('" + gp_editor.options.image_src + "')", "background-position":gp_editor.options.halign + "% 50%"}).removeClass("scroll-parallax scroll-fixed scroll-static scaling-cover scaling-tile").addClass("scroll-" + gp_editor.options.scrolling).addClass("scaling-" + gp_editor.options.scaling).attr("data-scroll-speed", gp_editor.options.scroll_speed).attr("data-halign", gp_editor.options.halign).find("img").prop("src", gp_editor.options.image_src).attr("alt", 
    gp_editor.options.alt_text).one("load", function() {
      $(window).trigger("resize");
    });
  }, updateEditor:function() {
    var a = gp_editor.options.image_src;
    gp_editor.ui.img_preview_area.find("img").prop("src", a).attr("title", a.substring(a.lastIndexOf("/") + 1));
    gp_editor.ui.alt_text.val(gp_editor.options.alt_text);
    gp_editor.ui.scrolling.val(gp_editor.options.scrolling);
    gp_editor.ui.scroll_speed.val(gp_editor.options.scroll_speed);
    gp_editor.ui.scaling.val(gp_editor.options.scaling);
    gp_editor.ui.halign.val(gp_editor.options.halign);
  }, generateAltText:function(a) {
    if (a || !gp_editor.options.alt_text || "" == gp_editor.options.alt_text) {
      a = (a = gp_editor.options.image_src) && "" != a ? a.substring(a.lastIndexOf("/") + 1, a.lastIndexOf(".")).split("_").join(" ") : "Parallax Image", gp_editor.ui.alt_text.val(a), gp_editor.options.alt_text = a;
    }
  }};
  gp_editor.ui.option_area = $('<div id="ts_PI_options"/>').prependTo("#ckeditor_top");
  gp_editor.ui.img_preview_area = $('<div id="ts_PI_preview_area"><img src=""/></div>');
  gp_editor.ui.img_preview_area.on("click", gp_editor.selectImage).appendTo(gp_editor.ui.option_area);
  var b = $('<label class="ts_PI_editor_control" />');
  gp_editor.ui.select_image = $('<button><i class="fa fa-image"></i> Select Image</button>');
  gp_editor.ui.select_image.appendTo(b).on("click", gp_editor.selectImage);
  b.appendTo(gp_editor.ui.option_area);
  b = $('<label title="Alternative Text" class="ts_PI_editor_control" />');
  gp_editor.ui.alt_text = $('<input id="ts_PI_alt" placeholder="Alternative Text" type="text" />');
  gp_editor.ui.alt_text.appendTo(b).on("keyup change input", function() {
    gp_editor.options.alt_text = $(this).val();
    gp_editor.isDirty = !0;
    gp_editor.updateElement();
  });
  gp_editor.ui.gen_alt_button = $('<button id="ts_PI_generateAlt" title="Generate Alt Text from file name"><i class="fa fa-font"></i></button>');
  gp_editor.ui.gen_alt_button.appendTo(b).on("click", function() {
    gp_editor.generateAltText(!0);
    gp_editor.isDirty = !0;
    gp_editor.updateElement();
  });
  b.appendTo(gp_editor.ui.option_area);
  b = $('<div style="display:none" />');
  gp_editor.ui.scrolling = $('<input type="hidden">');
  gp_editor.ui.scrolling.appendTo(b).on("change", function() {
    gp_editor.options.scrolling = $(this).val();
    gp_editor.isDirty = !0;
    gp_editor.updateElement();
  });
  b.appendTo(gp_editor.ui.option_area);
  b = $('<label title="Scroll Speed" class="ts_PI_editor_control">');
  $('<span class="label-desc"><span style="float:left;">fixed</span><span style="float:right;">static</span><span>parallax</span></span>').appendTo(b);
  gp_editor.ui.scroll_speed = $('<input type="range" min="0" max="100" step="5"/>');
  gp_editor.ui.scroll_speed.appendTo(b).on("change input", function() {
    var a = $(this).val();
    $(this).closest("label").attr("title", "Scroll Speed (" + a + "%)");
    gp_editor.options.scroll_speed = a;
    switch(a) {
      case "0":
        gp_editor.ui.scrolling.val("fixed").trigger("change");
        break;
      case "100":
        gp_editor.ui.scrolling.val("static").trigger("change");
        break;
      default:
        gp_editor.ui.scrolling.val("parallax").trigger("change");
    }
    gp_editor.isDirty = !0;
    gp_editor.updateElement();
  });
  b.appendTo(gp_editor.ui.option_area);
  b = $('<label title="Scaling" class="ts_PI_editor_control" />');
  gp_editor.ui.scaling = $('<select><option value="cover">cover</option><option value="tile">tile (repeat)</option></select>');
  gp_editor.ui.scaling.appendTo(b).on("change", function() {
    gp_editor.options.scaling = $(this).val();
    gp_editor.isDirty = !0;
    gp_editor.updateElement();
  });
  b.appendTo(gp_editor.ui.option_area);
  b = $('<label title="Horizontal Alignment" class="ts_PI_editor_control" />');
  $('<span class="label-desc"><span style="float:left;">left&nbsp;&nbsp;&nbsp;</span> <span style="float:right;">right</span><span>center</span></span>').appendTo(b);
  gp_editor.ui.halign = $('<input type="range" min="0" max="100" step="5"/>');
  gp_editor.ui.halign.appendTo(b).on("change input", function() {
    var a = $(this).val();
    $(this).closest("label").attr("title", "Horizontal Alignment (" + a + "%)");
    gp_editor.options.halign = a;
    gp_editor.isDirty = !0;
    gp_editor.updateElement();
  });
  b.appendTo(gp_editor.ui.option_area);
  gp_editor.getOptions();
  gp_editor.updateEditor();
  loaded();
}
;