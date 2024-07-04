from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('api/', include('user.urls')),
    path('api/', include('profile_user.urls')),
    path('api/', include('transactions.urls')),
]
