from django.urls import path

from.import views

urlpatterns=[
	path('',views.listDocen, name='D_Lst'),
	path('Add-Doc/', views.AddDoc, name='add'),
	path('Ed-Ddc/<int:id>/', views.HadiaDoc, name='Edt'),
	path('Del-Doce/HamosDoc/<int:id>/', views.HamosDoc, name='delete'),
	path('Lista-Docente-Tuir-Faculdade.html/<str:pk>/', views.doc_fac, name='obj-doc'),
]