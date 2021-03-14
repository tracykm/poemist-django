# pull official base image
FROM python:3.9-buster

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG 0

# install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .

# add and run as non-root user
RUN adduser myuser
USER myuser

# collect static files
# RUN python manage.py collectstatic --noinput

# run gunicorn
CMD gunicorn poemist.wsgi:application --bind 0.0.0.0:$PORT