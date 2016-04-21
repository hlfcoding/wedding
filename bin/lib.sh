#!/bin/bash

# Run from site/ root.

cd js/vendor

curl -O https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js \
     -O http://modernizr.com/downloads/modernizr.js \
     -O https://raw.github.com/amdjs/underscore/master/underscore.js \
     -O https://raw.github.com/jrburke/requirejs/master/require.js \
     https://raw.github.com/flesler/jquery.scrollTo/master/jquery.scrollTo.js -o 'jquery.scroll-to.js' \
     https://raw.github.com/flesler/jquery.localScroll/master/jquery.localScroll.js -o 'jquery.local-scroll.js' \
     -O https://raw.github.com/box/stalker/master/jquery.stalker.js \
     -O https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
cd - || exit

cd node_modules || exit

cp hlf-css/dist/scss/imports/* ../css/vendor
cp hlf-css/lib/modified/{_normalize,html5-boilerplate/_{base,helpers,print}}.scss ../css/vendor

cd - || exit
