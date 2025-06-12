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
from datetime import datetime 

@login_required
@allowed_users(allowed_roles=['Admin','Vice_Reitor','Staff'])
def LisAlumi(request):
    group = request.user.groups.all()[0].name
    objects = Alumni.objects.filter(is_active=True).all().order_by('-id')
    ano  = Year.objects.all()
    context ={
		'page':'Alumi',
		'objects':objects,
		'title':'Lista Alumni',
		'legend':'Lista Alumni',
        'group':group,'ano':ano
	}
    return render(request, 'Alumi/Lista_alumi.html', context)


@login_required
@allowed_users(allowed_roles=['Admin','Vice_Reitor','Staff'])
def AddAlmni(request):
    u_group = Group.objects.get(name='Alumni')
    if request.method == 'POST':
        form = AlumniForm(request.POST, request.FILES)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.create_by = request.user
            instance.create_at = now().date()
            newid = getjustnewid(Alumni)
            get_newId = hash_md5(newid)
            instance.hashid = get_newId
            instance.save()
            password = make_password('Password') 
            user = User.objects.create(username=instance.nre, password=password)
            user.groups.add(u_group)
            user.save()
            obj1 = Alumniuser.objects.create(alumni=instance, user=user)
            obj1.save()
            messages.success(request, f'Dadus Alumni {instance.name} rai ona ho Susesu')
            return redirect('ALm') 
        else:
        	messages.error(request, f'Falla Adisiona Dadus Alumni Foun')
    else:
        form = AlumniForm()
    context={
    	'page':'Addalumi',
    	'title':'Lista Adisiona Alumni',
        'legend':'Adisiona Dadus Alumni',
    	'form':form,
    }
    return render(request, 'Alumi/form.html', context)




@login_required
@allowed_users(allowed_roles=['Admin', 'Vice_Reitor', 'Staff'])
def HadiaAlumni(request, pk):
    instance = get_object_or_404(Alumni, pk=pk)
    if request.method == 'POST':
        form = AlumniForm(request.POST, request.FILES, instance=instance)
        if form.is_valid():
            alumni = form.save(commit=False)
            alumni.save()
            messages.success(request, f'Dadus Alumni ho naran {alumni.name} haian ona ho sussesu.')
            return redirect('ALm')  
        else:
            messages.error(request, f'Dadus Alumni ho naran {instance.name} sei failha.')
    else:
        form = AlumniForm(instance=instance)

    context = {
        'page': 'Edit Alumni',
        'title': 'Hadia Dadus Alumni',
        'legend': 'Hadia Dadus Alumni',
        'form': form,
    }
    return render(request, 'Alumi/HadiForm.html', context)



def AlumiDet(request, id):
    objec= get_object_or_404( Alumni, id=id)
    context ={
        'objec':objec,
        'title':'Lista Detailu Alumni',
        'legend':f'Detaillu Dadus Alumni {objec.name}'
    }
    return render(request,'Alumi/Detailu.html', context)


def hamosAlm(request, id):
    hamos = get_object_or_404(Alumni, id=id)
    name = hamos.name 
    hamos.delete()
    messages.success(request, f'Lista name ho {name} hamos ona ho Susesu.')
    return redirect('ALm')

def export_alumni_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="alumni.csv"'
    writer = csv.writer(response)
    writer.writerow(['NRE', 'Naran Kompletu', 'Sexu','faculdade', 'Departamento','Fatin Moris', 'Data Moris', 'Email','Municipio','Posto','Suku','Aldeia','Tina Hahu','Tinan Remata','Orientador I',\
        'Orientador II','Title','Point','Predikadu Final','Naran Aman','Naran Inan','Email','Hela Fafin Inan Aman']) 
    for alumni in Alumni.objects.all():
        writer.writerow([alumni.nre, alumni.name, alumni.sex,alumni.faculdade, alumni.departamento, alumni.pob, alumni.dob, alumni.email,\
          alumni.mun,alumni.post, alumni.suk, alumni.ald, alumni.start_date, alumni.end_date,\
          alumni.orientadorI,alumni.orientadorII, alumni.title, alumni.point, alumni.predict, alumni.fname, alumni.mname, alumni.email, alumni.paddres])
    return response


def import_alumni(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            dataset = Dataset()
            new_file = request.FILES['file']
            try:
                imported_data = dataset.load(new_file.read(), format='xlsx')
                resource = AlumnisResources()
                result = resource.import_data(dataset, dry_run=True)  # Faze Test 

                if not result.has_errors():
                    resource.import_data(dataset, dry_run=False)  # rai ba DB
                    messages.success(request, "Dadus Alumni Rai ona ho Susesu.")
                    return redirect('ALm')  
                else:
                    messages.error(request, "Akontese Error Wainhira rai Dadus.")
            except Exception as e:
                messages.error(request, f"Error: {str(e)}")

    else:
        form = UploadFileForm()
    context = {
        'title': 'Import Dadus Alumni',
        'legend': 'Import Dadus Alumni',
        'form':form
    }
    return render(request, 'Alumi/import_form.html', context)

def import_alumni_excel(request):
    if request.method == 'POST':
        form = UploadExcelForm(request.POST, request.FILES)
        if form.is_valid():
            excel_file = request.FILES['file']
            df = pd.read_excel(excel_file)
            for index, row in df.iterrows():
                try:
                    Alumni.objects.create(
                        NRE=row['nre'],
                        Naran_Kompletu=row['name'],
                        Sexu=row['sex'],
                        Data_Moris=row['dob'],
                        Fatin_Moris=row['pob'],
                        faculdade=Faculdade.objects.get(name=row['faculdade']) if pd.notna(row['faculdade']) else None,
                        Departamento=Departamento.objects.get(name=row['departamento']) if pd.notna(row['departamento']) else None,
                        mun=Municipality.objects.get(name=row['mun']) if pd.notna(row['mun']) else None,
                        Postu=AdministrativePost.objects.get(name=row['post']) if pd.notna(row['post']) else None,
                        Suku=Village.objects.get(name=row['suk']) if pd.notna(row['suk']) else None,
                        Aldeia=SubVillage.objects.get(name=row['ald']) if pd.notna(row['ald']) else None,
                        Tinan_Hahu=Year.objects.get(tinan=row['start_date']) if pd.notna(row['start_date']) else None,
                        Tinan_Remata=Year.objects.get(tinan=row['end_date']) if pd.notna(row['end_date']) else None,
                        create_by=User.objects.get(username=row['create_by']) if pd.notna(row['create_by']) else request.user,
                        Orientador_I=Docente.objects.get(name=row['orientadorI']) if pd.notna(row['orientadorI']) else None,
                        Orientador_II=Docente.objects.get(name=row['orientadorII']) if pd.notna(row['orientadorII']) else None,
                        Title=row['title'] if pd.notna(row['title']) else '',
                        Point=row['point'] if pd.notna(row['point']) else None,
                        Predikadu=row['predict'] if pd.notna(row['predict']) else '',
                        name_Aman=row['fname'] if pd.notna(row['fname']) else '',
                        name_Inan=row['mname'] if pd.notna(row['mname']) else '',
                        Email=row['email'] if pd.notna(row['email']) else '',
                        Hela_Fafin_Inan_Aman=row['paddres'] if pd.notna(row['paddres']) else '',
                        hashid='-',  
                    )
                except Exception as e:
                    messages.error(request, f"Falha Importa Dadus-{index+2}: {e}")
                    continue
            messages.success(request, "Dadus Alumni Adisiona ho Susesu.")
            return redirect('ALm')
    else:
        form = UploadExcelForm()
    return render(request, 'Alumi/import_form.html', {'form': form})


@login_required
@allowed_users(allowed_roles=['Admin'])
def soft_delete(request, pk):
    try:
        objects = get_object_or_404(Alumni, pk=pk)
        objects.is_active=False
        objects.save()
        messages.success(request, f'Ita Ho Susesu Hamos Ona Dadus {objects.name}')
        return redirect('ALm')
    except:
        messages.error(request, f'Falha Atu Hamos Dadus {objects.name}')
        return redirect('ALm')



@login_required
@allowed_users(allowed_roles=['Alumni', 'Admin'])
def lista_pes_alumni(request):
    user = request.user
    try:
        alumni_list = Alumniuser.objects.get(user=user)
        lumni = alumni_list.alumni
    except Alumni.DoesNotExist:
        alumni = None
    context = {
        'legend': f'Lista Alumni Pessoal - ({user.username})',
        'title': 'Dadus Pessoal Alumni',
        'lumni':lumni 
    }
    return render(request, 'Alumi/DetailuPesoal.html', context)

@login_required
@allowed_users(allowed_roles=['Admin','Alumni'])
def edit_my_edintity(request, hashid):
    data = get_object_or_404(Alumni, hashid=hashid)
    if request.method == "POST":
        form = AlumniForm22(request.POST, instance=data)
        if form.is_valid():
            form.save()
            messages.success(request, f'Hadia Dadus Pessoal {data.name}')
            return render('Lista-pesoal-alumni', hashid=data.hashid)
        else:
            messages.error(request, f'Falha Atu Adisiona Dadus')

    else:
        form = AlumniForm22(instance=data)

    context = {
        'title': 'Altera Dadus Pessoal',
        'legend': 'Altera Dadus Pessoal',
        'data':data,
        'form':form
    }
    return render(request, 'Alumi/form.html', context)














