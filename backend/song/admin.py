from django.contrib import admin
from .models import Song

class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'description', 'registered')

# Register your models here.

admin.site.register(Song, SongAdmin)