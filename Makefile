.PHONY: all
all: build

.PHONY: build
build: build-app build-cv

.PHONY: build-app
build-app:
	npm run build

.PHONY: build-cv
build-cv:
	./scripts/render-cv-pdf.js

.PHONY: release
release:
	rm -rf $(wildcard ./release/superpaintman.com/*)
	cp -r $(wildcard ./public/*) ./release/superpaintman.com
	(cd ./release/superpaintman.com && git add .)
	(cd ./release/superpaintman.com && git commit -m "Site updated: $(shell date -u +'%Y-%m-%d %H:%M:%S')")
	(cd ./release/superpaintman.com && git push origin gh-pages)
