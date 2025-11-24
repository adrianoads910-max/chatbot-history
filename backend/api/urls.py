from django.urls import path
from .views import ThreadListCreateView, MessageListCreateView, health_check, delete_history
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("health/", health_check),

    # JWT
    path("token/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),

    # Threads
    path("threads/", ThreadListCreateView.as_view()),
    path("threads/clear/", delete_history),


    # Mensagens dentro da thread
    path("threads/<int:thread_id>/messages/", MessageListCreateView.as_view()),
]
