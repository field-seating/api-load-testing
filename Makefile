.PHONY: build

run: build
	k6 run build/app.bundle.js

docker-run: build
	docker run -v $(pwd)/build:/build loadimpact/k6 run /build/app.bundle.js

build:
	npm run webpack

clean:
	rm -f build/app.bundle.js
