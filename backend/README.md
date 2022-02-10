deploy to heroku

# in backend folder

```
docker buildx build --platform linux/amd64 -t registry.heroku.com/poemist-django/web .   &&   docker push registry.heroku.com/poemist-django/web   &&   heroku container:release -a poemist-django web   &&   heroku open -a poemist-django

```

load seed data

```
heroku run python manage.py migrate -a poemist-django

heroku run python manage.py loaddata db/fixtures/seed_data.json -a poemist-django

heroku logs --tail -a poemist-django
```
