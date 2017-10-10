$(function() {
  if (document.getElementById("gp_layout_iframe")) {
    var e = $("#gp_iframe_wrap");
    window.setInterval(function() {
      var b = document.getElementById("gp_layout_iframe");
      b.contentWindow.document.getElementById("gp_layout_iframe") && (inner_iframe_src = b.contentWindow.document.getElementById("gp_layout_iframe").getAttribute("src"), b.src = inner_iframe_src);
      var a = b.contentWindow.document.body;
      if (a) {
        var c = b.contentWindow.document.documentElement;
        height = Math.max(a.scrollHeight, a.offsetHeight);
        e.height(height + 80);
        window.setTimeout(function() {
          height = Math.max(a.scrollHeight, a.offsetHeight, c.clientHeight, c.scrollHeight, c.offsetHeight, $gp.$win.height());
          e.height(height);
        }, 1000);
      }
    }, 2000);
  }
  var f = Math.min(gpui.thw, $gp.$win.width() - 50);
  $("#gp_iframe_wrap").css("margin-right", f);
  $("#theme_editor").css("width", f);
  $("#theme_editor").resizable({handles:"w", minWidth:172, resize:function(b, a) {
    $("#gp_iframe_wrap").css("margin-right", a.size.width + 1);
    gpui.thw = a.size.width;
    $gp.SaveGPUI();
  }});
  $gp.links.SetPreviewTheme = function() {
    var b = this.href + "&cmd=newlayout";
    $(".add_layout").attr("href", b);
  };
  var d = $("#available_wrap");
  d.length && $gp.$win.resize(function() {
    var b = d.offset().top, a = $gp.$win.height();
    d.css("max-height", a - b);
    console.log(b, a, a - b);
  }).resize();
  (function() {
    var b = $("#gp_layout_css");
    if (b.length) {
      var a = {mode:"text/x-less", lineWrapping:!1};
      "scss" == b.data("mode") && (a.mode = "text/x-scss");
      var c = CodeMirror.fromTextArea(b.get(0), a), d = c.getValue();
      c.on("change", function(a) {
        a = a.getValue();
        a = d != a;
        b.toggleClass("edited", a);
        $('button[data-cmd="preview_css"], button[data-cmd="save_css"], input[type="reset"]').toggleClass("gpdisabled", !a).prop("disabled", !a);
      });
      $(window).resize(function() {
        var a = b.parent();
        c.setSize(225, 100);
        c.setSize(225, a.height() - 5);
      }).resize();
      $gp.inputs.preview_css = function(a) {
        $gp.loading();
      };
      $gp.inputs.save_css = function(a) {
        b.removeClass("edited");
        d = b.val();
        setTimeout(function() {
          $('button[data-cmd="preview_css"], button[data-cmd="save_css"], input[type="reset"]').addClass("gpdisabled").prop("disabled", !0);
        }, 150);
        $gp.loading();
      };
      $gp.inputs.reset_css = function(a) {
        c.setValue(d);
        c.clearHistory();
        b.hasClass("edited") && $gp.inputs.save_css();
      };
      $(window).on("beforeunload", function(a) {
        if (b.hasClass("edited")) {
          return "Warning: There are unsaved changes. Proceed anyway?";
        }
      });
    }
  })();
});
