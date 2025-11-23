from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Message
from .serializers import MessageSerializer


@api_view(['GET'])
def health_check(request):
    return Response({
        "status": "ok",
        "message": "API is running"
    })


class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.all().order_by("created_at")

    # Ativa JWT
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retorna apenas as mensagens do usuário autenticado.
        """
        user = self.request.user.username  # A ou B
        return Message.objects.filter(user=user).order_by("created_at")

    def create(self, request, *args, **kwargs):
        """
        Cria mensagem para o usuário autenticado e gera resposta automática.
        """

        # Força o campo user = usuário logado
        data = request.data.copy()
        data["user"] = request.user.username  # A ou B automaticamente

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        message = serializer.save()

        # Respostas mockadas por usuário
        mocked = {
            "A": "Obrigado por seu contato, Usuário A. Em breve responderemos.",
            "B": "Obrigado por seu contato, Usuário B. Em breve responderemos.",
        }

        message.response = mocked.get(
            message.user,
            "Obrigado por seu contato. Em breve responderemos."
        )
        message.save()

        return Response(
            MessageSerializer(message).data,
            status=status.HTTP_201_CREATED
        )
