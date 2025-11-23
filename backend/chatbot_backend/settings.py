from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "replace-this-with-a-secure-key"
DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.auth',          
    'django.contrib.contenttypes', 
    'django.contrib.sessions',     
    'django.contrib.messages',     
    'django.contrib.staticfiles',  

    'rest_framework',
    'rest_framework.authtoken',
    'api',
]




MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
]


ROOT_URLCONF = "chatbot_backend.urls"

TEMPLATES = []

WSGI_APPLICATION = "chatbot_backend.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

STATIC_URL = "/static/"

# CORS - permitir o frontend local
CORS_ALLOW_ALL_ORIGINS = True  # para desenvolvimento; em produção especifique origins

REST_FRAMEWORK = {
    'UNAUTHENTICATED_USER': None,
     "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    'DEFAULT_PERMISSION_CLASSES': [],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}

