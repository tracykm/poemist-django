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


class UpdatePoemMutation(graphene.Mutation):
    class Arguments:
        text_chunks = graphene.List(InputTextChunkType)
        id = graphene.ID()
        background_id = graphene.Int(required=False)
        color_range = graphene.Int(required=False)

    poem = graphene.Field(PoemType)

    @classmethod
    def mutate(cls, root, info, text_chunks, id, background_id=None, color_range=None):
        poem = Poem.objects.get(id=id)
        if background_id:
            poem.background_id = background_id
        if color_range:
            poem.color_range = color_range
        poem.selected_texts.all().delete()
        poem.save_text_chunks(text_chunks)
        poem.save()
        return UpdatePoemMutation(poem=poem)


class Mutation(graphene.ObjectType):
    create_poem = CreatePoemMutation.Field()
    update_poem = UpdatePoemMutation.Field()

class Query(graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='_debug')
    hello = graphene.String(default_value="Hi!")

    random_book = graphene.Field(BookType)
    def resolve_random_book(parent, info):
        return Book.objects.order_by("?").first()

    poem = graphene.Field(PoemType, id=graphene.ID(required=True))
    def resolve_poem(parent, info, id):
        return Poem.objects.get(id=id)

    user = graphene.Field(UserType, id=graphene.ID(required=True))
    def resolve_user(parent, info, id):
        return User.objects.get(id=id)

    poems = graphene.List(PoemType, author_id=graphene.ID(required=False))
    def resolve_poems(parent, info, author_id=None):
        if (author_id):
            return Poem.objects.filter(author_id=author_id)
        return Poem.objects.all()

    users = graphene.List(UserType)
    def resolve_users(parent, info):
        return User.objects.all()

    current = graphene.Field(UserType)
    def resolve_current(parent, info):
        return User.objects.first()

schema = graphene.Schema(query=Query, mutation=Mutation)
