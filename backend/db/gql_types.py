from graphene_django import DjangoObjectType
import graphene
from .models import Book, Poem
from django.contrib.auth.models import User
class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
            "id",
            "date_joined",
            "email",
            "username",
            "session_token"
            "first_name",
            "poems",
        )
    poems_written_count = graphene.Int()

    def resolve_poems_written_count(parent, info):
        return parent.poems.count()

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
class InputTextChunkType(graphene.InputObjectType):
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
            "book"
        )
    text_chunks = graphene.List(TextChunkType)


    def resolve_text_chunks(parent, info):
        return info.context.selected_texts_loader.load(parent.id).then(lambda selected_texts: parent.text_chunks(selected_texts))

    author = graphene.Field(lambda: UserType)

    def resolve_author(parent, info):
        return info.context.user_loader.load(parent.author_id)
