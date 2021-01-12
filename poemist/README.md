deploy to heroku

# in backend folder

```
docker build -t registry.heroku.com/calm-lowlands-48993/web .   &&   docker push registry.heroku.com/calm-lowlands-48993/web   &&   heroku container:release -a calm-lowlands-48993 web   &&   heroku run python manage.py migrate -a calm-lowlands-48993   &&   heroku open -a calm-lowlands-48993

```

or
