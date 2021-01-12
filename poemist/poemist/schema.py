import graphene
from graphene_django import DjangoObjectType
from db.gql_types import BookType, PoemType, UserType, InputTextChunkType
from db.models import Book, Poem
from django.contrib.auth.models import User
from graphene_django.debug import DjangoDebug

class CreatePoemMutation(graphene.Mutation):
    class Arguments:
        text_chunks = graphene.List(InputTextChunkType)
        book_id = graphene.String()

    # The class attributes define the response of the mutation
    poem = graphene.Field(PoemType)

    @classmethod
    def mutate(cls, root, info, text_chunks, book_id):
        poem = Poem.objects.create(passage="", book_id=book_id, author=User.objects.first())
        poem.save_text_chunks(text_chunks)
        return CreatePoemMutation(poem=poem)


class Mutation(graphene.ObjectType):
    create_poem = CreatePoemMutation.Field()

class Query(graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='_debug')
    hello = graphene.String(default_value="Hi!")

    book = graphene.Field(BookType)
    def resolve_book(parent, info):
        return Book.objects.first()

    poems = graphene.List(PoemType)
    def resolve_poems(parent, info):
        return Poem.objects.all()

    users = graphene.List(UserType)
    def resolve_users(parent, info):
        return User.objects.all()

schema = graphene.Schema(query=Query, mutation=Mutation)
