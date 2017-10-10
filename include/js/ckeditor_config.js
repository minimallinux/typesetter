CKEDITOR.on("instanceCreated", function(a) {
  var b = a.editor;
  b.on("uiSpace", function() {
    var a = "About Bold Italic Underline Scayt Strike Subscript Superscript BidiLtr BidiRtl Blockquote Cut Copy Paste TextColor BGColor Templates CreateDiv - NumberedList BulletedList Indent Outdent Find Replace Flash Font FontSize Form Checkbox Radio TextField Textarea Select Button ImageButton HiddenField Format HorizontalRule Iframe Image Smiley JustifyLeft JustifyCenter JustifyRight JustifyBlock Link Unlink Anchor Maximize NewPage PageBreak PasteText PasteFromWord RemoveFormat Save SelectAll ShowBlocks Sourcedialog SpecialChar Styles Table Undo Redo".split(" "), 
    c = [];
    for (i in b.ui.items) {
      -1 === jQuery.inArray(i, a) && c.push(i);
    }
    0 != c.length && b.config.toolbar.push(c);
  });
});
CKEDITOR.on("dialogDefinition", function(a) {
  if ("undefined" != typeof gptitles) {
    var b = a.data.definition;
    if ("link" == a.data.name) {
      var d = !1;
      a = b.getContents("info").get("protocol");
      a["default"] = "";
      a.items.unshift(["", ""]);
      b.onOk = CKEDITOR.tools.override(b.onOk, function(a) {
        return function(b) {
          return d ? d = !1 : a.call(this, b);
        };
      });
      b.onLoad = CKEDITOR.tools.override(b.onLoad, function(a) {
        return function() {
          a.call(this);
          var b = this.getContentElement("info", "url").getInputElement().$, c = this.getContentElement("info", "protocol").getInputElement().$;
          $(b).autocomplete({open:function() {
            $(this).autocomplete("widget").css("z-index", 10100);
            return !1;
          }, source:gptitles, delay:100, minLength:0, appendTo:"#gp_admin_html", select:function(a, e) {
            if (e.item) {
              return b.value = encodeURI(e.item[1]), c.value = "", 13 == a.which && (d = !0), a.stopPropagation(), !1;
            }
          }}).data("ui-autocomplete")._renderItem = function(a, b) {
            return $("<li></li>").data("ui-autocomplete-item", b[1]).append("<a>" + $gp.htmlchars(b[0]) + "<span>" + $gp.htmlchars(b[1]) + "</span></a>").appendTo(a);
          };
        };
      });
    }
  }
});
