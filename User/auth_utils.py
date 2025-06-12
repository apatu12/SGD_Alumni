from Alumni.models import *

def c_user_fun(user):
	objects = Alumni.objects.filter(alumniuser__user=user).prefetch_related('alumniuser').first()
	obj = ""
	if objects: obj = objects
	return obj