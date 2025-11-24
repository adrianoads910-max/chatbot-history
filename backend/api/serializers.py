from rest_framework import serializers
from .models import Thread, Message


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ["id", "sender", "sender_name", "text", "created_at", "thread"]
        read_only_fields = ["id", "created_at", "thread", "sender"]

    def get_sender_name(self, obj):
        return obj.sender.username if obj.sender else "BOT"


class ThreadSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Thread
        fields = ["id", "user", "created_at", "messages"]
        read_only_fields = ["id", "created_at", "user", "messages"]
