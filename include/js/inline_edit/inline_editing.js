(function() {
  gp_editing = {is_extra_mode:!1, is_dirty:!1, get_path:function(a) {
    var b = $("a#ExtraEditLink" + a);
    return 0 == b.length ? (console.log("get_path() link not found", a, b.length), !1) : b.attr("href");
  }, get_edit_area:function(a) {
    var b = $("#ExtraEditArea" + a);
    if (0 == b.length) {
      return console.log("no content found for get_edit_area()", a), !1;
    }
    $("#edit_area_overlay_top").hide();
    a = b.find(".twysiwygr:first");
    a.length && (b = a);
    b.addClass("gp_editing gp_edit_current");
    return b;
  }, close_editor:function(a) {
    a.preventDefault();
    $gp.Reload();
  }, SaveChanges:function(a) {
    if (gp_editor) {
      if (gp_editing.IsDirty()) {
        var b = $("#ckeditor_wrap");
        if (!b.hasClass("ck_saving")) {
          b.addClass("ck_saving");
          var c = $gp.CurrentDiv(), d = strip_from(gp_editor.save_path, "#"), e = "", f = gp_editing.GetSaveData();
          0 < d.indexOf("?") && (e = strip_to(d, "?") + "&", d = strip_from(d, "?"));
          e += "cmd=save_inline&section=" + c.data("gp-section") + "&req_time=" + req_time + "&";
          e = e + f + ("&verified=" + encodeURIComponent(post_nonce));
          e += "&gpreq=json&jsoncallback=?";
          gp_editing.SamePath(d) && (e += "&gpreq_toolbar=1");
          $gp.response.ck_saved = function() {
            gp_editing.DraftStatus(c, 1);
            gp_editing.PublishButton(c);
            gp_editor && (gp_editing.GetSaveData() == f && (gp_editor.resetDirty(), gp_editing.is_dirty = !1, gp_editing.DisplayDirty()), "function" == typeof a && a.call());
          };
          $.ajax({type:"POST", url:d, data:e, success:$gp.Response, dataType:"json", complete:function(a, c) {
            b.removeClass("ck_saving");
          }});
        }
      } else {
        "function" == typeof a && a.call();
      }
    }
  }, GetSaveData:function() {
    return "function" == typeof gp_editor.SaveData ? gp_editor.SaveData() : gp_editor.gp_saveData();
  }, PublishButton:function(a) {
    $(".ck_publish").hide();
    a && void 0 != a.data("draft") && (1 == a.data("draft") && $(".ck_publish").show(), $gp.IndicateDraft());
  }, DraftStatus:function(a, b) {
    a && void 0 != a.data("draft") && (a.data("draft", b).attr("data-draft", b), $gp.IndicateDraft());
  }, SamePath:function(a) {
    return $("<a>").attr("href", a).get(0).pathname.replace(/^\/index.php/, "") == window.location.pathname.replace(/^\/index.php/, "") ? !0 : !1;
  }, editor_tools:function() {
    var a = $("#ck_area_wrap");
    a.length || (a = '<div id="ckeditor_wrap" class="nodisplay"><a id="cktoggle" data-cmd="ToggleEditor"><i class="fa fa-angle-double-left"></i><i class="fa fa-angle-double-right"></i></a><div id="ckeditor_tabs"></div><div id="ck_area_wrap"></div><div id="ckeditor_save">' + ('<a data-cmd="ck_save" class="ckeditor_control ck_save">' + gplang.Save + "</a>"), a += '<span class="ck_saved">' + gplang.Saved + "</span>", a += '<a data-cmd="Publish" class="ckeditor_control ck_publish">' + gplang.Publish + 
    "</>", a += '<span class="ck_saving">' + gplang.Saving + "</span>", a += '<a data-cmd="ck_close" class="ckeditor_control">' + gplang.Close + "</a>", a += "</div></div>", $("#gp_admin_html").append(a), $(document).trigger("editor_area:loaded"), a = $("#ck_area_wrap"));
    a.html('<div id="ckeditor_area"><div class="toolbar"></div><div class="tools"><div id="ckeditor_top"></div><div id="ckeditor_controls"></div><div id="ckeditor_bottom"></div></div></div>');
    gp_editing.ShowEditor();
  }, IsExtraMode:function() {
    var a = $gp.CurrentDiv();
    return a.length ? "undefined" == typeof a.data("gp-section") ? gp_editing.is_extra_mode = !0 : gp_editing.is_extra_mode = !1 : gp_editing.is_extra_mode;
  }, ShowEditor:function() {
    var a = $gp.CurrentDiv(), b = $("#ckeditor_wrap").addClass("show_editor");
    $gp.$win.resize();
    var c = $("#ckeditor_tabs").html(""), d = gp_editing.IsExtraMode();
    d ? (b.addClass("edit_mode_extra"), c.append('<a href="?cmd=ManageSections" data-cmd="inline_edit_generic" data-arg="manage_sections">' + gplang.Extra + "</a>")) : (b.removeClass("edit_mode_extra"), c.append('<a href="?cmd=ManageSections" data-cmd="inline_edit_generic" data-arg="manage_sections">' + gplang.Page + "</a>"));
    0 != a.length && (b = gp_editing.SectionLabel(a), $("<a>").text(b).appendTo(c));
    0 == a.length && d ? $("#ckeditor_save").hide() : $("#ckeditor_save").show();
    gp_editing.PublishButton(a);
  }, SectionLabel:function(a) {
    var b = a.data("gp_label");
    b || (a = gp_editing.TypeFromClass(a), b = gp_editing.ucfirst(a));
    return b;
  }, TypeFromClass:function(a) {
    a = $(a);
    var b = a.data("gp_type");
    if (b) {
      return b;
    }
    b = a.prop("class").substring(16);
    return b.substring(0, b.indexOf(" "));
  }, ucfirst:function(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }, CreateTabs:function() {
    var a = $(".inline_edit_area");
    if (a.length) {
      var b = "selected", c = '<div id="cktabs" class="cktabs">';
      a.each(function() {
        c += '<a class="ckeditor_control ' + b + '" data-cmd="SwitchEditArea" data-arg="#' + this.id + '">' + this.title + "</a>";
        b = "";
      });
      c += "</div>";
      $("#ckeditor_area .toolbar").append(c).find("a").mousedown(function(a) {
        a.stopPropagation();
      });
    }
  }, AddTab:function(a, b) {
    var c = $("#" + b);
    c.length ? (c.replaceWith(a), $('#cktabs .ckeditor_control[data-arg="#' + b + '"]').click()) : (c = $(a).appendTo("#ckeditor_top"), $('<a class="ckeditor_control" data-cmd="SwitchEditArea" data-arg="#' + b + '">' + c.attr("title") + "</a>").appendTo("#cktabs").click());
  }, RestoreCached:function(a) {
    if ("object" != typeof $gp["interface"][a]) {
      return !1;
    }
    if ($gp.curr_edit_id === a) {
      return !0;
    }
    $("#ck_area_wrap").html("").append($gp["interface"][a]);
    gp_editor = $gp.editors[a];
    $gp.curr_edit_id = a;
    $gp.RestoreObjects("links", a);
    $gp.RestoreObjects("inputs", a);
    $gp.RestoreObjects("response", a);
    gp_editing.ShowEditor();
    "function" == typeof gp_editor.wake && gp_editor.wake();
    $gp.CurrentDiv().addClass("gp_edit_current");
    return !0;
  }, IsDirty:function() {
    gp_editing.is_dirty = !0;
    return "undefined" == typeof gp_editor.checkDirty || gp_editor.checkDirty() ? !0 : gp_editing.is_dirty = !1;
  }, DisplayDirty:function() {
    gp_editing.is_dirty || gp_editing.IsDirty() ? ($("#ckeditor_wrap").addClass("not_saved"), $("a.msg_publish_draft").hide()) : ($("#ckeditor_wrap").removeClass("not_saved"), $("a.msg_publish_draft").show());
  }, save_changes:function(a) {
    console.log("Please use gp_editing.SaveChanges() instead of gp_editing.save_changes()");
    gp_editing.SaveChanges(a);
  }};
  $gp.links.ck_close = gp_editing.close_editor;
  $gp.links.ck_save = function(a, b) {
    a.preventDefault();
    gp_editing.SaveChanges(function() {
      b && "ck_close" == b && gp_editing.close_editor(a);
    });
  };
  $gp.links.SwitchEditArea = function(a, b) {
    this.href && $gp.links.inline_edit_generic.call(this, a, "manage_sections");
    var c = $(this);
    $(".inline_edit_area").hide();
    $(c.data("arg")).show();
    c.siblings().removeClass("selected");
    c.addClass("selected");
  };
  $(window).on("beforeunload", function() {
    if ("undefined" !== typeof gp_editor.checkDirty && gp_editor.checkDirty()) {
      return "Unsaved changes will be lost.";
    }
  });
  $gp.$doc.on("click", ".editable_area:not(.filetype-wrapper_section)", function(a) {
    var b = $gp.AreaId($(this));
    if (b != $gp.curr_edit_id) {
      a.stopImmediatePropagation();
      a = $("#ExtraEditLink" + b);
      var c = a.data("arg");
      $gp.LoadEditor(a.get(0).href, b, c);
    }
  });
  window.setInterval(function() {
    ("function" != typeof gp_editor.CanAutoSave || gp_editor.CanAutoSave()) && gp_editing.SaveChanges();
  }, 5000);
  $gp.$doc.on("keyup mouseup", function() {
    window.setTimeout(gp_editing.DisplayDirty, 100);
  });
  $gp.links.ToggleEditor = function() {
    $("#ckeditor_wrap").hasClass("show_editor") ? ($("html").css({"margin-left":0}), $("#ckeditor_wrap").removeClass("show_editor"), $gp.$win.resize()) : gp_editing.ShowEditor();
  };
  $gp.$win.resize(function() {
    var a = $("#ckeditor_area");
    if (a.length) {
      var b = $gp.$win.height();
      b -= a.position().top;
      b -= $("#ckeditor_save").outerHeight();
      $("#ckeditor_area").css({"max-height":b});
      $("html").css({"margin-left":0, width:"auto"});
      a = $gp.$win.width();
      var c = $gp.CurrentDiv();
      if (c.length) {
        var d = c.offset().left;
        b = d - 10;
        if (!(0 > b)) {
          var e = a - $("#ckeditor_wrap").outerWidth(!0);
          c = d + c.outerWidth() - e;
          c += 10;
          0 > c || (b = Math.min(c, b), $("html").css({"margin-left":-b, width:a}));
        }
      }
    }
  }).resize();
  $gp.links.Publish = function() {
    var a = $gp.CurrentDiv();
    a = $gp.AreaId(a);
    var b = gp_editing.get_path(a);
    b = $gp.jPrep(b, "cmd=PublishDraft");
    $(this).data("gp-area-id", a);
    $gp.jGoTo(b, this);
  };
  $gp.response.DraftPublished = function() {
    var a = $(this).hide();
    a = $gp.AreaId(a);
    a = $("#ExtraEditArea" + a);
    gp_editing.DraftStatus(a, 0);
  };
  $(".editable_area").off(".gp");
  $gp.$doc.off("click.gp");
})();
