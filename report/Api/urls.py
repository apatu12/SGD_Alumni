from django.urls import path
from . import views

urlpatterns=[
	path('Alumni/mun/', views.APIMun.as_view()),
	path('Alumni/fac/', views.APIFac.as_view()),
]