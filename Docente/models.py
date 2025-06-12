from django.db import models
from Departamento.models import *
from Costum. models import *
from Departamento.models import *

# Create your models here.


class Docente(models.Model):
	name = models.CharField(max_length=100, verbose_name='Naran Docente')
	sex = models.CharField(max_length=5, verbose_name='Sexu', choices =[('Mane','Mane'), ('Feto', 'Feto')])
	addres = models.CharField(max_length=20, verbose_name ='Enderesu')
	level = models.CharField(max_length=20, verbose_name='Nivel Edukasaun')
	faculdade = models.ForeignKey(Faculdade, on_delete=models.CASCADE, verbose_name='Faculdade', null=True, blank=True)
	departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, max_length=10, verbose_name='Departamento')
	munisipiu = models.ForeignKey(Municipality,on_delete =models.CASCADE, null=True, blank=True, verbose_name='Municipiu')
	
	def __str__(self):
		template = '{0.name}'
		return template.format(self)