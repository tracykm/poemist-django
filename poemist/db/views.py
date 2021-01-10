# gql/views.py
from django.utils.functional import cached_property
from graphene_django.views import GraphQLView
from promise import Promise
from promise.dataloader import DataLoader
from django.contrib.auth.models import User


class UserLoader(DataLoader):
    
    def batch_load_fn(self, ids):
        by_id = {user.id: user for user in User.objects.filter(id__in=ids)}
        return Promise.resolve([by_id[id] for id in ids])

class GQLContext:
    def __init__(self, request):
        self.request = request
    @cached_property
    def user_loader(self):
        return UserLoader()

class CustomGraphQLView(GraphQLView):
    def get_context(self, request):
        return GQLContext(request)