from django.urls import path
from.import views



urlpatterns = [
    path('', views.FacList, name='f_list'), 
    path('Lis-addfac/', views.Addfac, name='form_fac'),

    path('L-fakuldade.html/<str:pk>/', views.hamosfac, name='Hamos_Fac'),
    path('H-lisafakuldade.html/<str:pk>/',views.hadialist, name='H_lists'),
    
]