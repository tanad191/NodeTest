# Generated by Django 5.0.7 on 2024-07-18 00:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('song', '0005_alter_song_timestamp_alter_song_updated_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='timestamp',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2024, 7, 17, 20, 32, 27, 836330)),
        ),
        migrations.AlterField(
            model_name='song',
            name='updated',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2024, 7, 17, 20, 32, 27, 836330)),
        ),
    ]