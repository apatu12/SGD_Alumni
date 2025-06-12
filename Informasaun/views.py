from django.shortcuts import render, get_object_or_404, redirect
from Costum.models import *
from Alumni.models import *
from django.core.paginator import Paginator
from Faculdade.models import Faculdade
from django.db.models import Count
from django.http import JsonResponse
from django.db.models import Q

# Create your views here.
def alumni(request):
	objects1, objects2, objects3, = [],[],[]
	mun = Municipality.objects.all()
	tinan = Year.objects.all().order_by('-id')
	fac = Faculdade.objects.all()
	for m in mun:
		obj2 = []
		for e in fac:
			m1 = Alumni.objects.filter(is_active=True, mun=m, faculdade=e).count()
			obj2.append([e,m1])
		objects1.append([m, obj2])
	total_fac = [0] * fac.count()
	for y in tinan:
		obj1 = []
		for f1 in fac:
			a1 = Alumni.objects.filter(is_active=True, start_date=y, faculdade=f1).count()
			obj1.append([f1, a1])
		objects3.append([y, obj1])
	paginator = Paginator(objects3, 10)
	page_number = request.GET.get('page')
	page_obj = paginator.get_page(page_number)

	context = {
		'title':'Dadus TOtal Alumni',
		'legend': 'Pajina Alumni',
		'objects1':objects1,
		'objects2':objects2,
		'legend':'Pajina Dadus Total Alumni',
		'fac':fac,
		'page_obj':page_obj,
		'total_fac':total_fac
	}
	return render(request, 'Alumni.html', context)

def alm_fack(request, pk):
	objects1 = []
	objects = get_object_or_404(Faculdade, pk=pk)
	dep = Departamento.objects.filter(faculdade=objects)  
	for d in dep:
		d1 = Alumni.objects.filter(is_active=True, departamento=d, sex='Mane').count()
		d2 = Alumni.objects.filter(is_active=True, departamento=d, sex='Feto').count()
		totd = d1 + d2
		objects1.append([d, d1, d2, totd])
	objects2 = Alumni.objects.filter(is_active=True, faculdade=objects)
	context = {
		'title': 'Alumni Tuir Faculdade',
		'legend': f'Lista Alumni Tuir Faculdade {objects.name}',
		'objects2': objects2,
		'objects': objects,
		'objects1': objects1,
		'dep': dep,
		'page': 'listfact'
	}
	return render(request, 'listfact.html', context)

def list_alumni(request, pk, pk2):
	departamento = get_object_or_404(Departamento, pk=pk)
	tinan = get_object_or_404(Year, pk=pk2)
	objects1 = Alumni.objects.filter(departamento=departamento, is_active=True, start_date=tinan)
	objects2 = Year.objects.all().order_by('-id')
	paginator = Paginator(objects2, 10)
	page_number = request.GET.get('page')
	page_obj = paginator.get_page(page_number)
	context = {
		'title':'Lista Alumni Tuir Departamento',
		'legend': f'Lista Alumni Tuir Departamento {departamento.name} No Tinan {tinan.name}',
		'departamento':departamento,
		'objects1':objects1,
		'page_obj':page_obj,
		'page':"listdep"
	}
	return render(request, 'listdep.html', context)

def alumni_year(request, pk):
	objects = get_object_or_404(Year, pk=pk)
	objects1 = Alumni.objects.filter(is_active=True, start_date=objects)
	context = {
		'title':'Lista Alumni Tuir Tinan',
		'legend': f'Lista Alumni Alumni Tuir Tinan {objects.name}',
		'objects':objects,
		'objects1':objects1,
		'page':'listyear'
	}
	return render(request, 'listfact.html', context)

def detaillu_Alumni(request, pk):
	objects = get_object_or_404(Alumni, pk=pk)
	context = {	
		'title':'Detaillua Dadus Estudante',
		'legend':f'Informasaun Detaillu  Ba Alumni {objects.name}',
		'objects':objects,
	}
	return render(request, 'Detaillualm.html', context)

def list_mane(request, pk, pk2):
	objects = get_object_or_404(Departamento, pk=pk)
	objects2 = get_object_or_404(Year, pk=pk2)
	objects1 = Alumni.objects.filter(is_active=True, departamento=objects, sex='Mane', start_date=objects2)
	context = {
		'title':f'Lista Alumni Tuir Departamento {objects.name} No Tinan {objects2.name}',
		'legend':f'Lista Alumni Mane tuir Departamento {objects.name} No Tinan {objects2.name}',
		'objects':objects,
		'objects1':objects1,
		'page':'mane_dep'
	}
	return render(request, 'listfact.html', context)

def perfil(request):
	context={
		'title':'Perfile Universidade',
		'legend':'Perfile Universidade Nacional Timor-Lorosae'
	}
	return render(request, 'perfile.html', context)

def filterFacul(request, pk, pk2):
    objects2, objects3 = [],[]
    year = get_object_or_404(Year, pk=pk)
    fac = get_object_or_404(Faculdade, pk=pk2)
    departments = Departamento.objects.filter(faculdade=fac)
    for dept in departments:
        male_count = Alumni.objects.filter(is_active=True, faculdade=fac, start_date=year, departamento=dept, sex='Mane').all().count()
        female_count = Alumni.objects.filter(is_active=True, faculdade=fac, start_date=year, departamento=dept, sex='Feto').all().count()
        total = male_count + female_count
        objects2.append([dept, male_count, female_count, total])
    context = {
        'title': f'Faculdade Alumni Tuir Faculdade {fac.name}',
        'legend': f'Total Estudante Tuir Tinan {year.name} No Faculdade {fac.name}',
        'objects2': objects2,
		'fac':fac,
		'year':year,
    }
    return render(request, 'Filter/Engenharia.html', context)

def alumnimunfac(request, pk, pk2):
	looping1, looping2 = [],[]
	mun = get_object_or_404(Municipality, pk=pk)
	fac = get_object_or_404(Faculdade, pk=pk2)
	posts = AdministrativePost.objects.filter(municipality=mun)
	for p in posts:
		male_count = Alumni.objects.filter(is_active=True, faculdade=fac, post=p,  sex='Mane').all().count()
		female_count = Alumni.objects.filter(is_active=True, faculdade=fac, post=p,  sex='Feto').all().count()
		totalm = male_count + female_count
		looping1.append([p, male_count, female_count, totalm])
	
	context = {
		'title': f'Total Dadus Alumni Tuir Postu Husi Munisipiu {mun.name} no Faculdade {fac.name}',
		'legend': f'Total Dadus Alumni Tuir Postu Husi Munisipiu {mun.name} no Faculdade {fac.name}',
		'looping1':looping1,
		'mun':mun,
		'fac':fac,

	}
	return render(request, 'Filter/munip.html', context)

