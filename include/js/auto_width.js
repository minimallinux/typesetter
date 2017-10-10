$(function() {
  function e() {
    if ("undefined" == typeof localStorage || "undefined" == typeof JSON) {
      return !1;
    }
    "undefined" == typeof localStorage.gp_expand_child_click && (localStorage.gp_expand_child_click = "{}");
    return JSON.parse(localStorage.gp_expand_child_click);
  }
  var c = $("#admincontainer"), f = c.attr("class") || "";
  $(window).resize(function() {
    var a = c.width(), b = 1;
    900 < a ? b = 3 : 600 < a && (b = 2);
    c.attr("class", f + " columns_" + b);
  }).resize();
  $(document).on("click", ".expand_child_click", function(a) {
    a.preventDefault();
    var b = $(this);
    a = b.closest(".panelgroup").attr("id");
    var d = b.parent().find(".expand_child_click"), c = d.index(this);
    b.hasClass("expand") ? (d.removeClass("expand"), c = !1) : (b.siblings().removeClass("expand"), b.addClass("expand"));
    b = c;
    (d = e()) && "undefined" != typeof a && (!1 !== b ? d[a] = b : delete d[a], localStorage.gp_expand_child_click = JSON.stringify(d));
  });
  $(document).on("click", ".expand_child_click li", function(a) {
    a.stopPropagation();
  });
  (function() {
    var a = e();
    a && $.each(a, function(b, a) {
      $("#" + b).find(".expand_child_click").eq(a).click();
    });
  })();
});
