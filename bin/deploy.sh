#!/bin/bash

server_side=false

while getopts ':s' opt; do
  case $opt in
    s) server_side=true
      ;;
    \?) echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done

if [ "$server_side" = true ]; then
  rm -rf {fonts,img,node_modules}/*
  exit 0
fi

command -v aws >/dev/null 2>&1 || { echo 'aws not installed'; exit 1; }

s3_root=s3://pengxwang/wedding

aws s3 sync fonts "$s3_root/fonts" --acl public-read --delete
aws s3 sync img "$s3_root/img" --acl public-read --delete

