from django.shortcuts import render, get_object_or_404, redirect
from Activity.models import *
from Activity.forms import *
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



@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor', 'Staff'])
def ListAc(request):
	group = request.user.groups.all()[0].name 
	obj = Activity.objects.all().order_by('-id')
	context={
		'obj':obj,
		'group':group,
		'title':'Lista Actividade'
	}
	return render(request, 'Acti/ListActi.html', context)



@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor', 'Staff'])
def addActi(request):
    group = request.user.groups.all()[0].name 
    if request.method == 'POST':
        form = ActiviForm(request.POST, request.FILES)
        if form.is_valid():
            activity = form.save(commit=False)
            activity.create_by = request.user  
            activity.save()
            messages.success(request, 'Dadus actividade rai ona ho susesu.')
            return redirect('A_Acti')
        else:
            messages.error(request, 'Halo pavor hare fila fali lista.')
    else:
        form = ActiviForm()
    
    context = {
        'form': form,
        'group': group,
    }
    return render(request, 'Acti/ActiviForm.html', context)

