from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Alumni
from Alumni.resource import AlumniResource

class AlumniAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = AlumniResource

    list_display = (
        'nre', 'name', 'sex', 'dob', 'faculdade',
        'departamento', 'mun', 'post', 'suk', 'ald',
        'start_date', 'end_date', 'create_at', 'create_by', 'is_active'
    )
    list_filter = (
        'sex', 'faculdade', 'departamento', 'mun', 'post', 'suk',
        'start_date', 'end_date', 'is_active',
    )
    search_fields = ('nre', 'name', 'email', 'fname', 'mname', 'title')
    ordering = ('-create_at',)


admin.site.register(Alumni, AlumniAdmin)
