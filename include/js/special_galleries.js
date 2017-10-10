$(function() {
  $(".active_galleries, .inactive_galleries").sortable({connectWith:".drag_galleries", tolerance:"pointer", items:".draggable", stop:function(e, d) {
    var b = d.item, a = {cmd:"newdrag", title:b.find(".title").val()}, c = b.next(".draggable");
    0 < c.length && (a.next = c.find(".title").val());
    b.parent().hasClass("active_galleries") && (a.active = "active");
    $gp.loading();
    a = jQuery.param(a, !0);
    $gp.postC(window.location.href, a);
  }}).disableSelection();
});
