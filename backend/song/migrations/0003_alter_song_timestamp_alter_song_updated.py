# Generated by Django 5.0.7 on 2024-07-17 15:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('song', '0002_token_user_alter_song_id_alter_song_timestamp_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='timestamp',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2024, 7, 17, 11, 58, 39, 840665)),
        ),
        migrations.AlterField(
            model_name='song',
            name='updated',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2024, 7, 17, 11, 58, 39, 840665)),
        ),
    ]
