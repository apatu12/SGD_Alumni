from django.shortcuts import render, get_object_or_404, redirect
from Costum.models import *
from Alumni.models import *
from django.core.paginator import Paginator
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
from datetime import datetime 


@login_required
def Alumni_user(request):
	group = request.user.groups.all()[0].name
	objects =  Alumniuser.objects.all()
	context = {
		'title':'Lista Almuni User',
		'legend': 'Lista Almuni User',
		'objects':objects
	}
	return render(request, 'account/listaluser.html', context)


@login_required
def AccountUpdate(request):
	group = request.user.groups.all()[0].name
	if request.method == 'POST':
		form = UserForm(request.POST, instance=request.user)
		if form.is_valid():
			form.save()
			messages.success(request, f'Ita nia konta atualiza ona!')
			return redirect('user-account')
	else: form = UserForm(instance=request.user)
	context = {
		'group':group, 'form':form,
		'title':'Conta', 'legend':'Conta',
	}
	return render(request, 'auth/account.html', context)

from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordChangeView, PasswordResetDoneView

class UserPasswordChangeView(PasswordChangeView):
	form_class = ChangePasswordForm
	template_name = 'auth/change_password.html'
	success_url = reverse_lazy('user-change-password-done')

class UserPasswordChangeDoneView(PasswordResetDoneView):
	template_name = 'auth/change_password_done.html'


@login_required
def perfilUser(request):
	group = request.user.groups.all()[0].name
	user = request.user
	objects = Alumniuser.objects.filter(user=user)
	print(objects)
	context ={
		'objects':objects,
		'group':group,
		'legend':'Detailu Account',

	}
	return render(request, 'account/perfil.html', context)

