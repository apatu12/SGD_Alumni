from django.db import models


# Create your models here.
class Faculdade(models.Model):
	code = models.CharField(max_length=50, verbose_name='Sigla', null=False)
	name = models.CharField(max_length=50, verbose_name='Naran Faculdade', null=False)

	def __str__(self):
		template = '{0.code}-{0.name}'
		return template.format(self)
