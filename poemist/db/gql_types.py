from graphene_django import DjangoObjectType
import graphene
from .models import Book, Poem

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

class TextChunkType(graphene.ObjectType):
    text = graphene.String()
    is_selected = graphene.Boolean()

class PoemType(DjangoObjectType):
    class Meta:
        model = Poem
        fields = (
            "id",
            "created_at",
            "updated_at",
            "passage",
            "author",
            "color_range",
            "background_id",
        )
    text_chunks = graphene.List(TextChunkType)


    def resolve_text_chunks(parent, info):
        return parent.text_chunks()
