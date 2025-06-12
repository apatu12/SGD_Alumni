from django.db import models

# Create your models here.
class Municipality(models.Model):
	code = models.CharField(max_length=50, verbose_name='Sigla')
	name = models.CharField(max_length=50, verbose_name='Naran Munisipiu', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)

class AdministrativePost(models.Model):
	municipality = models.ForeignKey(Municipality, on_delete=models.CASCADE, verbose_name='Munisipiu')
	name = models.CharField(max_length=50, verbose_name='Naran Postu', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)

class Village(models.Model):
	administrativePost = models.ForeignKey(AdministrativePost, on_delete=models.CASCADE, verbose_name='Postu')
	name = models.CharField(max_length=50, verbose_name='Naran Suku', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)

class SubVillage(models.Model):
	village  = models.ForeignKey(Village, on_delete=models.CASCADE, verbose_name='Suku')
	name = models.CharField(max_length=50, verbose_name='Naran Aldeia', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)

class Pozisaun(models.Model):
	name = models.CharField(max_length=50, verbose_name='Naran Pozisaun')

	def __str__(self):
		template = '{0.name}'
		return template.format(self)


class Nasaun(models.Model):
	name = models.CharField(max_length=50, verbose_name='Naran Nasaun', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)


class Relijiaun(models.Model):
	name = models.CharField(max_length=50, verbose_name='Naran Relijiaun', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)

class Year(models.Model):
	name = models.CharField(max_length=50, verbose_name='Tinan', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)

class Instituisaun(models.Model):
	code = models.CharField(max_length=50, verbose_name='Sigla')
	name = models.CharField(max_length=50, verbose_name='Naran', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)

class Diresaun(models.Model):
	instuisaun = models.ForeignKey(Instituisaun, on_delete=models.CASCADE, null=True, verbose_name='Instituisaun')
	name = models.CharField(max_length=50, verbose_name='Naran', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)

class nivelmaster(models.Model):
	code = models.CharField(max_length=50, verbose_name='Sigla')
	name = models.CharField(max_length=50, verbose_name='Naran', null=False)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)


