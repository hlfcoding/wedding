#!/bin/bash
# shellcheck disable=SC2086
{
root=$(pwd)
src=$root/node_modules

dest=$root/css/vendor
cp -v $src/hlf-css/dist/scss/imports/* "$dest/"
cp -v $src/hlf-css/lib/modified/{_normalize,html5-boilerplate/_{base,helpers,print}}.scss $dest/

dest=$root/js/vendor
cp -v $src/{requirejs/require,jquery.cookie/jquery.cookie}.js $dest
cp -v $src/jquery/dist/jquery.min.js $dest/jquery.js
cp -v $src/jquery.localscroll/jquery.localScroll.min.js $dest/jquery.localScroll.js
cp -v $src/jquery.scrollto/jquery.scrollTo.min.js $dest/jquery.scrollTo.js
cp -v $src/underscore/underscore-min.js $dest/underscore.js

cd $dest || exit
curl -O https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js \
     -O https://raw.githubusercontent.com/box/stalker/master/jquery.stalker.js
}
