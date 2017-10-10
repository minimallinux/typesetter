$(function() {
  "undefined" != typeof IE_LT_10 && IE_LT_10 && $("#browser_warning").show();
  $("#loginform .login_text:first input").focus();
  window.setTimeout(function() {
    $("#login_timeout").show();
    $("#login_form").hide();
  }, 5E5);
  $("#login_form").submit(function() {
    if (this.encrypted.checked) {
      var a = this.password.value, c = this.login_nonce.value;
      this.pass_md5.value = hex_sha1(c + hex_md5(a));
      this.pass_sha.value = hex_sha1(c + hex_sha1(a));
      for (var f = this.pass_sha512, e = 0;50 > e;e++) {
        var b = a.replace(/[a-f]/g, ""), d = parseInt(b.substr(0, 1)), b = parseInt(b.substr(2, 1)), d = a.substr(d, b), a = (new jsSHA(a + d, "TEXT")).getHash("SHA-512", "HEX")
      }
      f.value = a;
      this.password.value = "";
      this.user_sha.value = hex_sha1(c + this.username.value);
      this.username.value = "";
    }
  });
});
