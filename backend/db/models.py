from django.db import models
from django.contrib.auth.models import User
from typing import TypedDict


class Book(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    author = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    text = models.TextField()


class TextChunkDict(TypedDict):
    text: str
    is_selected: bool


class SelectedTextDict(TypedDict):
    start_idx: int
    end_idx: int



class Poem(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    passage = models.TextField()
    start_idx = models.IntegerField(null=True)  # where the passage is from in Book.text
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="poems")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="poems")
    color_range = models.IntegerField(default=0)
    background_id = models.IntegerField(default=1)

    def text_chunks(self, selected_texts):
        if len(selected_texts) == 0:
            return []
        result = [
            {
                "text": self.passage[0 : selected_texts[0].start_idx],
                "is_selected": False,
            }
        ]
        for idx, s in enumerate(selected_texts):
            result.append(
                {"text": self.passage[s.start_idx : s.end_idx], "is_selected": True}
            )
            try:
                result.append(
                    {
                        "text": self.passage[
                            s.end_idx : selected_texts[idx + 1].start_idx
                        ],
                        "is_selected": False,
                    }
                )
            except:
                result.append(
                    {
                        "text": self.passage[s.end_idx : len(self.passage)],
                        "is_selected": False,
                    }
                )
                pass  # last will error and shouldn't be added

        return result

    def get_selected_texts(self, text_chunks: list[TextChunkDict]):
        selected_texts: list[SelectedTextDict] = []
        start_idx = 0
        passage = ""
        for text_chunk in text_chunks:
            end_idx = start_idx + len(text_chunk["text"])
            passage += text_chunk["text"]
            if text_chunk["is_selected"]:
                selected_texts.append({"start_idx": start_idx, "end_idx": end_idx})
            start_idx = end_idx
        return [selected_texts, passage]

    def save_text_chunks(self, text_chunks: list[TextChunkDict]):
        [selected_texts, passage] = self.get_selected_texts(text_chunks)
        self.passage = passage
        self.save()
        for selected_text in selected_texts:
            SelectedText.objects.create(
                start_idx=selected_text["start_idx"],
                end_idx=selected_text["end_idx"],
                poem=self,
            )


class SelectedText(models.Model):
    poem = models.ForeignKey(
        Poem, on_delete=models.CASCADE, related_name="selected_texts"
    )
    start_idx = models.IntegerField()
    end_idx = models.IntegerField()

    def __str__(self):
        return f"({self.id}) {self.start_idx}-{self.end_idx}"
