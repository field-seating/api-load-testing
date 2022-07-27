.PHONY: build

VUS ?= 30
DURATION ?= 30s
ENDPOINT ?= https://api-staging.fieldseating.com

run: build
	ENDPOINT=${ENDPOINT} k6 run --vus ${VUS} --duration ${DURATION} build/app.bundle.js

docker-run: build
	ENDPOINT=${ENDPOINT} docker run -v $(pwd)/build:/build loadimpact/k6 run /build/app.bundle.js

build:
	npm run webpack

clean:
	rm -f build/app.bundle.js
