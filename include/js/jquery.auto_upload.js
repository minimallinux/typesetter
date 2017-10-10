(function(a) {
  jQuery.fn.auto_upload = function(c) {
    function d() {
      function b(b, f) {
        var h = {}, k = "undefined" != typeof b.fileName ? b.fileName : b.name;
        if (c.start(k, h)) {
          var e = new XMLHttpRequest;
          e.onload = function(b) {
            c.finish(e.responseText, k, h);
          };
          e.upload.onprogress = function(b) {
            c.progress(b.loaded / b.total, k, h);
          };
          e.onerror = function(b) {
            c.error(name, b, h);
          };
          var m = g.attr("method"), n = g.attr("action");
          e.open(m, n, !0);
          e.setRequestHeader("Cache-Control", "no-cache");
          e.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          e.setRequestHeader("X-File-Size", b.fileSize);
          var l = new FormData;
          a.each(p, function(b, a) {
            l.append(a.name, a.value);
          });
          l.append(d, b);
          e.send(l);
        }
      }
      var d = a(this).attr("name"), g = a(this.form), p = g.serializeArray();
      a.each(this.files, function(a, c) {
        b(c, a);
      });
      this.form.reset();
    }
    function f() {
      $input = a(this);
      $form = a(this.form);
      $input.bind("change", function() {
        for (var b = this.value.toString();(pos = b.search("\\\\")) && -1 != pos;) {
          b = b.substr(pos + 1);
        }
        var d = {};
        c.start(b, d);
        var g = "gp_" + Math.round(1E7 * Math.random()), f = a('<iframe name="' + g + '" id="' + g + '" style="display:none"></iframe>').appendTo("body");
        $form.attr("target", g).one("submit", function() {
          f.one("load", function() {
            var a = f.contents().find("html").html();
            c.finish(a, b, d);
            setTimeout(function() {
              f.remove();
            }, 10);
          });
        }).submit();
      });
    }
    c = a.extend({}, a.fn.auto_upload.defaults, c);
    var m = function() {
      var b = document.createElement("input");
      b.type = "file";
      return "multiple" in b && "undefined" != typeof File && ("undefined" !== typeof FormData || "undefined" !== typeof FileReader) && "undefined" != typeof XMLHttpRequest && "undefined" != typeof(new XMLHttpRequest).upload;
    }();
    return a(this).each(function() {
      $this = a(this);
      m ? ($this.attr("multiple", "multiple"), $this.bind("change.auto_upload", d)) : f.call(this);
      $this.bind("destroy.auto_upload", function() {
        $this.unbind(".auto_upload");
      });
    });
  };
  a.fn.auto_upload.defaults = {start:function(a, d) {
    return !0;
  }, progress:function(a, d, f) {
  }, finish:function(a, d, f) {
  }, error:function(a, d, f) {
  }};
})(jQuery);
