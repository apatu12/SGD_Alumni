from django.db import models
from Faculdade.models import *

# Create your models here.
class Departamento(models.Model):
	faculdade = models.ForeignKey(Faculdade, on_delete=models.CASCADE, verbose_name='Faculdade')
	code = models.CharField(max_length=50, null=False, verbose_name='Sigla')
	name = models.CharField(max_length=50, null=False, verbose_name='Naran Departamento')

	def __str__(self):
		template = '{0.code}-{0.name}'
		return template.format(self)
