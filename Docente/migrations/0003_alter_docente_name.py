# Generated by Django 4.2.16 on 2025-06-09 07:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Docente', '0002_docente_faculdade'),
    ]

    operations = [
        migrations.AlterField(
            model_name='docente',
            name='name',
            field=models.CharField(max_length=100, verbose_name='Naran Docente'),
        ),
    ]
