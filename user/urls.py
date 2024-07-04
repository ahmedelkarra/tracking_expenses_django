from django.urls import path
from .views import register_api,login_api

urlpatterns = [
    path('auth/register/',register_api,name='register_api'),
    path('auth/login/',login_api,name='login_api'),
]