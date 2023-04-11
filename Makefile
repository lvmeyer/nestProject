.PHONY: dev test stop


dev:
	docker compose up -d

test:
	docker-compose exec node npm run test

stop:
	docker-compose down --volumes