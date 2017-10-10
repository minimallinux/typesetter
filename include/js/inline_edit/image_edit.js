function ImageEditor(p, f) {
  var k, l, q, r;
  function t() {
    b.posx = g.value;
    b.posy = h.value;
    b.width = m.value;
    b.height = n.value;
    return jQuery.param(b) + "&cmd=save_inline";
  }
  function A() {
    var a = 'background-image:url("' + $gp.htmlchars(b.src) + '");';
    k = u(m.value, k);
    l = u(n.value, l);
    a += "width: " + k + "px !important; height:" + l + "px !important;";
    q = u(g.value, q);
    r = u(h.value, r);
    a += "background-position: " + q + "px " + r + "px";
    x.style.cssText = a;
  }
  function u(a, d) {
    a = parseInt(a);
    d = parseInt(d);
    return a == d ? a : a > d ? d + Math.min(20, a - d) : d - Math.min(20, d - a);
  }
  function B() {
    m = v("width");
    n = v("height");
    g = v("left");
    h = v("top");
    g.value = b.posx;
    h.value = b.posy;
    m.value = b.width;
    n.value = b.height;
    gp_editing.CreateTabs();
    LoadImages(!1);
    k = c.width();
    l = c.height();
    y(b.src, k, l);
    C();
    c.attr("src", gp_blank_img);
    w = t();
    $("#gp_current_image input").on("keydown", function(a) {
      switch(a.which) {
        case 38:
          this.value = parseInt(this.value) + 1;
          break;
        case 40:
          this.value = parseInt(this.value) - 1;
      }
    });
  }
  function v(a) {
    return $("#gp_current_image input[name=" + a + "]").get(0);
  }
  function C() {
    var a = posy = mouse_startx = mouse_starty = pos_startx = pos_starty = 0, d = !1;
    c.disableSelection();
    c.mousedown(function(e) {
      e.preventDefault();
      d = !0;
      pos_startx = a = parseInt(g.value || 0);
      pos_starty = posy = parseInt(h.value || 0);
      mouse_startx = e.pageX;
      mouse_starty = e.pageY;
    }).on("mouseleave mouseup", function(a) {
      a.preventDefault();
      d = !1;
    }).mousemove(function(e) {
      d && (a = pos_startx + e.pageX - mouse_startx, e = posy = pos_starty + e.pageY - mouse_starty, g.value = a, h.value = e);
    });
  }
  function y(a, d, e) {
    delete b.src;
    b.src = a;
    c.css({"background-image":'url("' + $gp.htmlchars(b.src) + '")'});
    $("#gp_current_image img").attr("src", b.src);
    0 < d && 0 < e && (m.value = d, n.value = e);
  }
  function D() {
    var a = $("#gp_upload_form");
    a.attr("action");
    a.find(".file").auto_upload({start:function(a, e) {
      e.bar = $('<a data-cmd="gp_file_uploading">' + a + "</a>").appendTo("#gp_upload_queue");
      return !0;
    }, progress:function(a, e, b) {
      a = Math.round(100 * a);
      a = Math.min(98, a - 1);
      b.bar.text(a + "% " + e);
    }, finish:function(a, b, c) {
      c = c.bar;
      c.text("100% " + b);
      var f = $(a);
      a = f.find(".status").val();
      f = f.find(".message").val();
      "success" == a ? (c.addClass("success"), c.slideUp(1200), b = $("#gp_gallery_avail_imgs"), $(f).appendTo(b)) : "notimage" == a ? c.addClass("success") : (c.addClass("failed"), c.text(b + ": " + f));
    }, error:function(a, b, c) {
      alert("error: " + c);
    }});
  }
  function E(a) {
    a.preventDefault();
    a = $(this).stop(!0, !0);
    var b = a.data("width"), c = a.data("height");
    y(a.attr("href"), b, c);
    g.value = 0;
    h.value = 0;
  }
  function F() {
    var a = $("<img>").css({height:"auto", width:"auto", padding:0}).attr("src", b.src).appendTo("body");
    m.value = a.width();
    n.value = a.height();
    g.value = 0;
    h.value = 0;
    a.remove();
  }
  var x = null, c = null, w = "", m = null, n = null, g = null, h = null;
  k = l = r = q = 0;
  var z = null;
  this.save_path = gp_editing.get_path(p);
  c = gp_editing.get_edit_area(p);
  x = c.get(0);
  c.addClass("gp_image_edit");
  var b = {src:c.attr("src"), posx:0, posy:0, width:0, height:0};
  f.orig_src && (b.src = f.orig_src, b.posx = f.posx, b.posy = f.posy, b.width = f.attributes.width, b.height = f.attributes.height);
  var G = strip_from(this.save_path, "?") + "?cmd=image_editor";
  $gp.jGoTo(G);
  this.SaveData = t;
  this.checkDirty = function() {
    return w != t() ? !0 : !1;
  };
  this.resetDirty = function() {
    w = t();
  };
  this.wake = function() {
    z = window.setInterval(A, 100);
    $gp.response.image_options_loaded = B;
    $gp.response.gp_gallery_images = D;
    $gp.links.show_uploaded_images = function() {
      LoadImages(!1);
    };
    $gp.links.gp_gallery_add = E;
    $gp.links.deafult_sizes = F;
    $gp.$win.resize();
  };
  this.sleep = function() {
    window.clearInterval(z);
  };
}
function gp_init_inline_edit(p, f, k) {
  $gp.LoadStyle("/include/css/inline_image.css");
  $gp.loaded();
  gp_editing.editor_tools();
  gp_editor = new ImageEditor(p, f);
}
;