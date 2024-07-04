from django.urls import path
from .views import main_view

urlpatterns = [
    path('', main_view, name='main_view'),
    path('register/', main_view, name='register_view'),
    path('login/', main_view, name='login_view'),
    path('profile/', main_view, name='login_view'),
]
