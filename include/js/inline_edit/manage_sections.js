(function() {
  function p(a, b) {
    a = a.split(" ");
    var c = "", d = "";
    if (1 < a.length) {
      c += "<select>";
      for (var e = 0; e < a.length; e++) {
        var g = "";
        0 <= b.indexOf(a[e]) && (d = "checked", g = "selected");
        c += '<option value="' + a[e] + '" ' + g + ">" + a[e] + "</option>";
      }
      c += '</select><span class="gpcaret"></span>';
    } else {
      0 <= b.indexOf(a[0]) && (d = "checked"), c += "<span>" + a[0] + "</span>";
    }
    return '<label class="gpcheckbox"><input class="gpcheck" type="checkbox" data-cmd="ClassChecked" ' + d + "/>" + c + "</label>";
  }
  function k(a, b) {
    var c = $('#section_attributes_form td input.attr_name[value="class"]').closest("tr").find("input.attr_value"), d = c.val();
    d = $("<div/>").addClass(d);
    "add" == b ? d.addClass(a) : d.removeClass(a);
    c.val(d.attr("class"));
    d.remove();
  }
  function l(a) {
    m(a);
    a.find(".editable_area").each(function() {
      m($(this));
    });
  }
  function m(a) {
    var b = 1;
    do {
      b++;
      var c = "ExtraEditArea" + b;
    } while (document.getElementById(c) || document.getElementById("ExtraEditLink" + b));
    a.attr("id", c).data("gp-area-id", b);
    $('<a href="?" class="nodisplay" data-cmd="inline_edit_generic" data-gp-area-id="' + b + '" id="ExtraEditLink' + b + '">').appendTo("#gp_admin_html");
  }
  function q() {
    var a = $("#ck_editable_areas ul").html(""), b = $gp.div("gp_edit_box");
    $("a.ExtraEditLink").clone(!1).attr("class", "").show().each(function() {
      var c = $(this), d = $gp.AreaId(c), e = $("#ExtraEditArea" + d);
      if (e.hasClass("gp_no_overlay") || 0 === e.length || "undefined" != typeof e.data("gp-section")) {
        return !0;
      }
      var g = $gp.Coords(e), f = this.title.replace(/_/g, " ");
      f = decodeURIComponent(f);
      15 < f.length && (f = f.substr(0, 14));
      c.attr("id", "editable_mark" + d).html('<i class="fa fa-pencil"></i> ' + f).on("mouseenter touchstart", function() {
        var a = $gp.Coords(e);
        b.stop(!0, !0).css({top:a.top - 3, left:a.left - 2, width:a.w + 4, height:a.h + 5}).fadeIn();
        ($gp.$win.scrollTop() > a.top || $gp.$win.scrollTop() + $gp.$win.height() < a.top) && $("html,body").stop(!0, !0).animate({scrollTop:Math.max(0, a.top - 100)}, "slow");
      }).on("mouseleave touchend click", function() {
        b.stop(!0, !0).fadeOut();
      });
      c = $("<li>").append(c).data("top", g.top).appendTo(a);
      e.data("draft") && (g = $gp.jPrep(this.href, "cmd=PublishDraft"), $('<a class="draft" data-cmd="gpajax" data-gp-area-id="' + d + '">' + gplang.Draft + "</a>").attr("href", g).appendTo(c));
    });
    a.find("li").sort(function(a, b) {
      var c = $(a).data("top"), d = $(b).data("top");
      return c < d ? -1 : c > d ? 1 : 0;
    }).appendTo(a);
  }
  var h = null;
  gp_editor = {save_path:"?", saved_data:"", allowAutoSave:!0, CanAutoSave:function() {
    return gp_editor.allowAutoSave || !0;
  }, checkDirty:function() {
    var a = this.SaveData();
    return this.saved_data != a ? !0 : !1;
  }, SaveData:function() {
    var a = {section_order:[], attributes:[], contains_sections:[], gp_label:[], gp_color:[], gp_collapse:[], gp_hidden:[], cmd:"SaveSections"};
    $("#gpx_content.gp_page_display").find(".editable_area").each(function(b) {
      var c = $(this), d = gp_editing.TypeFromClass(this), e = c.data("gp-section");
      d && ("undefined" == typeof e && (e = d), a.section_order.push(e), a.attributes[b] = c.data("gp-attrs"), "wrapper_section" == d && (a.contains_sections[b] = c.children(".editable_area").length), a.gp_label[b] = c.data("gp_label"), a.gp_color[b] = c.data("gp_color"), a.gp_collapse[b] = c.data("gp_collapse"), a.gp_hidden[b] = c.data("gp_hidden"));
    });
    return $.param(a);
  }, AfterSave:{}, resetDirty:function() {
    gp_editor.SectionNumbers();
    this.saved_data = this.SaveData();
    $.each(gp_editor.AfterSave, function(a, b) {
      if ("function" == typeof b.fnc) {
        var c = b.fnc(b.arg);
        "function" == typeof b.callback && b.callback(c);
      }
      b.destroy && delete gp_editor.AfterSave[a];
    });
  }, SectionNumbers:function() {
    $("#gpx_content.gp_page_display").find(".editable_area").each(function(a) {
      var b = $(this);
      b.data("gp-section", a).attr("data-gp-section", a);
      b = $gp.AreaId(b);
      var c = $("#ExtraEditLink" + b).attr("href") || "";
      c = c.replace(/section\=[0-9]+/, "");
      c = $gp.jPrep(c, "section=" + a);
      $("#ExtraEditLink" + b).attr("href", c);
    });
  }, SaveToClipboard:function(a) {
    var b = $('#section_sorting li[data-gp-area-id="' + a + '"]');
    b.length ? (a = {cmd:"SaveToClipboard", section_number:gp_editor.GetArea(b).attr("data-gp-section")}, a = jQuery.param(a), $gp.postC(window.location.href, a), loading()) : console.log('SaveToClipboard Error: section_sorting li[data-gp-area-id="' + a + '"] does not exist!');
  }, SectionFromClipboard:function(a) {
    var b = $('#section-clipboard-items li[data-item_index="' + a + '"] a.preview_section');
    b.removeClass("previewing");
    $(".temporary-section").remove();
    var c = $(b.data("response")).appendTo("#gpx_content");
    l(c);
    c.trigger("SectionAdded");
    gp_editor.InitSorting();
    b.trigger("mousemove");
    gp_editor.resetDirty();
    a = {cmd:"AddFromClipboard", item_number:a};
    a = jQuery.param(a);
    $gp.postC(window.location.href, a);
    loading();
  }, ClipboardSorted:function() {
    var a = $("#section-clipboard-items > li");
    if (a.length) {
      var b = [];
      a.each(function(a, d) {
        b[a] = $(this).attr("data-item_index");
      });
      a = {cmd:"ReorderClipboardItems", order:b};
      a = jQuery.param(a);
      $gp.postC(window.location.href, a);
      loading();
    }
  }, InitClipboard:function() {
    "undefined" != typeof SectionClipboard_links && alert("Warning \n\nThe SectionClipboard plugin seems to be installed.\nThis feature is now built into Typesetter.\n\nPlease uninstall the plugin now!");
    1 < $("#section-clipboard-items li").length && $("#section-clipboard-items").sortable({cancel:"li.clipboard-empty-msg", distance:4, tolerance:"pointer", update:this.ClipboardSorted, cursorAt:{left:6, top:5}}).disableSelection();
    $(document).trigger("section_clipboard:loaded");
  }, InitEditor:function() {
    $("#ckeditor_top").append(section_types);
    this.InitSorting();
    this.InitClipboard();
    this.resetDirty();
    $gp.$win.on("resize", this.MaxHeight).resize();
    $("#ckeditor_area").on("dragstop", this.MaxHeight);
    $gp.response.clipboard_init = this.InitClipboard;
    $(document).trigger("section_sorting:loaded");
  }, wake:function() {
    q();
  }, InitSorting:function() {
    var a = this, b = $("#section_sorting").html(""), c = this.BuildSortHtml($("#gpx_content.gp_page_display"));
    b.html(c);
    $(".section_drag_area").sortable({distance:4, tolerance:"pointer", stop:function(b, c) {
      a.DragStop(b, c);
    }, connectWith:".section_drag_area", cursorAt:{left:7, top:7}}).disableSelection();
    this.HoverListener(b);
  }, BuildSortHtml:function(a) {
    var b = "", c = this;
    a.children(".editable_area").each(function() {
      var a = $(this);
      this.id || (this.id = c.GenerateId());
      var e = gp_editing.TypeFromClass(this), g = $gp.AreaId(a), f = gp_editing.SectionLabel(a), n = a.data("gp_hidden"), r = a.data("gp_color") || "#aabbcc", h = ' class="' + (a.data("gp_collapse") || "") + (n ? " gp-section-hidden" : "") + '" ', k = a.data("gp-attrs")["class"] || f;
      a.on("mouseenter", function() {
        $('li[data-gp-area-id="' + g + '"]').addClass("section-sorting-highlight");
      }).on("mouseleave", function() {
        $('li[data-gp-area-id="' + g + '"]').removeClass("section-sorting-highlight");
      });
      b += '<li data-gp-area-id="' + g + '" ' + h + ' title="' + k + '">';
      b += '<div><a class="color_handle" data-cmd="SectionColor" style="background-color:' + r + '"></a>';
      b += '<span class="options">';
      a.hasClass("filetype-wrapper_section") || (b += '<a class="fa fa-pencil" data-cmd="SectionEdit" title="' + gplang.edit + '"></a>');
      b += '<a class="fa fa-sliders" data-cmd="SectionOptions" title="' + gplang.options + '"></a>';
      b += '<a class="fa fa-files-o" data-cmd="CopySection" title="' + gplang.Copy + '"></a>';
      b += '<a class="fa fa-clipboard" data-cmd="SectionToClipboard" title="' + gplang.CopyToClipboard + '"></a>';
      b += '<a class="fa ' + (n ? "fa-eye" : "fa-eye-slash") + ' ShowHideSection" data-cmd="ShowHideSection" title="' + gplang.Visibility + '"></a>';
      b += '<a class="fa fa-trash RemoveSection" data-cmd="ConfirmDeleteSection" title="' + gplang.remove + '"></a>';
      b += "</span>";
      b += '<i class="section_label_wrap">';
      "wrapper_section" == e && (b += '<a data-cmd="WrapperToggle" class="secsort_wrapper_toggle"/>');
      b += '<span class="section_label">' + f + "</span>";
      b += "</i>";
      b += "</div>";
      a.hasClass("filetype-wrapper_section") && (b += '<ul class="section_drag_area">', b += c.BuildSortHtml(a), b += "</ul>");
      b += "</li>";
    });
    return b;
  }, GenerateId:function() {
    do {
      var a = String.fromCharCode(65 + Math.floor(26 * Math.random())) + Date.now();
    } while (document.getElementById(a));
    return a;
  }, DragStop:function(a, b) {
    var c = this.GetArea(b.item), d = this.GetArea(b.item.prev());
    d.length ? c.insertAfter(d).trigger("SectionSorted") : (d = b.item.parent().closest("ul"), "section_sorting" == d.attr("id") ? c.prependTo("#gpx_content").trigger("SectionSorted") : (this.GetArea(d.parent()).prepend(c), c.trigger("SectionSorted")));
  }, HoverListener:function(a) {
    var b = this;
    a.find("div").on("mouseenter", function() {
      var a = $(this).parent(), d = b.GetArea(a);
      scrollto_section_timeout = setTimeout(function() {
        var a = d.offset().top - 200;
        $("html,body").stop().animate({scrollTop:a});
      }, 1200);
      $(".section-item-hover").removeClass("section-item-hover");
      a.addClass("section-item-hover");
      $(".section-highlight").removeClass("section-highlight");
      d.addClass("section-highlight");
    }).on("mouseleave", function() {
      var a = $(this).parent(), d = b.GetArea(a);
      scrollto_section_timeout && clearTimeout(scrollto_section_timeout);
      d.removeClass("section-highlight");
      a.removeClass("section-item-hover");
    });
  }, GetArea:function(a) {
    a = $gp.AreaId(a);
    return $("#ExtraEditArea" + a);
  }};
  $(document).on("mousemove", ".preview_section", function() {
    var a = $(this);
    h && clearTimeout(h);
    a.hasClass("previewing") || ($(".previewing").removeClass("previewing"), $(".temporary-section").stop().slideUp(function() {
      $(this).remove();
    }), h = setTimeout(function() {
      var b = $("#gpx_content .editable_area:last");
      b = b.offset().top + b.height() - 200;
      $("html,body").stop().animate({scrollTop:b});
      a.addClass("previewing");
      b = $(a.data("response"));
      b.find(".editable_area").addClass("temporary-section").removeClass("editable_area");
      b.addClass("temporary-section").removeClass("editable_area").appendTo("#gpx_content").hide().delay(300).slideDown().trigger("PreviewAdded");
      b = b.get(0);
      a.data("preview-section", b);
    }, 200));
  }).on("mouseleave", ".preview_section", function() {
    h && clearTimeout(h);
    $(this).removeClass("previewing");
    $(".temporary-section").stop().slideUp(function() {
      $(this).parent().trigger("PreviewRemoved");
      $(this).remove();
    });
  });
  $gp.links.AddSection = function(a) {
    var b = $(this);
    a.preventDefault();
    b.removeClass("previewing");
    $(".temporary-section").remove();
    a = $(b.data("response")).appendTo("#gpx_content");
    l(a);
    a.trigger("SectionAdded");
    gp_editor.InitSorting();
    b.removeClass("previewing").trigger("mousemove");
  };
  $gp.links.AddFromClipboard = function(a) {
    a = $(this).closest("li").attr("data-item_index");
    gp_editor.checkDirty() ? (gp_editor.allowAutoSave = !1, gp_editor.AfterSave.SectionFromClipboardEnqueued = {fnc:gp_editor.SectionFromClipboard, arg:a, callback:function(a) {
      gp_editor.allowAutoSave = !0;
    }, destroy:!0}, gp_editing.SaveChanges()) : gp_editor.SectionFromClipboard(a);
  };
  $gp.links.ShowHideSection = function(a) {
    a = $(this).closest("li");
    var b = gp_editor.GetArea(a);
    b.data("gp_hidden") ? (b.attr("data-gp_hidden", !1).data("gp_hidden", !1).hide().slideDown(300), $(this).removeClass("fa-eye").addClass("fa-eye-slash"), a.removeClass("gp-section-hidden")) : (b.slideUp(300, function() {
      b.attr("data-gp_hidden", !0).data("gp_hidden", !0);
    }), $(this).removeClass("fa-eye-slash").addClass("fa-eye"), a.addClass("gp-section-hidden"));
  };
  $gp.links.ConfirmDeleteSection = function(a) {
    a = $(this).closest("li");
    var b = a.attr("data-gp-area-id");
    var c = '<div class="inline_box">' + ("<h2>" + gplang.del + "</h2>");
    c = c + "<p>" + gplang.generic_delete_confirm.replace("%s", "<strong>" + a.find(".section_label").first().text() + "</strong>");
    c = c + "<br/><br/></p><p>" + ('<a class="gpsubmit" onClick="$gp.DeleteSection(' + b + ')">' + gplang.del + "</a>");
    c += '<a class="gpcancel" data-cmd="admin_box_close">' + gplang.ca + "</a>";
    $gp.AdminBoxC(c + "</p></div>");
  };
  $gp.DeleteSection = function(a) {
    if (1 < $("#gpx_content").find(".editable_area").length) {
      a = $('li[data-gp-area-id="' + a + '"]');
      if (!a.length) {
        return;
      }
      var b = gp_editor.GetArea(a);
      b.parent().trigger("SectionRemoved");
      b.remove();
      a.remove();
    }
    $gp.CloseAdminBox();
  };
  $gp.links.RemoveSection = function(a) {
    if (1 < $("#gpx_content").find(".editable_area").length) {
      a = $(this).closest("li");
      var b = gp_editor.GetArea(a);
      b.parent().trigger("SectionRemoved");
      b.remove();
      a.remove();
    }
  };
  $gp.links.CopySection = function(a) {
    a = gp_editor.GetArea($(this).closest("li"));
    var b = a.clone();
    l(b);
    a.after(b);
    b.trigger("SectionAdded");
    gp_editor.InitSorting();
  };
  $gp.links.SectionToClipboard = function(a) {
    a = $(this).closest("li").data("gp-area-id");
    gp_editor.checkDirty() ? (gp_editor.allowAutoSave = !1, gp_editor.AfterSave.SaveToClipboardEnqueued = {fnc:gp_editor.SaveToClipboard, arg:a, callback:function(a) {
      gp_editor.allowAutoSave = !0;
    }, destroy:!0}, gp_editing.SaveChanges()) : gp_editor.SaveToClipboard(a);
  };
  $gp.links.RemoveSectionClipboardItem = function(a) {
    (a = $(this).closest("li").attr("data-item_index")) ? (a = {cmd:"RemoveFromClipboard", item_number:a}, a = jQuery.param(a), $gp.postC(window.location.href, a), loading()) : console.log("RemoveSectionClipboardItem Error: Atribute data_item_index missing");
  };
  $gp.links.RelabelSectionClipboardItem = function(a) {
    var b = $(this).closest("li").attr("data-item_index");
    if (b) {
      var c = $(this), d = c.closest("li").find(".clipboard-item-label");
      d.hide();
      c.hide();
      var e = $('<input type="text" value="' + d.text() + '"/>').insertAfter(d).focus().select().on("keydown blur", function(a) {
        if ("blur" == a.type || 13 === a.which || 27 === a.which) {
          d.show();
          c.show();
          var f = e.val();
          e.remove();
          27 !== a.which && d.text() !== f && (d.text(f), a = {cmd:"RelabelClipboardItem", item_number:b, new_label:f}, a = jQuery.param(a), $gp.postC(window.location.href, a), loading());
        }
      });
    } else {
      console.log("RelabelClipboardItem Error: Atribute data_item_index missing");
    }
  };
  $gp.links.SectionColor = function(a) {
    var b = $(this).closest("li");
    a = "#1192D6 #3E5DE8 #8D3EE8 #C41FDD #ED2F94 #ED4B1E #FF8C19 #FFD419 #C5E817 #5AC92A #0DA570 #017C7C #DDDDDD #888888 #555555 #000000".split(" ");
    for (var c = '<span class="secsort_color_swatches">', d = 0; d < a.length; d++) {
      c += '<a style="background:' + a[d] + ';" data-color="' + a[d] + '"\tdata-cmd="SelectColor"/>';
    }
    b.children("div").hide();
    var e = $(c + "</span>").prependTo(b);
    $(document).one("click", function() {
      e.remove();
      b.children().show();
    });
  };
  $gp.links.SelectColor = function(a) {
    var b = $(this);
    a = b.closest("li");
    var c = gp_editor.GetArea(a);
    b = b.attr("data-color");
    a.find(".color_handle:first").css("background-color", b);
    c.attr("data-gp_color", b).data("gp_color", b);
    a.find(".secsort_color_swatches").remove();
    a.children().show();
  };
  $gp.links.WrapperToggle = function(a) {
    a = $(this).closest("li");
    var b = "wrapper_collapsed", c = gp_editor.GetArea(a);
    a.hasClass(b) ? (a.removeClass(b), b = "") : a.addClass(b);
    c.attr("data-gp_collapse", b).data("gp_collapse", b);
  };
  $gp.links.SectionEdit = function(a) {
    var b = $(this).closest("li");
    a = gp_editor.GetArea(b);
    b = $gp.AreaId(b);
    var c = $("#ExtraEditLink" + b), d = c.data("arg");
    $gp.LoadEditor(c.get(0).href, b, d);
    b = a.offset().top;
    a = b + a.height();
    c = $gp.$win.scrollTop();
    d = c + $gp.$win.height();
    a > c && b < d || $("html,body").stop().animate({scrollTop:b - 200});
  };
  $gp.links.SectionOptions = function(a) {
    var b = $(this).closest("li");
    a = b.data("gp-area-id");
    b = gp_editor.GetArea(b).data("gp-attrs");
    var c = "";
    html = '<div class="inline_box"><form id="section_attributes_form" data-gp-area-id="' + a + '">';
    html += "<h2>Section Attributes</h2>";
    html += '<table class="bordered full_width">';
    html += "<thead><tr><th>Attribute</th><th>Value</th></tr></thead><tbody>";
    $.each(b, function(a) {
      a = a.toLowerCase();
      if ("id" != a && "data-gp" != a.substr(0, 7)) {
        var b = $.trim(this);
        if ("" != b || "class" == a) {
          "class" == a && (c = b.split(" ")), html += "<tr><td>", html += '<input class="gpinput attr_name" value="' + $gp.htmlchars(a) + '" size="8" />', html += '</td><td style="white-space:nowrap">', html += '<input class="gpinput attr_value" value="' + $gp.htmlchars(b) + '" size="40" />', "class" == a && (html += '<div class="class_only admin_note">Default: GPAREA filetype-*</div>'), html += "</td></tr>";
        }
      }
    });
    html += '<tr><td colspan="3">';
    html += '<a data-cmd="add_table_row">Add Attribute</a>';
    html += "</td></tr>";
    html += "</tbody></table>";
    html += "<br/>";
    html += '<div id="gp_avail_classes">';
    html += '<table class="bordered full_width">';
    html += '<thead><tr><th colspan="2">' + gplang.AvailableClasses + "</th></tr></thead>";
    html += "<tbody>";
    for (a = 0; a < gp_avail_classes.length; a++) {
      html += "<tr><td>", html += p(gp_avail_classes[a].names, c), html += '</td><td class="sm text-muted">', html += gp_avail_classes[a].desc, html += "</td></tr>";
    }
    html += "</table>";
    html += "</tbody>";
    html += "</div>";
    html += "<p>";
    html += '<input type="button" name="" value="' + gplang.up + '" class="gpsubmit" data-cmd="UpdateAttrs" /> ';
    html += '<input type="button" name="" value="' + gplang.ca + '" class="gpcancel" data-cmd="admin_box_close" />';
    html += "</p>";
    html += "</form></div>";
    a = $(html);
    a.find("select").on("change input", function() {
      var a = $(this).closest("label").find(".gpcheck");
      a.prop("checked", !0);
      $gp.inputs.ClassChecked.apply(a);
    });
    $gp.AdminBoxC(a);
    $(document).trigger("section_options:loaded");
  };
  $gp.inputs.ClassChecked = function() {
    var a = $(this), b = a.prop("checked") ? "add" : "remove", c = a.siblings("select"), d = "";
    0 == c.length ? (d = a.siblings("span").text(), k(d, b)) : (d = [], c.find("option").each(function() {
      d.push(this.value);
    }), d = d.join(" "), k(d, "remove"), "add" == b && (d = c.val(), k(d, "add")));
  };
  $gp.inputs.UpdateAttrs = function() {
    var a = $("#section_attributes_form"), b = gp_editor.GetArea(a), c = b.data("gp-attrs"), d = {}, e = "", g = $("<div>"), f = "";
    $.each(c, function(a) {
      "class" != a && (d[a] = "", b.attr(a, ""));
    });
    a.find("tbody tr").each(function() {
      var a = $(this), c = a.find(".attr_name").val();
      (c = $.trim(c).toLowerCase()) && "id" != c && "data-gp" != c.substr(0, 7) && (a = a.find(".attr_value").val(), "class" == c ? e = a : (d[c] = a, b.attr(c, a)));
    });
    a = b.attr("class") || "";
    g.attr("class", a);
    g.removeClass(c["class"]);
    g.addClass(e);
    b.attr("class", g.attr("class"));
    d["class"] = e;
    c = $gp.AreaId(b);
    c = $("#section_sorting li[data-gp-area-id=" + c + "]");
    "" == f && (f = c.find("> div .section_label").text());
    c.attr("title", f);
    b.data("gp-attrs", d);
    $gp.CloseAdminBox();
  };
  $(document).on("dblclick", ".section_label", function() {
    var a = $(this), b = a.closest("div");
    b.hide();
    var c = $('<input type="text" value="' + a.text() + '"/>').insertAfter(b).focus().select().on("keydown blur", function(d) {
      if ("blur" == d.type || 13 === d.which || 27 === d.which) {
        b.show();
        var e = c.val();
        c.remove();
        27 !== d.which && a.text() !== e && (a.text(e), d = b.closest("li"), gp_editor.GetArea(d).attr("data-gp_label", e).data("gp_label", e));
      }
    });
  });
  gp_editing.editor_tools();
  gp_editor.InitEditor();
  loaded();
})();
