from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = "Creates default users A and B"

    def handle(self, *args, **options):
        if not User.objects.filter(username="A").exists():
            User.objects.create_user("A", password="123456")
            self.stdout.write(self.style.SUCCESS("User A created"))

        if not User.objects.filter(username="B").exists():
            User.objects.create_user("B", password="123456")
            self.stdout.write(self.style.SUCCESS("User B created"))
