up:
	docker-compose up --detach

format:
	docker-compose exec -T api black --check .

migrate:
	docker-compose run --rm api python manage.py migrate

reset:
	docker-compose down --volumes && make up && make migrate

seed_data:
	docker-compose run api python manage.py loaddata db/fixtures/seed_data.json

check_migrations:
	docker-compose run --rm api python manage.py makemigrations --check --dry-run
