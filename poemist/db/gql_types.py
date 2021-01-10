from graphene_django import DjangoObjectType
import graphene
from .models import Book

class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = (
            "id",
            "created_at",
            "updated_at",
            "author",
            "title",
            "text",
        )