from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField


class Activity(models.Model):
    title = models.CharField(max_length=200, verbose_name='Titulo')
    content = RichTextField(verbose_name='Konteudo')
    data_create = models.DateField(null=True, verbose_name='Data')
    foto = models.ImageField(upload_to='foto/', verbose_name='Imagen')
    create_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Kria Husi')
    create_at = models.DateTimeField(auto_now_add=True, verbose_name='Kria iha Data')
    views = models.FloatField(default=0, verbose_name='Accesso')
    like = models.FloatField(default=0, verbose_name='Like')
    search = models.FloatField(default=0, verbose_name='Search')

    def __str__(self):
        return self.title
