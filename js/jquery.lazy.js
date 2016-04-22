define(['jquery', 'jquery.mobile.custom', 'app/jquery.i18n'], function($) {
  'use strict';

  $.lazy = {
    init: function() {
      $('.lazy-js').lazy();
    }
  };

  $.fn.lazy = function() {
    this.each(function() {
      var $el = $(this).hide();
      var $curtain = $el.next('.curtain');
      var $trigger = $curtain.find('.trigger');
      if (!$trigger.length) {
        $trigger = $curtain;
      }
      var load = $.noop;
      var didLoad = false;
      if ($el.is('iframe')) {
        load = function(lang) {
          if ($.i18n) {
            lang = (lang != null) ? lang : $.i18n.lang();
          }
          var srcKey = (lang != null) ? 'src-'+lang.toLowerCase() : 'src';
          var src = $el.data(srcKey);
          if (src != null) {
            $el.attr('src', src);
          }
        };
      }
      $trigger.one('vclick', function() {
        load();
        didLoad = true;
        $curtain.fadeOut(function() {
          $el.fadeIn();
        });
      });
      $('html').on('lang.i18n', function(e, lang) {
        if (!didLoad) { return; }
        load(lang);
      });
    });
    return this;
  };

  return $.lazy;
});
