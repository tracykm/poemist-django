# syntax=docker/dockerfile:1
FROM python:3.9-buster
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
CMD gunicorn poemist.wsgi:application --bind 0.0.0.0:$PORT
