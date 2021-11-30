'''
import tensorflow.compat.v1 as tf
from keras.applications import vgg16
from tensorflow.python.keras.backend import set_session
import os

tf.disable_v2_behavior()

SESS = tf.compat.v1.Session()
GRAPH1 = tf.get_default_graph()

set_session(SESS)

IMAGE_MODEL = vgg16.VGG16(weights="imagenet")

#################################################################
'''

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-xmg9&vcr(hyx0b!b&@ggd6xlx+)qser8l6v$f%u-_@v5*g*00%"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "diary",
    "accounts",
    "font",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # "bootstrap4",
    # "storages",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "MEMO.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR, "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "MEMO.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        # "ENGINE": "django.db.backends.mysql",
        # "NAME": "memo",
        # "USER": "root",
        # "PASSWORD": "luvy357192846**",
        # "HOST": "localhost",
        # "PORT": "3306",
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
# AWS_S3_SECURE_URLS = False  # use http instead of https
# AWS_QUERYSTRING_AUTH = (
#     False  # don't add complex authentication-related query parameters for requests
# )

# AWS_S3_ACCESS_KEY_ID = "AKIARGDJZA5DXT26TLPP"
# AWS_S3_SECRET_ACCESS_KEY = "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"
# AWS_STORAGE_BUCKET_NAME = "memoimagebucket"

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

# Media files : 업로드하는 url과 디렉토리 설정
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
