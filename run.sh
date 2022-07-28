#!/bin/bash

vus=30
duration=30
endpoint="${ENDPOINT:-"https://api-staging.fieldseating.com"}"

while getopts 'v:d:c:' OPTION; do
  case "$OPTION" in
    v)
      vus="$OPTARG"
      ;;
    d)
      duration="$OPTARG"
      ;;
    c)
      DIR_PATH=$(cd $(dirname "$OPTARG") && pwd)
      path=$DIR_PATH/$(basename "$OPTARG")

      entry_file=$path
      ;;
    ?)
      echo "script usage: $(basename \$0) [-v 10] [-d 10s] [-c case]" >&2
      exit 1
      ;;
  esac
done

[[ -z ${entry_file+z} ]] && echo "please provide entry file by -c testcase.js" && exit 1

echo "options arg: vus: ${vus} | duration: ${duration}s"
echo "entry_file: $entry_file"
echo "endpoint: $endpoint"

npm run webpack --entry ${entry_file}

ENDPOINT=$endpoint k6 run --vus ${vus} --duration "${duration}s" build/main.bundle.js
