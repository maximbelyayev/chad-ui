import environ
from pathlib import Path

env = environ.Env()

DEBUG = env.bool('DJANGO_DEBUG', default=True)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = environ.Path(__file__) - 2
APPS_DIR = BASE_DIR.path('src')