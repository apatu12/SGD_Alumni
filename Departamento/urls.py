from django.urls import path


from.import views

urlpatterns=[
	path('', views.ListDep, name='L_Deps'),
	path('Add-Dep/', views.addDep, name='Add_Dep'),
	path('Hamos-Dep/hamodep/<int:id>/', views.hamodep, name='Hamo_dep'),
	path('E-Dep/editDep/<int:id>/', views.editDep, name='H_Dep'),

]