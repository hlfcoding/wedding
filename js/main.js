/*global requirejs */
(function() {
  "use strict";
  requirejs.config({
    baseUrl: 'js/vendor',
    paths: { app: '..' },
    shim: {
      'jquery.scrollTo': { deps: ['jquery'] },
      'jquery.localScroll': { deps: ['jquery', 'jquery.scrollTo'] },
      'jquery.stalker': { deps: ['jquery'] },
    }
  });
}());
define([
  'console',
  'jquery',
  'underscore',
  'jquery.mobile.custom', // FIXME
  // Only non-exports after this point.
  'jquery.scrollTo',
  'jquery.localScroll',
  'jquery.stalker',
  'app/jquery.more',
  'app/jquery.lazy',
  'app/jquery.i18n',
  ],
function(console, $, _, jqm) {
  "use strict";
  var DEBUG = true;
  var BASE_LEAD = parseInt($('body').css('line-height'), 10);
  var SCREEN_SIZES = {
    1: 480,
    2: 1024,
    3: 1140};
  var MIN_READY_HEIGHT = 2500;
  var ASSET_ROOT = 'http://pengxwang.s3.amazonaws.com/wedding';
  if (!DEBUG) {
    $.noConflict();
    _.noConflict();
  }
  var $header = $('.header-container');
  var $headings = $('.heading');
  var $nav = $('#nav');
  var $title = $('#title');
  var screen_size;
  var $page = $('body');
  // Setup header.
  $header
    .find('[href], [data-href]').on('vclick', function(e) {
      var href = $(this).attr('href') || $(this).data('href');
      var $heading = $(href);
      // TODO: Reinstate.
      /*
      var offsetTop = $header.height();
      if ($heading.index(0) === 0) {
        offsetTop += BASE_LEAD * 2;
      }
      */
      $headings.removeClass('current');
      $heading.addClass('current');
      e.preventDefault();
    }).end()
    .localScroll({
      duration: 400,
      event: 'vclick'
    });
  // Setup nav.
  $(window)
    .on('resize', _.debounce(function() {
      var first_time = screen_size == null;
      var prev_screen_size = screen_size;
      var prev_val = 0;
      _.each(SCREEN_SIZES, function(val) {
        screen_size = Modernizr.mq('only screen and (min-width: '+prev_val+'px) and (max-width: '+val+'px)') ?
                      val : screen_size;
        prev_val = val;
      });
      if (first_time || screen_size !== prev_screen_size) {
        $(window).trigger('screen-size');
      }
    }, 30))
    .on('screen-size', function() {
      if (screen_size !== SCREEN_SIZES['1']) {
        $nav.add($title).stalker({
          startCallback: function() { $(this).addClass('stalking'); },
          stopCallback: function() { $(this).removeClass('stalking'); }
        });
      }
      // TODO: Support stalker teardown.
      $nav.more(screen_size !== SCREEN_SIZES['1']);
    })
    .trigger('resize');
  // Rendering.
  var failures = 0;
  function makeDelayedOnReady() {
    return function(){
      _.delay(function() {
        if ($page.height() < MIN_READY_HEIGHT && failures < 10) {
          makeDelayedOnReady()();
          failures++;
          return;
        }
        $page.addClass('ready');
      }, 300);
    };
  }
  $(window)
    .on('ready.i18n', makeDelayedOnReady());
  // Fill in html.
  $('[data-current-year]').each(function(){
    var $el = $(this);
    var year = (new Date()).getFullYear();
    if ($el.data('range-start-year') === year) {
      $el.remove();
      return;
    }
    $el.text($el.text()+year);
  });
  $('img[data-src]').each(function(){
    var $img = $(this);
    $img
      .load(function() { $img.show(); })
      .attr('src', ASSET_ROOT+'/'+$img.data('src'));
  });
  $('a[data-webcal]').each(function(){
    var $a = $(this);
    $a.attr('href', 'webcal://'+location.hostname+'/'+$a.data('webcal'));
  });

  // Default plugin initialization.
  $.i18n.init();
  $.lazy.init();
  $.more.init();
});
