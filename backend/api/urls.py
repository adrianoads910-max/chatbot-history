from django.urls import path
from .views import MessageListCreateView
from .views import MessageListCreateView, health_check

urlpatterns = [
    path('messages/', MessageListCreateView.as_view(), name='messages'),
    path('health/', health_check, name='health'),
]

