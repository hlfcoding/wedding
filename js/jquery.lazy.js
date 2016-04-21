define(['jquery', 'jquery.mobile.custom', 'app/jquery.i18n'], function($, jqm) {
  "use strict";
  $.lazy = {};
  $.fn.lazy = function() {
    this.each(function() {
      var $el = $(this).hide();
      var $curtain = $el.next('.curtain');
      var $trigger = $curtain.find('.trigger');
      if (!$trigger.length) {
        $trigger = $curtain;
      }
      var load = $.noop;
      var did_load = false;
      if ($el.is('iframe')) {
        load = function(lang) {
          if ($.i18n) {
            lang = (lang != null) ? lang : $.i18n.lang();
          }
          var src_key = (lang != null) ? 'src-'+lang.toLowerCase() : 'src';
          var src = $el.data(src_key);
          if (src != null) {
            $el.attr('src', src);
          }
        };
      }
      $trigger.one('vclick', function() {
        load();
        did_load = true;
        $curtain.fadeOut(function() {
          $el.fadeIn();
        });
      });
      $('html').on('lang.i18n', function(e, lang) {
        if (!did_load) { return; }
        load(lang);
      });
    });
    return this;
  };
  $(function() {
    $('.lazy-js').lazy();
  });
  return $.lazy;
});
