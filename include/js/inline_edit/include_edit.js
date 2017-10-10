function gp_init_inline_edit(b, e) {
  var c = "", a = gp_editing.get_path(b), d = gp_editing.get_edit_area(b);
  0 != d && 0 != a && (gp_editor = {save_path:a, CanAutoSave:function() {
    return $("#gp_include_form input:checked").length ? !0 : !1;
  }, checkDirty:function() {
    return gp_editor.SaveData() != c ? !0 : !1;
  }, SaveData:function() {
    return $("#gp_include_form").serialize();
  }, resetDirty:function() {
    c = gp_editor.SaveData();
  }}, gp_editing.editor_tools(), $gp.jGoTo(a + "&cmd=include_dialog"), $gp.response.gp_include_dialog = function(a) {
    $("#ckeditor_top").html(a.CONTENT);
    gp_editor.resetDirty();
  }, $gp.inputs.IncludePreview = function() {
    gp_editing.SaveChanges();
  }, $gp.response.gp_include_content = function(a) {
    d.html(a.CONTENT);
  });
}
;