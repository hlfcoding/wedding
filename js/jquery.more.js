define(['jquery', 'jquery.mobile.custom'], function($) {
  'use strict';

  $.more = {
    init: function() {
      $('.more-js:not([data-more-custom])').more();
    }
  };

  $.fn.more = function(on) {
    // TODO: Memory cleanup (see $.event.destroyed).
    on = (on != null) ? on : false;
    function initAsNeeded($el) {
      if ($el.data('more') != null) { return; }
      var $trigger  = $el.find('.trigger');
      var $detail   = $el.find('.detail');
      var $moreText = $trigger.find('.more');
      var $lessText = $trigger.find('.less');
      var api = {};
      api.toggle = function(on) {
        $moreText.toggle(!on);
        $detail.add($lessText).toggle(on);
      };
      $trigger.on('vclick', function(e) {
        $el.data('on', !$el.data('on'));
        api.toggle($el.data('on'));
        e.preventDefault();
      });
      $el.data('more', api);
    }
    this.each(function() {
      var $el = $(this);
      $el.data('on', on);
      initAsNeeded($el);
      var api = $el.data('more');
      api.toggle($el.data('on'));
    });
    return this;
  };

  return $.more;
});
