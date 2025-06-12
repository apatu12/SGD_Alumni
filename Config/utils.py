import os, hashlib
from uuid import uuid4

def alumni_photo(instance, filename):
    upload_to = 'Alumni_data/{}'.format(instance.nre if instance.nre else 'unknown')
    field = 'Foto'
    ext = filename.split('.')[-1]
    if instance.pk:
        filename = '{}_{}.{}'.format(field, instance.nre, ext)
    else:
        filename = '{}.{}'.format(uuid4().hex, ext)
    return os.path.join(upload_to, filename)
