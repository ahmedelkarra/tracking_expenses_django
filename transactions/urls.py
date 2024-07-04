from django.urls import path
from .views import transactions_api,transactions_api_update



urlpatterns = [
    path('transactions/',transactions_api,name='transactions_api'),
    path('transactions/<str:id>',transactions_api_update,name='transactions_api_update'),
]