from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404
from .models import Thread, Message
from .serializers import ThreadSerializer, MessageSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions


@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok", "message": "API is running"})

@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def delete_history(request):
    Thread.objects.filter(user=request.user).delete()
    return Response({"message": "Histórico apagado com sucesso!"})


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

        # Resposta diferenciada por usuário
        if request.user.username == "A":
            reply = "Obrigado por seu contato, Usuário A. Em breve responderemos."
        else:
            reply = "Agradecemos sua mensagem, Usuário B. Retornaremos assim que possível."

        # Criar mensagem do bot
        bot_msg = Message.objects.create(
            thread=thread,
            sender=None,
            text=reply
        )

        return Response({
            "user_message": MessageSerializer(user_msg).data,
            "bot_message": MessageSerializer(bot_msg).data
        }, status=201)
