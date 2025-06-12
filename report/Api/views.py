from django.shortcuts import render, get_object_or_404
from django.db.models import Sum, Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from Alumni.models import *
from Costum.models import *
from Faculdade.models import *

# Create your views here.

class APIMun(APIView):
	permission_classes = [AllowAny]
	def get(self, request, format=None):
		label, obj = list(), list()
		muns = Municipality.objects.filter().all()

		for m in muns:
			k = Alumni.objects.filter(is_active=True, mun=m).count()
			label.append(m.name)
			obj.append(k)

		data = {'label':label, 'obj':obj}
		return Response(data)


class APIFac(APIView):
	authentication_classes = [SessionAuthentication, BasicAuthentication]
	permission_classes = [IsAuthenticated]

	def get(self, request, format=None):
		label, obj = list(), list()
		fac = Faculdade.objects.all()

		for f in fac:
			m1 = Alumni.objects.filter(is_active=True, faculdade=f).count()
			label.append(f.code)
			obj.append(m1)

		data ={'label':label, 'obj':obj}
		return Response(data)

