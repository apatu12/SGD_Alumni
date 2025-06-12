from django.urls import path
from . import views


urlpatterns = [
    path('Pajina-Utilizador-Alumni.html/', views.Alumni_user, name='Au-list'),
    path('account/', views.AccountUpdate, name='user-account'),
    path('change/password/', views.UserPasswordChangeView.as_view(), name='user-change-password'),
    path('change/password/done/', views.UserPasswordChangeDoneView.as_view(), name='user-change-password-done'),
    path('User-UserAlumi.html/', views.perfilUser, name='Perfil'),
]