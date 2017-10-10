if ("undefined" == typeof gp_Image_Common) {
  var LoadImages = function(c) {
    gp_Image_Common.LoadImages(c);
  }, gp_Image_Common = new function() {
    function c() {
      $(".gp_active").length && ($("#gp_gallery_avail_imgs").animate({height:220}, 500), $(".gp_edit_select_options").slideUp(500, function() {
        $("#gp_image_area").removeClass("gp_active");
      }));
    }
    $("body").click(function(b) {
      var a = !1;
      b.target && (a = $(b.target).closest(".gp_edit_select"));
      a.length ? (a = a.find(".gp_edit_select_options"), a.is(":visible") ? $(b.target).closest(".gp_selected_folder").length && c() : a.slideDown(500, function() {
        $("#gp_image_area").addClass("gp_active");
      })) : c();
    });
    $gp.links.gp_gallery_folder = function(b, a) {
      b.preventDefault();
      LoadImages(a);
    };
    $gp.response.img_deleted_id = function(b) {
      $("#" + b.CONTENT).remove();
    };
    gpinputs.gp_gallery_folder_add = function(b, a) {
      a.preventDefault();
      var c = this.form;
      LoadImages(c.dir.value + "/" + c.newdir.value, gp_editor);
    };
    this.LoadImages = function(b) {
      var a = strip_from(gp_editor.save_path, "?"), a = b ? a + ("?cmd=gallery_folder&dir=" + encodeURIComponent(b)) : a + "?cmd=gallery_images";
      $gp.jGoTo(a);
    };
  }
}
;