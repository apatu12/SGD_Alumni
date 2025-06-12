from django.shortcuts import render, get_object_or_404, redirect
from Docente.models import *
from Docente.forms import *
from Costum.models import *
from Alumni.models import *
from django.core.paginator import Paginator
from Faculdade.models import Faculdade
from django.db.models import Count
from django.http import JsonResponse
from django.db.models import Q
from django.utils.timezone import now
from django.contrib.auth.decorators import login_required 
from django.contrib import messages
from User.decorators import allowed_users
from Main.utils import *
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password
from Faculdade.models import Faculdade


@login_required
@allowed_users(allowed_roles=['Vice_Reitor', 'Admin'])
def listDocen(request):
    group = request.user.groups.all()[0].name
    objD = Docente.objects.all().order_by('-id') 
    fac = Faculdade.objects.all()    
    context ={
		'objD':objD,
		'title':'Dadus Dosente',
        'legend':'Lista Pajina Dosente',
        'fac':fac,
        'group':group,
        'page':'obj_doc'
	}
    return render(request, 'Docent/Lista.html', context)

@login_required
@allowed_users(allowed_roles=['Admin'])
def doc_fac(request, pk):
    group = request.user.groups.all()[0].name
    fac = get_object_or_404(Faculdade, pk=pk)
    objD = Docente.objects.filter(faculdade=fac).all()
    context = {
        'title': f'Lista Docente Tuir Faculdade {fac.name}',
        'legend': f'Lista Docente Tuir Faculdade {fac.name}',
        'fac':fac,
        'objD':objD,
        'page':'obj_page'


    }
    return render(request, 'Docent/Lista.html', context)

@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor', 'Staff'])
def AddDoc(request):
    group = request.user.groups.all()[0].name 

    if request.method == 'POST':
        form = DocentForm(request.POST)
        if form.is_valid():
            instance = form.save()
            messages.success(request, f'Dadus {instance.name} rai ona ho susesu.')
            return redirect('D_Lst')
        else:
            messages.error(request, 'Form invalidu. Favór verifica fali.')
    else:
        form = DocentForm()

    context = {
        'form': form,
        'group': group,
        'title':'Dadus Docente',
        'legend':'Dadus Docente',
    }
    return render(request, 'Docent/FormDocent.html', context)


@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor', 'Staff'])
def HadiaDoc(request, id):
    group = request.user.groups.all()[0].name
    docente = get_object_or_404(Docente, id=id)  
    if request.method == 'POST':
        form = DocentForm(request.POST, instance=docente)
        if form.is_valid():
            instance = form.save()
            messages.success(request, f'Dadus {instance.name} atualiza ho susesu.')
            return redirect('D_Lst')
        else:
            messages.error(request, 'Form invalidu. Favór verifica fali.')
    else:
        form = DocentForm(instance=docente)

    context = {
        'form': form,
        'group': group,
    }
    return render(request, 'Docent/HadiaDocent.html', context)

@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor', 'Staff'])
def HamosDoc(request, id):
    group = request.user.groups.all()[0].name
    hamos = get_object_or_404(Docente, id=id)
    naran = hamos.name
    hamos.delete()
    messages.success(request, f'Dadus ho naran "{naran}" hamos ona ho susesu.')
    return redirect('D_Lst')


@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor'])
def docente_fac(request, pk):
    group = request.user.groups.all()[0].name
    fac = get_object_or_404(Faculdade, pk=pk)
    objects = Docente.objects.all()



