import graphene
from graphene_django import DjangoObjectType
from db.gql_types import BookType, PoemType
from db.models import Book, Poem
from graphene_django.debug import DjangoDebug


class Query(graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='_debug')
    hello = graphene.String(default_value="Hi!")
    book = graphene.Field(BookType)

    def resolve_book(parent, info):
        return Book.objects.first()

    poems = graphene.List(PoemType)
    def resolve_poems(parent, info):
        return Poem.objects.all()

schema = graphene.Schema(query=Query)
