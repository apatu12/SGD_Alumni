from django.urls import path
from . import views
from . import Lviews

urlpatterns =[
	path('Alumi-list/',views.LisAlumi, name='ALm'),
	path('Adisiona-Alumni/', views.AddAlmni, name='a-alm'),
	path('List-Det/AlumiDet/<int:id>/', views.AlumiDet, name='Det_ALm' ),
	path('Hamos-List/hamosAlm/<int:id>/', views.hamosAlm, name='H-ALM'),
	path('Exporta-Dadus-Alumni.html/', views.export_alumni_csv, name='e-csv'),
	path('Importa-Dadus-Alumni.html/', views.import_alumni, name='i-file'),
	path('Hamos-Dadus-Alimni.html/<str:pk>/', views.soft_delete, name='sof-delete'),

	#filterMun
	path('Lista-Alumni-Munisipiu.html/<str:pk>/', Lviews.alimnimun, name='ald-mun'),
	path('Lista-Alumni-Feto-Munisipiu/<str:pk>/', Lviews.alimnifmun, name='falm-mun'),
	path('Lista-Alumni-Munisipiu-All/<str:pk>', Lviews.alimnimunall, name='all-mun'),
	path('Lista-Alumni-Munisipiu-Tinan/<str:pk>/', Lviews.alm_mun, name='all-tinan-mun'),

	path('Lista-Alumni-Ano.html/<str:pk>/',Lviews.alumni_ano, name='Lista-Ano-mun'),
	path('Lista-HadiaAlumni.html/<str:pk>/', views.HadiaAlumni, name='Hadia-Alumi'),


	# lista Pesoal ALumni
	path('Lista-AlumniPesoal.html/', views.lista_pes_alumni, name='Lista-pesoal-alumni'),
	path('Importa-Dadus-Alumni-Excel.html/', views.import_alumni_excel, name='excel-import'),
	path('Altera-Dadus-Pessoal/<str:hashid>/', views.edit_my_edintity, name='edit-my-data')


]