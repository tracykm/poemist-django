up:
	docker-compose up --detach

format:
	docker-compose exec -T api black --check .

migrate:
	docker-compose run --rm api python manage.py migrate

reset:
	docker-compose down --volumes && docker-compose up --detach --build && make migrate && make seed_data

seed_data:
	docker-compose run api python manage.py loaddata db/fixtures/seed_data.json

check_migrations:
	docker-compose run --rm api python manage.py makemigrations --check --dry-run

cypress:
	docker-compose run --rm cypress npx cypress run
	
