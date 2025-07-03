.PHONY: run build

build:
	docker buildx build --no-cache --tag madebysteven .

run: build
	docker run -it -p 3000:80 madebysteven
