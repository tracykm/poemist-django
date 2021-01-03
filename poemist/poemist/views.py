from django.http import JsonResponse
from django.contrib.auth.models import User


def ping(request):
    data = {'ping': User.objects.first().email}
    return JsonResponse(data)