from django.db import models
from django.contrib.auth.models import User


class Thread(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="threads")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Thread {self.id} - {self.user.username}"


class Message(models.Model):
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,      # permite chatbot
        blank=True      # permite salvar vazio
    )
    thread = models.ForeignKey(
        Thread,
        on_delete=models.CASCADE,
        related_name="messages"   # necessário para ThreadSerializer
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        sender_name = self.sender.username if self.sender else "BOT"
        return f"{sender_name}: {self.text[:20]}"
