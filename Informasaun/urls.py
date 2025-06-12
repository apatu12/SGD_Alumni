from django.urls import path
from . import views


urlpatterns = [
    path('Pajina-Alumni.html/', views.alumni, name='Alumni'),
    path('Lista-Alumni.html/<str:pk>/', views.alm_fack, name='l-fact'),
    path('Lista-Departamento.html/<str:pk>/<str:pk2>.html/', views.list_alumni, name='l-dep'),
    path('Lista-Tinan.html/<str:pk>/', views.alumni_year, name='l-year'),
    path('Detaillu-Alumni.html/<str:pk>/', views.detaillu_Alumni, name='a-det'),
    path('Profile-Universidade.html/', views.perfil, name='u-perfile'),
    path('Fil-Engenaria.html/<str:pk>/<str:pk2>/', views.filterFacul, name='y-Fac'),
    path('Lista-Alumni-Mane.html/<str:pk>/<str:pk2>.html/', views.list_mane, name='m-list'),
    path('Lista-Alumni-Tuir-Munisipiu/<str:pk>/<str:pk2>.html/', views.alumnimunfac, name='alm-m-f')
]
