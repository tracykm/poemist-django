deploy to heroku

# in backend folder

```
docker build -t registry.heroku.com/calm-lowlands-48993/web .   &&   docker push registry.heroku.com/calm-lowlands-48993/web   &&   heroku container:release -a calm-lowlands-48993 web   &&   heroku open -a calm-lowlands-48993

```

load seed data

```
heroku run python manage.py migrate -a calm-lowlands-48993

heroku run python manage.py loaddata db/fixtures/seed_data.json -a calm-lowlands-48993

heroku logs --tail -a calm-lowlands-48993
```
