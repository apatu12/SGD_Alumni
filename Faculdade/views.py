from django.shortcuts import render, get_object_or_404, redirect
from Faculdade.models import *
from Costum.models import *
from Alumni.models import *
from django.core.paginator import Paginator
from Faculdade.models import Faculdade
from .forms import *
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
@allowed_users(allowed_roles=['Admin','Staff','Vice_Reitor'])
def FacList(request):
	obj1 = Faculdade.objects.all().order_by('-id')
	context ={
		'obj1':obj1,
		'title':'Dadus Faculdade',
		'legend': 'Pajina Dadus Faculdade'
	}
	return render(request, 'Fac/ListFac.html', context)

@login_required
@allowed_users(allowed_roles=['Admin','Staff'])
def Addfac(request):
	if request.method =='POST':
		form = FaculdadeForm(request.POST)
		if form.is_valid():
			form.save()
			messages.success(request,f'Lista Registu Fakuldade Ho succesu')
			return redirect('f_list')
		else:
			messages.error(request, f'lista La Rai Ho succesu')
	else:
		form = FaculdadeForm()
	context={
		'form':form,
		'legend':'Dadus Faculdade'
	}
	return render(request, 'Fac/form.html', context)


@login_required
@allowed_users(allowed_roles=['Admin','Staff'])
def hamosfac(request, pk):
    try:
        hamos = get_object_or_404(Faculdade, pk=pk)
        hamos.delete()
        messages.success(request, f'Dadus Faculdade ho naran {hamos.name} hamos ona ho susesu.')
    except Exception as e:
        messages.error(request, f'Dadus la hetan ka faila hamos: {str(e)}')
    return redirect('f_list')




@login_required
@allowed_users(allowed_roles=['Admin','Staff'])
def hadialist(request, pk):
	intense = get_object_or_404(Faculdade, pk=pk)
	if request.method =='POST':
		form = FaculdadeForm(request.POST, instance=intense)
		if form.is_valid():
			form.save()
			messages.success(request, f'Dadus fakuldade hadia ona{intense.name} ho susesu')
			return redirect('f_list')
	else:
		form = FaculdadeForm(instance=intense)
	context ={
			'form':form,
			'legend':'Hadia lista fakuldade'
	}
	return render(request,'Fac/formhadia.html', context)









