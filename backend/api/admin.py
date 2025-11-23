from django.contrib import admin
from .models import Message

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'text', 'created_at')
    list_filter = ('user', 'created_at')
    ordering = ('-created_at',)
