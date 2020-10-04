project-name = frontend

download:
	git pull

build:
	npx nuxt build

start:
	npx pm2 start npm --name $(project-name)  -- run start

delete:
	npx pm2 delete $(project-name)

fast-build: download build delete start
