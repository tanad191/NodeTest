from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.

class Song(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length = 180)
    artist = models.CharField(max_length = 180)
    timestamp = models.DateTimeField(default=datetime.now(), blank = True)
    registered = models.BooleanField(default = False, blank = True)
    updated = models.DateTimeField(default=datetime.now(), blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)
    description = models.TextField()

    def _str_(self):
        return self.title

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.user.username