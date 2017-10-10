$(function() {
  $(document).on("focus", "input.title-autocomplete:not(.ui-autocomplete-input)", function() {
    function d() {
      $(e).css({position:"relative", zIndex:12E3}).autocomplete({source:c, delay:100, minLength:0, appendTo:"#gp_admin_html", select:function(b, a) {
        if (a.item) {
          return this.value = a.item[1], !1;
        }
      }}).data("ui-autocomplete")._renderItem = function(b, a) {
        return $("<li></li>").data("ui-autocomplete-item", a[1]).append("<a>" + $gp.htmlchars(a[0]) + "<span>" + $gp.htmlchars(a[1]) + "</span></a>").appendTo(b);
      };
    }
    var c = !1, e = this;
    $.getJSON(gpBLink + "/Admin?cmd=autocomplete-titles", function(b) {
      c = b;
      d();
    });
  });
});
