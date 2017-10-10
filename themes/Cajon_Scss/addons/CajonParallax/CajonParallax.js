var CajonParallax = {breakpoint:768, init:function() {
  var c = $(window).innerWidth(), e = $(window).innerHeight();
  $(".cajon-parallax-image.scroll-parallax.scaling-cover").each(function() {
    var a = $(this), b = a.find("img"), c = a.attr("data-halign") || 50;
    b.css({width:"auto", height:"auto"});
    var d = a.width() / a.height();
    b.width() / b.height() > d ? b.css("height", a.height() + "px").css({"margin-left":(a.width() - b.width()) * (c / 100) + "px", "margin-top":"0"}) : b.css("width", a.width() + "px").css({"margin-left":"0", "margin-top":(a.height() - b.height()) / 2 + "px"});
    a = (a.attr("data-scroll-speed") || 50) / 100;
    a += (1 - a) * (e / b.height());
    b.attr("data-scale", 1 > a ? 1 : a);
  });
  $(".cajon-parallax-image.scroll-fixed.scaling-cover").each(function() {
    var a = $(this), b = a.width(), f = a.offset().left, d = a.find("img"), g = d.height();
    d = d.width();
    var h = d / g, l = c / e, k = a.attr("data-halign") || 50;
    a.css("background-position", f * (100 - k) / 100 + k / 100 * (f + b - (h > l ? e / g * d : c)) + "px 50%");
  });
}, scroll:function() {
  if (!($(window).innerWidth() <= CajonParallax.breakpoint)) {
    var c = $(window).innerHeight(), e = $(window).scrollTop();
    $(".cajon-parallax-image.scroll-parallax.scaling-cover").each(function() {
      var a = $(this), b = a.height(), f = a.offset().top;
      if (!(f - e > c || 0 > f + b - e)) {
        var d = a.find("img"), g = a.attr("data-halign") || 50, h = (a.attr("data-scroll-speed") || 50) / 100;
        a = d.attr("data-scale") || 1;
        b = (c / 2 - (f + b / 2 - e)) * (1 - h) + "px";
        d.css({"-webkit-transform-origin":g + "% 50%", "-ms-transform-origin":g + "% 50%", "transform-origin":g + "% 50%", "-webkit-transform":"translateY(" + b + ") scale(" + a + ")", "-ms-transform":"translateY(" + b + ") scale(" + a + ")", transform:"translateY(" + b + ") scale(" + a + ")"});
      }
    });
    $(".cajon-parallax-image.scroll-parallax.scaling-tile").each(function() {
      var a = e * (1 - ($(this).attr("data-scroll-speed") || 50) / 100), b = $(this).attr("data-halign") || 50;
      $(this).css("background-position", b + "% " + a + "px");
    });
  }
}};
$(window).on("load", function() {
  var c = window.navigator.userAgent;
  if ("WebkitAppearance" in document.documentElement.style) {
    if (-1 !== c.indexOf("Chrome/") && 49 <= parseInt(c.substr(c.indexOf("Chrome/") + 7, 2))) {
      return;
    }
    $.scrollSpeed(80, 800);
  }
  (0 < c.indexOf("MSIE ") || 0 < c.indexOf("Trident/") || 0 < c.indexOf("Edge/")) && $.scrollSpeed(80, 800);
});
$(window).on("load resize", function() {
  window.innerWidth <= CajonParallax.breakpoint ? $(".cajon-parallax-image.scroll-parallax, .cajon-parallax-image.scroll-fixed").addClass("scroll-static") : ($(".cajon-parallax-image.scroll-parallax.scroll-static, .cajon-parallax-image.scroll-fixed").removeClass("scroll-static"), CajonParallax.init(), CajonParallax.scroll());
});
$(window).on("scroll", CajonParallax.scroll);
