$(function() {
  function b(a) {
    return (a = window.top.location.search.match(new RegExp("(?:[?&]|&amp;)" + a + "=([^&]+)", "i"))) && 1 < a.length ? a[1] : "";
  }
  finder_opts.getFileCallback && !0 === finder_opts.getFileCallback && (finder_opts.getFileCallback = function(a) {
    "object" == typeof a && (a = checkNested(finder_opts, "commandsOptions", "getfile", "multiple") && 1 == finder_opts.commandsOptions.getfile.multiple ? $.map(a, function(a) {
      return a.url;
    }) : a.url);
    if ("function" == typeof window.top.opener.gp_editor.FinderSelect) {
      window.top.opener.gp_editor.FinderSelect(a);
    } else {
      var c = b("CKEditorFuncNum");
      window.top.opener.CKEDITOR.tools.callFunction(c, a);
    }
    window.top.close();
    window.top.opener.focus();
  });
  var c = $("#finder").finder(finder_opts), d = $(window);
  d.resize(function() {
    var a = c.offset().top, b = d.height();
    parseInt(b - a) != c.height() && c.height(b - a).resize();
  }).resize();
});
function checkNested(b) {
  for (var c = Array.prototype.slice.call(arguments, 1), d = 0; d < c.length; d++) {
    if (!b || !b.hasOwnProperty(c[d])) {
      return !1;
    }
    b = b[c[d]];
  }
  return !0;
}
;