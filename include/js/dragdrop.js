WBd = {scroll:!1, scrolly:0, scrollx:0, scrolle:!1, DMU:function(a) {
  a = $(".draggable_droparea > .target");
  if (!(1 > a.size())) {
    var b = a.get(0);
    b && b != WBd.dragEl && (b = $(WBd.dragEl).find("a.dragdroplink:first"), 1 > b.size() || (b = b.clone(!0).appendTo("body"), a = a.find("a.dragdroplink:first").html(), b.attr("href", b.attr("href").replace("%s", a).replace("%25s", a)), b.click()));
  }
  WBd.clean();
}, clean:function() {
  $(".draggable_droparea").removeClass("drag_active");
  $(".WB_DRAG_BOX").hide();
  $(document).unbind("mousemove.drag", WBd.DMM).unbind("mouseup.drag", WBd.DMU);
  $(".draggable_droparea > *").unbind("mouseover.drag").unbind("mouseout.drag").removeClass("target");
  WBd.VARS();
}, VARS:function() {
  WBd.dragEl = !1;
  WBd.started = !1;
}, dMDn:function(a) {
  if (!(0 < $(a.target).closest(".expand ul").size())) {
    $(document).bind("mouseup.drag", WBd.DMU);
    a = WBd.dragEl = this;
    var b = a.offsetWidth / 2, c = a.offsetHeight / 2;
    $("#WB_DRAG_BOX_TOP").height("30px").width(a.offsetWidth).css("marginTop", -(c + 30)).css("marginLeft", -b);
    $("#WB_DRAG_BOX_BOTTOM").width(a.offsetWidth).css("marginTop", c).css("marginLeft", -b);
    $("#WB_DRAG_BOX_LEFT").height(a.offsetHeight).width(1).css("marginTop", -c).css("marginLeft", -b);
    $("#WB_DRAG_BOX_RIGHT").height(a.offsetHeight).width(1).css("marginTop", -c).css("marginLeft", b);
    $(document).bind("mousemove.drag", WBd.DMM);
    return !1;
  }
}, DMM:function(a) {
  if (a) {
    WBd.started || (WBd.started = !0, $(".draggable_droparea > *:not([class~=draggable_nodrop])").bind("mouseover.drag", function() {
      $(this).addClass("target");
    }).bind("mouseout.drag", function() {
      $(this).removeClass("target");
    }), $(".draggable_droparea").addClass("drag_active"), $(".WB_DRAG_BOX").show());
    var b, c, d = $(window);
    b = a.clientX + d.scrollLeft();
    c = a.clientY + d.scrollTop();
    $(".WB_DRAG_BOX").css("left", b).css("top", c);
    b = c = 0;
    80 > a.clientY ? c = -30 : a.clientY + 60 > d.height() && (c = 30);
    60 > a.clientX ? b = -30 : a.clientX + 60 > d.width() && (b = 30);
    0 === b && 0 == c ? WBd.SCR() : (WBd.scrollx = b, WBd.scrolly = c, WBd.scrolle = a, !1 === WBd.scroll && (WBd.scroll = window.setInterval(function() {
      WBd.dragEl ? (window.scrollBy(WBd.scrollx, WBd.scrolly), WBd.DMM(WBd.scrolle)) : WBd.SCR();
    }, 150)));
    return !1;
  }
}, SCR:function() {
  WBd.scroll && window.clearInterval(WBd.scroll);
  WBd.scroll = WBd.scrolle = !1;
}};
$(function() {
  WBd.VARS();
  $(document).on("mousedown", ".draggable_element", WBd.dMDn);
  var a = $('<div style="position:absolute;z-index:10000;cursor:move;display:none;" class="WB_DRAG_BOX"></div>');
  a.clone().css("borderBottom", "2px dashed #bbb").attr("id", "WB_DRAG_BOX_TOP").appendTo("body");
  a.clone().css("borderLeft", "2px dashed #bbb").attr("id", "WB_DRAG_BOX_LEFT").appendTo("body");
  a.clone().css("borderTop", "2px dashed #bbb").attr("id", "WB_DRAG_BOX_BOTTOM").appendTo("body");
  a.clone().css("borderRight", "2px dashed #bbb").attr("id", "WB_DRAG_BOX_RIGHT").appendTo("body");
});
