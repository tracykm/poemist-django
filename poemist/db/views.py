# gql/views.py
from django.utils.functional import cached_property
from graphene_django.views import GraphQLView
from promise import Promise
from promise.dataloader import DataLoader
from db.models import SelectedText
from django.contrib.auth.models import User
from collections import defaultdict


class UserLoader(DataLoader):
    
    def batch_load_fn(self, ids):
        by_id = {item.id: item for item in User.objects.filter(id__in=ids)}
        return Promise.resolve([by_id[id] for id in ids])

class SelectedTextsLoader(DataLoader):
    
    def batch_load_fn(self, poem_ids):
        by_poem_id = defaultdict(list)
        for item in SelectedText.objects.filter(poem_id__in=poem_ids):
            by_poem_id[item.poem_id].append(item)
        print(f"{by_poem_id}   --- poem_ids {poem_ids}")
        return Promise.resolve([by_poem_id[id] for id in poem_ids])

class GQLContext:
    def __init__(self, request):
        self.request = request
    @cached_property
    def user_loader(self):
        return UserLoader()
    @cached_property
    def selected_texts_loader(self):
        return SelectedTextsLoader()

class CustomGraphQLView(GraphQLView):
    def get_context(self, request):
        return GQLContext(request)