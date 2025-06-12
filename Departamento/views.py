from django.shortcuts import render,  get_object_or_404, redirect
from Departamento.models import *
from.forms import *
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


@login_required
@allowed_users(allowed_roles=['Admin','Vice_Reitor','Staff'])
def ListDep(request):
	group = request.user.groups.all()[0].name
	objec =  Departamento.objects.all().order_by('-id')
	context={
		'group':group,
		'objec':objec,
		'title':'Lista kada departamento',
        'legend': 'Pajina Dadus Departamento'
	}
	return render( request,'Dep/LisDep.html', context)


@login_required
@allowed_users(allowed_roles=['Admin','Vice_Reitor','Staff'])
def addDep(request):
    group = request.user.groups.all()[0].name 

    if request.method == 'POST':
        form = FormDeparta(request.POST)
        if form.is_valid():
            instance = form.save()
            messages.success(request, f'Dadus {instance.name} rai ona ho Susesu')
            return redirect('L_Deps') 
        else:
            messages.error(request, 'Form invalidu. Favór verifica fali.')
    else:
        form = FormDeparta()

    context = {
        'form': form,
        'group': group,
        'legend':'Add departamentu'
    }

    return render(request, 'Dep/AddDep.html', context)


@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor', 'Staff'])
def editDep(request, id):
    dep = get_object_or_404(Departamento, id=id)
    group = request.user.groups.all()[0].name

    if request.method == 'POST':
        form = FormDeparta(request.POST, instance=dep)
        if form.is_valid():
            instance = form.save()
            messages.success(request, f'Dadus {instance.name} atualiza ho susesu.')
            return redirect('L_Deps')
        else:
            messages.error(request, 'Form invalidu. Favór halo verifica fali.')
    else:
        form = FormDeparta(instance=dep)

    context = {
        'form': form,
        'group': group,
        'legend':'Hadia lista departamentu',
    }
    return render(request, 'Dep/EditDep.html', context)


@login_required
@allowed_users(allowed_roles=['Admin','Vice_Reitor','Staff'])
def hamodep(request, id):
	group = request.user.groups.all()[0].name 
	hamos = get_object_or_404(Departamento, id=id)
	naran = hamos.name
	hamos.delete()
	messages.success(request, f'Dadus departamentu "{naran}" hamos ona ho susesu.')
	return redirect('L_Deps')