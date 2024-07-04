from django.urls import path
from .views import profile_api,logout_api


urlpatterns = [
    path('auth/me',profile_api,name='profile_api'),
    path('auth/me/logout',logout_api,name='logout_api'),
]
