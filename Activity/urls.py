from django.urls import path

from.import views

urlpatterns=[
	path('', views.ListAc, name='A_Acti'),
	path('list-Act/', views.addActi, name='Add'),

]