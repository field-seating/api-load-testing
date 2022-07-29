#!/bin/bash

vus=30
duration=30
endpoint="${ENDPOINT:-"https://api-loadtest.fieldseating.com"}"
use_docker=0

while getopts 'v:d:c:k' OPTION; do
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
    k)
      echo "in k"
      use_docker=1
      ;;
    ?)
      echo "script usage: $(basename \$0) [-k] [-v 10] [-d 10s] [-c case]" >&2
      exit 1
      ;;
  esac
done

[[ -z ${entry_file+z} ]] && echo "please provide entry file by -c testcase.js" && exit 1

echo "options arg: vus: ${vus} | duration: ${duration}s"
echo "entry_file: $entry_file"
echo "endpoint: $endpoint"

npm run webpack --entry ${entry_file}

if [ $use_docker -eq 1 ]
then
  ENDPOINT=$endpoint docker run -v $(pwd)/build:/build loadimpact/k6 run /build/main.bundle.js
  exit 0
fi

ENDPOINT=$endpoint k6 run --vus ${vus} --duration "${duration}s" build/main.bundle.js
