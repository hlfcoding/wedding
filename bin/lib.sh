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

cd -
cd css/vendor

curl https://raw.github.com/necolas/normalize.css/master/normalize.css -o normalize.scss \
     -O https://raw.github.com/hlfcoding/hlf-css/misc/mixins.scss \
     -O https://raw.github.com/hlfcoding/hlf-css/misc/bootstrap.scss \
     -O https://raw.github.com/hlfcoding/hlf-css/misc/boilerplate.scss \
     -O https://raw.github.com/hlfcoding/hlf-css/misc/boilerplate-print.scss \
     -O https://raw.github.com/hlfcoding/hlf-css/misc/helpers.scss
cd -
