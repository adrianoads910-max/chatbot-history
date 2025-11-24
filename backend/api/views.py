from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from .models import Thread, Message
from .serializers import ThreadSerializer, MessageSerializer


@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok", "message": "API is running"})


class ThreadListCreateView(generics.ListCreateAPIView):
    serializer_class = ThreadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Thread.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        thread_id = self.kwargs["thread_id"]
        return Message.objects.filter(thread_id=thread_id).order_by("created_at")

    def create(self, request, *args, **kwargs):
        thread_id = kwargs["thread_id"]
        thread = get_object_or_404(Thread, id=thread_id)

        if thread.user != request.user:
            return Response({"error": "Not allowed"}, status=403)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Mensagem do usuário
        user_msg = serializer.save(
            sender=request.user,
            thread=thread
        )

        # Resposta do bot
        bot_reply = f"Recebido: {user_msg.text}"

        Message.objects.create(
            thread=thread,
            sender=None,  # chatbot
            text=bot_reply
        )

        return Response({
            "user_message": MessageSerializer(user_msg).data,
            "bot_response": bot_reply
        }, status=201)
