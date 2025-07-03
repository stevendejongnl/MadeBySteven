.PHONY: run build

build:
	docker buildx build --tag madebysteven .

run: build
	docker run -it -p 3000:80 madebysteven
