# Generated by Django 3.1.4 on 2021-01-03 18:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Book",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("author", models.CharField(max_length=30)),
                ("title", models.CharField(max_length=30)),
                ("text", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Poem",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("passage", models.TextField()),
                ("color_range", models.IntegerField(default=0)),
                ("background_id", models.IntegerField(default=1)),
                (
                    "author",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="SelectedText",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("start_idx", models.IntegerField()),
                ("end_idx", models.IntegerField()),
                (
                    "poem",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="db.poem"
                    ),
                ),
            ],
        ),
    ]
