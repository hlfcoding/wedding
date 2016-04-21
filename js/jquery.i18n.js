define(['jquery', 'jquery.mobile.custom', 'jquery.cookie'], function($, jqm) {
  "use strict";
  var $context = $('html');
  var is_ready = false;
  $.fn.i18n = function(persistent){
    persistent = (persistent != null) ? persistent : true;
    var $el = this;
    // Bind to language changes.
    $context.on('lang.i18n', function(e, lang){
      $el.find('[data-lang]')
        .hide()
        .filter('[data-lang='+lang+']').show();
      $.cookie('lang', lang);
      if (!is_ready) {
        is_ready = true;
        $el.trigger('ready.i18n');
      }
    });
    return this;
  };
  $.i18n = {
    setupMenu: function() {
      // Menu UI.
      var $menu = $('#i18n');
      var $labels = $menu.find('label');
      if (!$labels.length) { return; }
      // Change language.
      function select($label) {
        $labels.removeClass('selected');
        $label
          .addClass('selected')
          .find(':radio').attr('checked', true);
        return $label;
      }
      $labels.on('vclick', function() {
        var $label = $(this);
        select($label).trigger('lang.i18n', [ $label.find('input').val() ]);
      });
      // Sync with state.
      $context.on('ready.i18n', function(e) {
        _.delay(function() {
          select($menu.find('[value="'+$.i18n.lang()+'"]').closest('label'));
        }, 300);
      });
    },
    lang: function() { return $context.attr('lang'); }
  };
  $(function() {
    var ns = $.i18n;
    // Initialize.
    $context
      .on('lang.i18n', function(e, lang) {
        $(this).attr('lang', lang);
      })
      .i18n();
    ns.setupMenu();
    var lang = $.cookie('lang') || $.i18n.lang();
    if (lang != null) {
      // Initial language.
      $context.trigger('lang.i18n', [ lang ]);
    }
  });
});
