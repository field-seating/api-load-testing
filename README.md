# API Load Testing

## Prerequisite
You should either install `k6` globally or docker on your local machine to run the script.

## How to use it
```sh
# run in global k8
bash run.sh -v 1 -d 5 -c src/get-spaces-photo.js

# run in doc**k**er
bash run.sh -v 1 -d 5 -c -k src/get-spaces-photo.js

# override the api endpoint
ENDPOINT="https://example.com" bash run.sh -v 1 -d 5 -c src/get-spaces-photo.js
```

## opts
- c: file name of test script

### Optional, refer to `Makefile` for default value
- v: numbers of virtual user
- d: duration

## Environment Variables
- ENDPOINT: API Endpoint
