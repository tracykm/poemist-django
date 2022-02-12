up:
	docker-compose up --detach

format:
	docker-compose --env-file=${test_env_file} exec -T ${service_name} black --check .
