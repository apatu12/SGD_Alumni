from django.shortcuts import render, redirect
from .models import *
# Create your views here.

def load_postu(request):
    municipality_id = request.GET.get('municipality')  
    post = AdministrativePost.objects.filter(municipality_id=municipality_id).order_by('name')
    return render(request, 'Ajax/load_postu.html', {'post': post})

def load_suku(request):
    administrativePost_id = request.GET.get('administrativePostId')  
    suku = Village.objects.filter(administrativePost_id=administrativePost_id).order_by('name')
    return render(request, 'Ajax/load_suku.html', {'suku': suku})

def load_aldeia(request):
    village_id = request.GET.get('village') 
    aldeia = SubVillage.objects.filter(village_id=village_id).order_by('name')
    return render(request, 'Ajax/load_aldeia.html', {'aldeia': aldeia})
