from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

# For now, just a simple response
urlpatterns = [
    path('', views.api_root, name='api-root'),
]