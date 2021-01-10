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
    start_idx = models.IntegerField(null=True) # where the passage is from in Book.text
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='poems')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='poems')
    color_range = models.IntegerField(default=0)
    background_id = models.IntegerField(default=1)
    
    def text_chunks(self):
        selected_texts = self.selected_texts.order_by("start_idx").all()
        result = [{"text": self.passage[0: selected_texts[0].start_idx], "is_selected": False}]
        for idx, s in enumerate(selected_texts):
            result.append({ "text": self.passage[s.start_idx: s.end_idx], "is_selected": True })
            try:
                result.append({ "text": self.passage[s.end_idx: selected_texts[idx + 1].start_idx], "is_selected": False })
            except:
                pass # last will error and shouldn't be added
        return result

class SelectedText(models.Model):
    poem = models.ForeignKey(Poem, on_delete=models.CASCADE, related_name='selected_texts')
    start_idx = models.IntegerField()
    end_idx = models.IntegerField()

    def __str__(self):
        return f"({self.id}) {self.start_idx}-{self.end_idx}"