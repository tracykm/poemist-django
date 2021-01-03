from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    author = models.CharField(max_length=30)
    title = models.CharField(max_length=30)
    text = models.TextField()


class Poem(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    passage = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    color_range = models.IntegerField(default=0)
    background_id = models.IntegerField(default=1)

class SelectedText(models.Model):
    poem = models.ForeignKey(Poem, on_delete=models.CASCADE)
    start_idx = models.IntegerField()
    end_idx = models.IntegerField()