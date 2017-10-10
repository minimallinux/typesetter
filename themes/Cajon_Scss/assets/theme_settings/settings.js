var ThemeCajonSettingsHelpers = {config:!1, config_backup:!1, init:function() {
  "object" == typeof gp_editor && (ThemeCajonSettingsHelpers.gp_editor_backup = gp_editor);
  ThemeCajonSettingsHelpers.config = $.extend({}, ThemeCajonConfig);
  gp_editor = {selectFile:function(a) {
    gp_editor.FinderSelect = function(b) {
      "" != b && a.val(b).trigger("change");
      return !0;
    };
    var c = window.open(gpFinderUrl, "gpFinder", "menubar=no,width=960,height=450");
    window.focus && c.focus();
  }};
  $("button#theme-cajon-select-logo-image-btn").on("click", function(a) {
    a.preventDefault();
    a = $("input#theme-cajon-logo-image-url");
    gp_editor.selectFile(a);
  });
  $('#theme-cajon-settings-form input[name="logo_img_url"]').on("change input", function() {
    ThemeCajonSettingsHelpers.config.logo_img_url = $(this).val();
    ThemeCajonSettingsHelpers.apply();
  });
  $('#theme-cajon-settings-form select[name="navbar_variant"]').on("change", function() {
    ThemeCajonSettingsHelpers.config.navbar_variant = $(this).val();
    ThemeCajonSettingsHelpers.apply();
  });
  $('#theme-cajon-settings-form select[name="navbar_position"]').on("change", function() {
    ThemeCajonSettingsHelpers.config.navbar_position = $(this).val();
    ThemeCajonSettingsHelpers.apply();
  });
  $('#theme-cajon-settings-form select[name="logo_img_shape"]').on("change", function() {
    ThemeCajonSettingsHelpers.config.logo_img_shape = $(this).val();
    ThemeCajonSettingsHelpers.apply();
  });
  $('#theme-cajon-settings-form select[name="logo_img_size"]').on("change", function() {
    ThemeCajonSettingsHelpers.config.logo_img_size = $(this).val();
    ThemeCajonSettingsHelpers.apply();
  });
  $('#theme-cajon-settings-form select[name="logo_img_border"]').on("change", function() {
    ThemeCajonSettingsHelpers.config.logo_img_border = $(this).val();
    ThemeCajonSettingsHelpers.apply();
  });
  $('#theme-cajon-settings-form input[name="logo_img_collapsed"]').on("change", function() {
    ThemeCajonSettingsHelpers.config.logo_img_collapsed = $(this).prop("checked") ? "show" : "hide";
    ThemeCajonSettingsHelpers.apply();
  });
}, apply:function(a) {
  "undefined" == typeof a && (a = ThemeCajonSettingsHelpers.config);
  var c = "navbar-" + a.navbar_variant + " navbar-fixed-side-" + a.navbar_position, b = "logo-shape-" + a.logo_img_shape + " logo-size-" + a.logo_img_size + " logo-border-" + a.logo_img_border + " logo-collapsed-" + a.logo_img_collapsed;
  $(".navbar-theme-cajon").removeClass("navbar-default navbar-inverse navbar-fixed-side-left navbar-fixed-side-right").addClass(c);
  $("img.theme-cajon-logo").removeClass("logo-shape-default logo-shape-circle logo-size-small logo-size-medium logo-size-large logo-border-none logo-border-single logo-border-double logo-border-offset logo-collapsed-show logo-collapsed-hide").addClass(b).attr("src", a.logo_img_url);
}, destroy:function(a) {
  a ? ThemeCajonSettingsHelpers.apply(ThemeCajonConfig) : ThemeCajonConfig = $.extend({}, ThemeCajonSettingsHelpers.config);
  "object" == typeof ThemeCajonSettingsHelpers.gp_editor_backup && (gp_editor = ThemeCajonSettingsHelpers.gp_editor_backup);
}};
