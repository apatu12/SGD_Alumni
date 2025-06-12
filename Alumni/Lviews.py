from django.shortcuts import render, get_object_or_404, redirect
from Costum.models import *
from Alumni.models import *
from django.core.paginator import Paginator
from Faculdade.models import Faculdade
from django.db.models import Count
from django.http import JsonResponse
from django.db.models import Q
from django.utils.timezone import now
from django.contrib.auth.decorators import login_required
from .forms import *
from django.contrib import messages
from User.decorators import allowed_users
from Main.utils import *
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
import pandas as pd
import csv, io
from tablib import Dataset
from Alumni.resource import AlumnisResources


@login_required
@allowed_users(allowed_roles=['Admin','Vice_Reitor', 'Staff'])
def alimnimun(request, pk):
	group = request.user.groups.all()[0].name
	alumni = get_object_or_404(Municipality, pk=pk)
	objects = Alumni.objects.filter(is_active=True, mun=alumni, sex='Mane')
	ano  = Year.objects.all()
	context = {
		'title':f'Lista Alumni Tuir Munisipiu {alumni.name}',
		'legend':f'Lista Alumni Tuir Munisipiu {alumni.name}',
		'objects': objects,
		'ano':ano,
		'page': 'mun_alm'
	}
	return render(request, 'Alumi/Lista_alumi.html', context)


@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor', 'Staff'])
def alimnifmun(request, pk):
	group = request.user.groups.all()[0].name
	alumni = get_object_or_404(Municipality, pk=pk)
	objects = Alumni.objects.filter(is_active=True, mun=alumni, sex='Feto')
	ano  = Year.objects.all()
	context = {
		'title':f'Lista Alumni Tuir Munisipiu {alumni.name}',
		'legend':f'Lista Alumni Tuir Munisipiu {alumni.name}',
		'objects': objects,
		'ano':ano,
		'page': 'mun_almm'
	}
	return render(request, 'Alumi/Lista_alumi.html', context)

@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor', 'Staff'])
def alimnimunall(request, pk):
	group = request.user.groups.all()[0].name
	alumni = get_object_or_404(Municipality, pk=pk)
	objects = Alumni.objects.filter(is_active=True, mun=alumni).all()
	ano  = Year.objects.all()
	context = {
		'title':f'Lista Alumni Tuir Munisipiu {alumni.name}',
		'legend':f'Lista Alumni Tuir Munisipiu {alumni.name}',
		'objects': objects,
		'ano':ano,
		'page': 'mun_almf'
	}
	return render(request, 'Alumi/Lista_alumi.html', context)

@login_required
@allowed_users(allowed_roles=['Admin','Staff'])
def alm_mun(request, pk):
	group = request.user.groups.all()[0].name
	year = Year.objects.get(pk=pk)
	
	objects = Alumni.objects.filter(is_active=True, start_date=year)
	context = {
		'group':group,
		'mun':mun,
		'year':year,
		'objects':objects,
		'title': f'Lista Alumni Tuir Munisipiu {mun.name} no Tinan {year.name}',
		'legend':f'Lista Alumni Tuir Munisipiu {mun.name} no Tinan {year.name}',
		'page': 'mun_almt'
	}
	return render(request, 'Alumi/Lista_alumi.html', context)



def alumni_ano(request, pk):
    selected_year = get_object_or_404(Year, pk=pk)
    ano = Alumni.objects.filter(is_active=True, start_date=selected_year)
    years = Year.objects.all()
    context = {
        'ano': ano,
        'years': years,
        'selected_year': selected_year,
        'title': f'Lista Alumni ba Tinan -({selected_year.name})'
    }
    return render(request, 'Alumi/ListaAno.html', context)


