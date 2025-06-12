from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from Alumni.models import *
from Costum.models import *
from Faculdade.models import *
from Departamento.models import *
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from User.decorators import allowed_users
from django.contrib.auth import logout
# Create your views here.


@login_required
def index(request):
	loping1, loping2 = [],[]
	total = Alumni.objects.filter(is_active=True).count()
	totm = Alumni.objects.filter(is_active=True, sex='Mane').count()
	totf = Alumni.objects.filter(is_active=True, sex='Feto').count()
	mun = Municipality.objects.all()
	for m in mun:
		m1 = Alumni.objects.filter(is_active=True, mun=m, sex='Mane').count()
		m2 = Alumni.objects.filter(is_active=True, mun=m, sex='Feto').count()
		totalmun = m1 + m2
		loping1.append([m, m1, m2, totalmun])

	context = {
		'title':'Painel Geral',
		'legend':'Painel Geral Vice Reitora',
		'total':total,'totm':totm,'totf':totf,
		'loping1':loping1,
	}
	return render(request, 'Home/Admin/home.html', context)

def home(request):
	objects1, objects2, objects2, = [],[],[]
	total = Alumni.objects.all().count()
	totm = Alumni.objects.filter(sex='Mane').count()
	totf = Alumni.objects.filter(sex='Feto').count()
	mun = Municipality.objects.all()
	for m in mun:
		m1 = Alumni.objects.filter(mun=m, sex='Mane').count()
		m2 = Alumni.objects.filter(mun=m, sex='Feto').count()
		total1 = m1 + m2
		objects1.append([m, m1, m2, total1])

	fac = Faculdade.objects.all()
	for f in fac:
		f1= Alumni.objects.filter(faculdade=f, sex='Mane').count()
		f2 = Alumni.objects.filter(faculdade=f, sex='Feto').count()
		total2 = f1 + f2
		objects2.append([f, f1, f2, total2])


	context ={
		'title': 'Pajina Alumni',
		'legend': 'Pajina lista Alumni',
		'total':total,'objects1':objects1,
		'objects2':objects2,'totm':totm, 'totf':totf
	}
	return render(request, 'Home/home.html', context)

def error_404(request):
	return render(request, 'Home/404.html', {'status':status})

def LoginView(request):
	logout(request)
	request.session.flush()
	return render(request, 'Home/logout.html')


def homevice(request):
	total = Alumni.objects.filter(is_active=True).count()
	totm = Alumni.objects.filter(is_active=True, sex='Mane').count()
	totf = Alumni.objects.filter(is_active=True, sex='Feto').count()
	context = {
		'title':'Painel Geral',
		'legend':'Pajina Geral Vice Reitora',
		'total':total,'totm':totm,'totf':totf,
	}
	return render(request, 'Home/Admin/vice.html', context)
