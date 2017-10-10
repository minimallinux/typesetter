$(function() {
  function c() {
    $(".all_checkboxes").each(function() {
      var a = $(this);
      b(a);
    });
  }
  function b(a) {
    var b = !0;
    a.find("label.all_checkbox input").each(function(a, d) {
      d.checked || (b = !1);
    });
    b || a.find("input.select_all").prop("checked", !1);
  }
  $("input.select_all").click(function(a) {
    var c = this.checked;
    a = $(this).closest(".all_checkboxes");
    a.find("input[type=checkbox]").each(function(a, b) {
      if (b.disabled) {
        return !0;
      }
      b.checked = c ? !0 : !1;
    });
    b(a);
  });
  $("label.all_checkbox").click(function(a) {
    a = $(this).closest(".all_checkboxes");
    b(a);
  });
  $(".all_checkboxes").each(function() {
    var a = $(this);
    b(a);
    a.closest("form").find('input[type="reset"]').unbind("click.checkboxes").bind("click.checkboxes", function() {
      window.setTimeout(function() {
        c();
      }, 50);
    });
  });
});
