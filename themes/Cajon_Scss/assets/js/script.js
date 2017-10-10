$(function() {
  $("li:not(.active-parent-li) > .sublinks-menu").hide();
  $(".sidebar-nav a.sublinks-toggle").on("click", function() {
    var a = $(this).next("ul");
    a.is(":visible") ? ($(this).attr("aria-expanded", "false"), a.slideUp(300)) : ($(this).attr("aria-expanded", "true"), a.slideDown(300));
  });
});
