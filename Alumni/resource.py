from import_export import resources
from .models import Alumni

class AlumniResource(resources.ModelResource):
    class Meta:
        model = Alumni
        skip_unchanged = True
        report_skipped = True
        import_id_fields = ('nre',) 

class AlumnisResources(resources.ModelResource):
    class Meta:
        model = Alumni
        import_id_fields = ['nre']
        fields = (
            'nre', 'name', 'sex', 'dob', 'pob',
            'faculdade', 'departamento', 'mun', 'post', 'suk', 'ald',
            'start_date', 'end_date', 'title', 'point', 'predict',
            'fname', 'mname', 'email', 'paddres', 'is_active'
        )
