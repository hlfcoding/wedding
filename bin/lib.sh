#!/bin/bash

cd js/vendor || exit

curl -O https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js \
     -O https://raw.githubusercontent.com/box/stalker/master/jquery.stalker.js \

cd - || exit

cd node_modules || exit

cp hlf-css/dist/scss/imports/* ../css/vendor
cp hlf-css/lib/modified/{_normalize,html5-boilerplate/_{base,helpers,print}}.scss ../css/vendor

cp jquery/dist/jquery.min.js ../js/vendor/jquery.js
cp jquery.localscroll/jquery.localScroll.min.js ../js/vendor/jquery.localScroll.js
cp jquery.scrollto/jquery.scrollTo.min.js ../js/vendor/jquery.scrollTo.js
cp underscore/underscore-min.js ../js/vendor/underscore.js

cp {requirejs/require,jquery.cookie/jquery.cookie}.js ../js/vendor

cd - || exit
