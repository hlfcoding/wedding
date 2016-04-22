#!/bin/bash

command -v sass >/dev/null 2>&1 || { echo 'sass not installed'; exit 1; }

sass -w css/main.scss
