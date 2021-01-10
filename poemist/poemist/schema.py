import graphene
from graphene_django import DjangoObjectType
from db.gql_types import BookType
from db.models import Book


class Query(graphene.ObjectType):
    hello = graphene.String(default_value="Hi!")
    book = graphene.Field(BookType)

    def resolve_book(parent, info):
        return Book.objects.first()

schema = graphene.Schema(query=Query)
