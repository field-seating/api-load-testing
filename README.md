# API Load Testing

## Prerequisite
You should either install `k6` globally or docker on your local machine to run the script.

## How to use it
```sh
# run in global k8
VUS=60 DURATION=30s CASE=get-spaces-photo make run

# run in docker
CASE=get-spaces-photo make docker-run
```

## Environment Variables
- CASE: file name of test script in src/

### Optional, refer to `Makefile` for default value
- VUS: numbers of virtual user
- DURATION: duration
- ENDPOINT: api endpoint
