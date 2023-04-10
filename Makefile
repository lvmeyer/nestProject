
.PHONY: dev


dev:
	docker compose up -d

test:
	docker-compose exec node npm run test