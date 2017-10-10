$(function() {
  function c(a, b, c) {
    a = a.closest("span.rating");
    var d = a.find("input[name=rating]");
    c && d.val(c);
    b = b || d.val();
    b = a.find("a:eq(" + (b - 1) + ")");
    b.nextAll().addClass("unset");
    b.removeClass("unset");
    b.prevAll().removeClass("unset");
  }
  $(document).delegate("span.rating a", {mouseenter:function() {
    var a = $(this);
    c(a, a.data("rating"));
  }, mouseleave:function() {
    c($(this));
  }, click:function() {
    var a = $(this), b = a.data("rating");
    c(a, b, b);
  }});
});
