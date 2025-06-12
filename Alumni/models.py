from django.db import models
from Departamento.models import *
from Faculdade.models import *
from Costum.models import *
from Docente.models import *
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from Docente.models import Docente
from Config.utils import alumni_photo

# Create your models here.
class Alumni(models.Model):
	nre = models.CharField(max_length=50, verbose_name='Nu Rejistu Estudante', unique=True, null=True)
	name = models.CharField(max_length=50, verbose_name='Naran Alumni', null=False)
	sex = models.CharField(max_length=10, choices=[('Mane','Mane'),('Feto','Feto')], default='Mane', verbose_name='Sexu')
	dob = models.DateField(null=True, verbose_name='Data Moris')
	pob = models.CharField(max_length=10, verbose_name='Fatin Moris')
	faculdade = models.ForeignKey(Faculdade, on_delete=models.CASCADE, verbose_name='Faculdade', null=True, blank=True)
	departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, verbose_name='Departamento', null=True, blank=True)
	mun = models.ForeignKey(Municipality, on_delete=models.CASCADE, verbose_name='Munisipiu', null=True, blank=True)
	post = models.ForeignKey(AdministrativePost, on_delete=models.CASCADE, verbose_name='Postu', null=True, blank=True)
	suk = models.ForeignKey(Village, on_delete=models.CASCADE, verbose_name='Suku', null=True, blank=True)
	ald = models.ForeignKey(SubVillage, on_delete=models.CASCADE, verbose_name='Aldeia', null=True, blank=True)
	start_date = models.ForeignKey(Year, on_delete=models.CASCADE, verbose_name='Tinan Hahu', null=True, blank=True)
	end_date = models.ForeignKey(Year, on_delete=models.CASCADE, verbose_name='Tinan Remata', null=True, blank=True, related_name='alumin')
	create_at = models.DateField(auto_now_add=True, verbose_name='Data Rejistu')
	create_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Rejistu Husi')
	orientadorI = models.ForeignKey(Docente, on_delete=models.CASCADE, verbose_name='Orientador I', null=True, blank=True, related_name='AlumniOrienta')
	orientadorII = models.ForeignKey(Docente, on_delete=models.CASCADE, verbose_name='Orientador II', null=True, blank=True)
	title = models.CharField(max_length=100, verbose_name='Titulo Teze', null=True, blank=True)
	point = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Valor Teze", null=True, blank=True)
	predict = models.CharField(max_length=5, verbose_name='Predikadu Final', null=True, blank=True)
	fname = models.CharField(max_length=100, verbose_name='Naran Aman', null=True, blank=True)
	mname = models.CharField(max_length=100, verbose_name='Naran Inan', null=True, blank=True)
	Tpone = models.CharField(max_length=20, verbose_name='Nu Telepone', null=True)
	email = models.EmailField(max_length=100, verbose_name='Email', null=True, blank=True)
	foto = models.ImageField(upload_to=alumni_photo, verbose_name='Imagen', validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])], null=True, blank=True)	
	hashid = models.CharField(max_length=50)
	paddres = models.CharField(max_length=20, verbose_name='Enderesu Inan Aman', null=True, blank=True)
	is_active = models.BooleanField(default=True, null=True)

	def __str__(self):
		template = '{0.name}'
		return template.format(self)


class Kareira(models.Model):
	alumni = models.ForeignKey(Alumni, on_delete=models.CASCADE, verbose_name='Alumni', null=True, blank=True)
	a_work = models.CharField(max_length=20, verbose_name='Area Servisu', choices=[('Relevante','Relevante'),('La_relevante','La_relevante')])
	instituisaun = models.ForeignKey(Instituisaun, on_delete=models.CASCADE, verbose_name='Instituisaun')
	diresaun = models.ForeignKey(Diresaun, on_delete=models.CASCADE, verbose_name='Diresaun Servisu')
	pozisaun = models.ForeignKey(Pozisaun, on_delete=models.CASCADE, verbose_name='Servisu', null=True, blank=True)

	def __str__(self):
		template = '{0.alumni}-{0.pozisaun}'
		return template.format(self)

class KontinuaEstudo(models.Model):
    alumni = models.ForeignKey(Alumni, on_delete=models.CASCADE, related_name='kontinua_eskola')
    nivel_cont = models.ForeignKey(nivelmaster, on_delete=models.CASCADE, null=True, verbose_name="Grau Kontinua Estudo")
    espesialidade = models.CharField(max_length=255, blank=True, null=True)
    universidade = models.CharField(max_length=255, blank=True, null=True)
    nation = models.ForeignKey(Nasaun, on_delete=models.CASCADE, null=True, verbose_name="Nasaun Kontinua Estudo")

    def __str__(self):
        template = '{0.alumni} - {0.universidade} - {0.nation}'
        return template.format(self)


class Alumniuser(models.Model):
	alumni = models.OneToOneField(Alumni, on_delete=models.CASCADE, verbose_name='Alumni', related_name='+')
	user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='Utilizador')

	def __str__(self):
		template = '{0.alumni}-{0.user}'
		return template.format(self)



		


