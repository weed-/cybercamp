#!make
include .env
export $(shell sed 's/=.*//; s/\#.*//' .env)

API_PROTOCOL=https
API_URL=pusher.${BASE_DOMAIN}
UPLOADER_URL=uploader.${BASE_DOMAIN}
ADMIN_URL=admin.${BASE_DOMAIN}

export API_PROTOCOL
export API_URL
export UPLOADER_URL
export ADMIN_URL

.PHONY: init
init: .env
	@cp .env workadventure
	@cp front/dist/index.html.tmpl workadventure/front/dist/index.html.tmpl
	@cd workadventure && make init

.env:
	@echo "please create .env file from .env.template"
	@exit 1

.PHONY: front
front: .env
	@cp .env workadventure
	@cp front/dist/index.html.tmpl workadventure/front/dist/index.html.tmpl
	@cd workadventure && make front

.PHONY: run
run: .env
	docker-compose up
