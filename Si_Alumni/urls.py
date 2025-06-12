"""
URL configuration for Si_Alumni project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from Main import views as main_views
from django.contrib.auth import views as auth_views
from django.conf.urls import handler404, handler500

admin.site.site_title ='SI-ALUMNI-UNTL'
admin.site.site_header ='SI-ALUMNI-UNTL'
admin.site.index_title ='SI-ALUMNI-UNTL'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main_views.home, name='home'),
    path('Admin-Page/', main_views.index, name='index'),
    path('Home-Page/', include('Informasaun.urls')),
    path('Login.html/', auth_views.LoginView.as_view(template_name='Home/login.html'), name='login'),
    path('Logout.html/', main_views.LoginView, name='logout'),

    #Api
    path('API/Report/', include('report.Api.urls')),
    path('Ajax/', include('Costum.urls')),

    # Lista Sira
    path('Alumi-list/', include('Alumni.urls')),
    path('Dosen-list/', include('Docente.urls')),
    path('Dep-List/', include('Departamento.urls')),
    path('Fac-List/', include('Faculdade.urls')),
    path('Act-List/', include('Activity.urls')),
    path('Account/', include('User.urls'))

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
