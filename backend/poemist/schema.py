import graphene
from graphene_django import DjangoObjectType
from db.gql_types import BookType, PoemType, UserType, InputTextChunkType
from db.models import Book, Poem
from django.contrib.auth.models import User
from graphene_django.debug import DjangoDebug
import graphql_jwt
import random


class PaginationType(graphene.ObjectType):
    total_count = graphene.Int()


class PomePaginationType(PaginationType):
    class Meta:
        gql_type = PoemType

    edges = graphene.List(PoemType)


#
class BookPassage(graphene.ObjectType):
    text = graphene.String()
    author = graphene.String()
    title = graphene.String()
    id = graphene.String()
    start_idx = graphene.Int()


class CreatePoemMutation(graphene.Mutation):
    class Arguments:
        text_chunks = graphene.List(InputTextChunkType)
        book_id = graphene.ID()
        start_idx = graphene.Int()

    # The class attributes define the response of the mutation
    poem = graphene.Field(PoemType)

    @classmethod
    def mutate(cls, root, info, text_chunks, book_id, start_idx):
        poem = Poem.objects.create(
            passage="", book_id=book_id, start_idx=start_idx, author=info.context.user
        )
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


class DeletePoemMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    id = graphene.String()

    @classmethod
    def mutate(cls, root, info, id):
        poem = Poem.objects.get(id=id)
        poem.delete()
        return DeletePoemMutation(id=id)


class CreateUserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        password = graphene.String()

    # The class attributes define the response of the mutation
    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username, password):
        user = User.objects.create(username=username, password=password)
        user.set_password(password)
        user.save()
        return CreateUserMutation(user=user)


class Mutation(graphene.ObjectType):
    create_poem = CreatePoemMutation.Field()
    update_poem = UpdatePoemMutation.Field()
    delete_poem = DeletePoemMutation.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    create_user = CreateUserMutation.Field()


class Query(graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name="_debug")
    hello = graphene.String(default_value="Hi!")

    random_book = graphene.Field(BookPassage)

    def resolve_random_book(self, info):
        PASSAGE_LEN = 1000
        book = Book.objects.order_by("?").first()
        start_idx = random.randint(0, len(book.text) - PASSAGE_LEN)
        return {
            "title": book.title,
            "author": book.author,
            "id": book.id,
            "text": book.text[start_idx : start_idx + PASSAGE_LEN],
            "start_idx": start_idx,
        }

    poem = graphene.Field(PoemType, id=graphene.ID(required=True))

    def resolve_poem(self, info, id):
        return Poem.objects.get(id=id)

    user = graphene.Field(UserType, id=graphene.ID(required=True))

    def resolve_user(self, info, id):
        return User.objects.get(id=id)

    poems = graphene.List(PoemType, author_id=graphene.ID(required=False))

    def resolve_poems(self, info, author_id=None):
        if author_id:
            return Poem.objects.filter(author_id=author_id)
        return Poem.objects.all()

    poem_pages = graphene.Field(
        PomePaginationType,
        offset=graphene.Int(required=False),
        limit=graphene.Int(required=False),
        author_id=graphene.ID(required=False),
    )

    def resolve_poem_pages(self, info, offset=0, limit=10, author_id=None):
        poems = Poem.objects.order_by("-created_at")
        if author_id:
            poems = poems.filter(author_id=author_id)
        total_count = poems.count()
        return {"edges": poems[offset : offset + limit], "total_count": total_count}

    users = graphene.List(UserType)

    def resolve_users(self, info):
        return User.objects.all()

    current = graphene.Field(UserType)

    def resolve_current(self, info):
        if info.context.user.username:
            return info.context.user
        else:
            return None


schema = graphene.Schema(query=Query, mutation=Mutation)
