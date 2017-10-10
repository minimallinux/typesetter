gp_editor = {sortable_area_sel:".gp_gallery", img_name:"gallery", img_rel:"gallery_gallery", edit_links_target:!1, auto_start:!1, make_sortable:!0, edit_div:null, isDirty:!1, gallery_theme:[{label:"Default Theme", class_name:"gallery-theme-default"}, {label:"Masonry", class_name:"gallery-theme-tiles"}, {label:"Circle Grid", class_name:"gallery-theme-circle-grid"}, {label:"Circle List", class_name:"gallery-theme-circle-list"}], gallery_size:[{label:"X-Small", class_name:"gallery-size-xs"}, {label:"Small", 
class_name:"gallery-size-sm"}, {label:"Default Size", class_name:"gallery-size-md"}, {label:"Large", class_name:"gallery-size-lg"}, {label:"X-Large", class_name:"gallery-size-xl"}], gallery_color:[{label:"Default Color", class_name:"gallery-color-default"}, {label:"On Dark Backgrounds", class_name:"gallery-color-dark"}], updateCaption:function(g, e) {
}, removeImage:function(g) {
}, removedImage:function(g) {
}, addedImage:function(g) {
}, sortStop:function() {
}, editorLoaded:function() {
}, widthChanged:!1, heightChanged:!1, intervalSpeed:!1, checkDirty:function() {
  return !1;
}, getData:function(g, e) {
  var l = {images:[], captions:[], attributes:[]};
  g.find(gp_editor.sortable_area_sel).find("li > a").each(function() {
    l.images.push($(this).attr("href"));
  });
  g.find(gp_editor.edit_links_target).find(".caption").each(function() {
    l.captions.push($(this).html());
  });
  var r = $("#gp_gallery_options").find("input,select").serialize();
  l.attributes = {"class":"class" in e.attributes ? e.attributes["class"] : ""};
  var h = g.clone();
  h.find("li.holder").remove();
  h.find("ul").enableSelection().removeClass("ui-sortable").removeAttr("unselectable");
  h.find(".gp_nosave").remove();
  h = h.html();
  return $.param(l) + "&" + r + "&gpcontent=" + encodeURIComponent(h);
}};
function gp_init_inline_edit(g, e) {
  function l() {
    m.children().each(function() {
      r(this);
    });
    p.sortable({tolerance:"pointer", cursorAt:{left:25, top:25}, stop:function() {
      p.children().each(function() {
        m.append($(this).data("original"));
      });
      gp_editor.sortStop();
    }}).disableSelection();
  }
  function r(b) {
    var d = $(b), a = d.find("img").attr("src");
    if (a) {
      var c = a.substring(a.lastIndexOf("/") + 1);
      c = c.substr(0, c.lastIndexOf("."));
      var f = c.substring(0, c.lastIndexOf(".")).split("_").join(" ");
      a = $("<img>").attr({src:a, title:c, alt:f});
      a = $("<a>").append(a);
      b = $('<div class="expand_child"><span><a data-cmd="gp_gallery_caption" class="fa fa-pencil"></a><a data-cmd="gp_gallery_rm" class="fa fa-remove"></a></span></div>').data("original", b).append(a).appendTo(p);
      d.hasClass("gp_to_remove") && b.addClass("gp_to_remove");
    }
  }
  function h(b, d) {
    gp_editor.edit_div.find(".gp_to_remove").remove();
    p.find(".gp_to_remove").remove();
    b.attr({"data-cmd":gp_editor.img_name, "data-arg":gp_editor.img_rel, title:"", "class":gp_editor.img_rel});
    var a = b.find("img").attr("src") || "";
    a = a.substring(a.lastIndexOf("/") + 1);
    a = a.substr(0, a.lastIndexOf("."));
    a = a.substring(0, a.lastIndexOf(".")).split("_").join(" ");
    b.append('<span class="caption">' + a + "</span>");
    a = $("<li>").append(b);
    d ? d.replaceWith(a) : m.append(a);
    a.trigger("gp_gallery_add");
    gp_editor.addedImage(a);
    r(a);
  }
  function v(b) {
    b.attr("action");
    b.find(".file").auto_upload({start:function(b, a) {
      a.bar = $('<a data-cmd="gp_file_uploading">' + b + "</a>").appendTo("#gp_upload_queue");
      a.holder = $('<li class="holder" style="display:none"></li>').appendTo(m);
      return !0;
    }, progress:function(b, a, c) {
      b = Math.round(100 * b);
      b = Math.min(98, b - 1);
      c.bar.text(b + "% " + a);
    }, finish:function(b, a, c) {
      var f = c.bar;
      f.text("100% " + a);
      var q = $(b);
      b = q.find(".status").val();
      q = q.find(".message").val();
      "success" == b ? (f.addClass("success"), f.slideUp(1200), a = $("#gp_gallery_avail_imgs"), a = $(q).appendTo(a).find("a[name=gp_gallery_add],a[data-cmd=gp_gallery_add]"), h(a.clone(), c.holder)) : "notimage" == b ? f.addClass("success") : (f.addClass("failed"), f.text(a + ": " + q));
    }, error:function(b, a, c) {
      alert("error: " + c);
    }});
  }
  $gp.LoadStyle("/include/css/inline_image.css");
  "undefined" !== typeof gp_gallery_options && $.extend(gp_editor, gp_gallery_options);
  gp_editor.edit_links_target || (gp_editor.edit_links_target = gp_editor.sortable_area_sel + " > li");
  var m, p, n = !1, k = !1, t = gp_editing.get_path(g);
  gp_editor.edit_div = gp_editing.get_edit_area(g);
  if (0 != gp_editor.edit_div && 0 != t) {
    gp_editor.save_path = t;
    gp_editor.checkDirty = function() {
      var b = gp_editor.getData(gp_editor.edit_div, e);
      return u !== b || gp_editor.isDirty ? !0 : !1;
    };
    gp_editor.SaveData = function() {
      gp_editor.isDirty = !1;
      return gp_editor.getData(gp_editor.edit_div, e);
    };
    gp_editor.resetDirty = function() {
      u = gp_editor.getData(gp_editor.edit_div, e);
      gp_editor.isDirty = !1;
    };
    gp_editor.getSectionClasses = function() {
      var b = gp_editor.edit_div.attr("class").split(" ");
      $.each(b, function(b, a) {
        var c = a.trim();
        0 === c.indexOf("gallery-theme-") && $("select.SelectGalleryTheme").val(c);
        0 === c.indexOf("gallery-size-") && $("select.SelectGallerySize").val(c);
        0 === c.indexOf("gallery-color-") && $("select.SelectGalleryColor").val(c);
      });
    };
    gp_editor.setSectionClasses = function(b) {
      var d = $(b.target);
      b = d.find("option");
      b = $.map(b, function(a) {
        return a.value;
      }).join(" ");
      d = d.val();
      !1 in e && (e.attributes = {});
      var a = "class" in e.attributes ? e.attributes["class"] : "";
      a = $('<div class="">').addClass(a).removeClass(b).addClass(d).attr("class");
      var c = JSON.parse(gp_editor.edit_div.attr("data-gp-attrs"));
      c["class"] = a;
      gp_editor.edit_div.removeClass(b).addClass(d).attr("data-gp-attrs", JSON.stringify(c));
      e.attributes["class"] = a;
      gp_editor.isDirty = !0;
    };
    (function() {
      function b(a, b, c) {
        a.append('<a data-cmd="' + b + '" class="' + c + '"></a>');
      }
      function d(a) {
        a = $(a).closest(".expand_child").index();
        return gp_editor.edit_div.find(gp_editor.edit_links_target).eq(a);
      }
      m = gp_editor.edit_div.find(gp_editor.sortable_area_sel);
      if (0 == m.length) {
        console.log("sortable area not found", gp_editor.sortable_area_sel);
      } else {
        gp_editor.resetDirty();
        strip_from(t, "?");
        gp_editing.editor_tools();
        var a = "";
        "undefined" != typeof gallery_editing_options && (a += '<select class="ckeditor_control full_width SelectGalleryStyle SelectGalleryTheme">', $.each(gp_editor.gallery_theme, function(b, c) {
          var f = -1 !== c.class_name.indexOf("-theme-default") ? ' selected="selected"' : "";
          a += '<option value="' + c.class_name + '"' + f + ">" + c.label + "</option>";
        }), a += "</select>", a += '<select class="ckeditor_control full_width SelectGalleryStyle SelectGallerySize">', $.each(gp_editor.gallery_size, function(b, c) {
          var f = -1 !== c.class_name.indexOf("-size-md") ? ' selected="selected"' : "";
          a += '<option value="' + c.class_name + '"' + f + ">" + c.label + "</option>";
        }), a += "</select>", a += '<select class="ckeditor_control full_width SelectGalleryStyle SelectGalleryColor">', $.each(gp_editor.gallery_color, function(b, c) {
          var f = -1 !== c.class_name.indexOf("-color-default") ? ' selected="selected"' : "";
          a += '<option value="' + c.class_name + '"' + f + ">" + c.label + "</option>";
        }), a += "</select>");
        a += '<div id="gp_current_images"></div><a class="ckeditor_control full_width ShowImageSelect" data-cmd="ShowImageSelect"> ' + gplang.SelectImage + '</a><div id="gp_select_wrap"><div id="gp_image_area"></div><div id="gp_upload_queue"></div><div id="gp_folder_options"></div></div>';
        $("#ckeditor_top").html(a).find("select.SelectGalleryStyle").on("change", gp_editor.setSectionClasses);
        $("#ckeditor_wrap").addClass("multiple_images");
        p = $("#gp_current_images");
        l();
        LoadImages(!1, gp_editor);
        var c = $('<div id="gp_gallery_options">').appendTo("#ckeditor_area");
        gp_editor.getSectionClasses();
        if (gp_editor.heightChanged) {
          $('<div class="half_width">' + gplang.Height + ': <input class="ck_input" type="text" name="height" /></div>').appendTo(c).find("input").val(e.height).on("keyup paste change", gp_editor.heightChanged);
        }
        if (gp_editor.widthChanged) {
          $('<div class="half_width">' + gplang.Width + ': <input class="ck_input" type="text" name="width" /></div>').appendTo(c).find("input").val(e.width).on("keyup paste change", gp_editor.widthChanged);
        }
        gp_editor.auto_start && (gplang.Auto_Start = "Auto Start", $('<div class="half_width">' + gplang.Auto_Start + ': <input class="ck_input" type="checkbox" name="auto_start" value="true" /></div>').appendTo(c).find("input").prop("checked", e.auto_start));
        gp_editor.intervalSpeed && (gplang.Speed = "Speed", $('<div class="half_width">' + gplang.Speed + ': <input class="ck_input" type="text" name="interval_speed" /></div>').appendTo(c).find("input").val(e.interval_speed).on("keyup paste change input", gp_editor.intervalSpeed));
        n = $('<span class="gp_gallery_edit gp_floating_area"></span>').appendTo("body").hide();
        b(n, "gp_gallery_caption", "fa fa-pencil");
        b(n, "gp_gallery_rm", "fa fa-remove");
        $(document).delegate("#gp_current_images span", {"mousemove.gp_edit":function() {
          var a = $(this).offset();
          n.show().css({left:a.left, top:a.top});
          k = this;
        }, "mouseleave.gp_edit":function() {
          n.hide();
        }, "mousedown.gp_edit":function() {
          n.hide();
        }});
        $gp.links.gp_gallery_caption = function() {
          k = d(this);
          var a = $(k);
          a = a.find(".caption").html() || a.find("a:first").attr("title");
          a = '<div class="inline_box" id="gp_gallery_caption"><form><h3>' + gplang.cp + '</h3><textarea name="caption" cols="50" rows="3">' + $gp.htmlchars(a) + '</textarea><p><button class="gpsubmit" data-cmd="gp_gallery_update">' + gplang.up + '</button><button class="gpcancel" data-cmd="admin_box_close">' + gplang.ca + "</button></p></form></div>";
          $gp.AdminBoxC(a);
        };
        $gp.links.gp_gallery_rm = function() {
          k = d(this);
          gp_editor.removeImage(k);
          $(k).remove();
          gp_editor.removedImage(gp_editor.edit_div);
          $(this).closest(".expand_child").remove();
        };
        $gp.inputs.gp_gallery_update = function(a) {
          a.preventDefault();
          a = $(this.form).find("textarea").val();
          var b = $(k).find(".caption");
          b.html(a);
          a = b.html();
          $gp.CloseAdminBox();
          gp_editor.updateCaption(k, a);
        };
        $gp.links.ShowImageSelect = function() {
          $(this).toggleClass("gp_display");
          $("#gp_select_wrap").toggleClass("gp_display");
        };
      }
    })();
    var u = gp_editor.getData(gp_editor.edit_div, e);
    gp_editor.editorLoaded();
    $gp.links.gp_gallery_add = function(b) {
      b.preventDefault();
      b = $(this).stop(!0, !0);
      h(b.clone());
      b.parent().fadeTo(100, .2).fadeTo(2000, 1);
    };
    $gp.links.gp_gallery_add_all = function(b) {
      b.preventDefault();
      $("#gp_gallery_avail_imgs").find("a[name=gp_gallery_add],a[data-cmd=gp_gallery_add]").each(function(b, a) {
        h($(this).clone());
      });
    };
    $gp.response.gp_gallery_images = function(b) {
      v($("#gp_upload_form"));
    };
    $gp.links.gp_file_uploading = function() {
      var b = $(this), d = !1;
      b.hasClass("failed") ? d = !0 : b.hasClass("success") && (d = !0);
      d && b.slideUp(700);
    };
  }
}
;