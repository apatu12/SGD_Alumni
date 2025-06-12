from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Column, Row, Div, HTML
from crispy_forms.bootstrap import TabHolder, Tab
from Alumni.models import Alumni


class UploadFileForm(forms.Form):
    file = forms.FileField()

class UploadExcelForm(forms.Form):
    file = forms.FileField()

class AlumniForm(forms.ModelForm):
    class Meta:
        model = Alumni
        fields = ['nre','name','sex','dob','pob','faculdade','departamento',\
        			'mun','post','suk','ald','start_date','orientadorI','orientadorII','title','point','predict',\
        			'fname','mname','Tpone','email','foto','paddres']
        widgets = {
            'dob': forms.DateInput(attrs={'type': 'date'}),
            'create_at': forms.DateInput(attrs={'type': 'date'}),
        }

    def __init__(self, *args, **kwargs):
        super(AlumniForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Row(
                Column('nre', css_class='form-group col-md-4 mb-0'),
                Column('name', css_class='form-group col-md-4 mb-0'),
                Column('sex', css_class='form-group col-md-4 mb-0'),
            ),
            Row(
                Column('dob', css_class='form-group col-md-6 mb-0'),
                Column('pob', css_class='form-group col-md-6 mb-0'),
            ),
            Row(
                Column('faculdade', css_class='form-group col-md-6 mb-0'),
                Column('departamento', css_class='form-group col-md-6 mb-0'),
            ),
            Row(
                Column('orientadorI', css_class='form-group col-md-6 mb-0'),
                Column('orientadorII', css_class='form-group col-md-6 mb-0'),
            ),
            Row(
                Column('mun', css_class='form-group col-md-3 mb-0'),
                Column('post', css_class='form-group col-md-3 mb-0'),
                Column('suk', css_class='form-group col-md-3 mb-0'),
                 Column('ald', css_class='form-group col-md-3 mb-0'),
            ),
            Row(
                Column('start_date', css_class='form-group col-md-12 mb-0'),
              
            ),
            Row(
                Column('title', css_class='form-group col-md-6 mb-0'),
                Column('point', css_class='form-group col-md-3 mb-0'),
                Column('predict', css_class='form-group col-md-3 mb-0'),
            ),
            Row(
                Column('fname', css_class='form-group col-md-3 mb-0'),
                Column('mname', css_class='form-group col-md-3 mb-0'),
                Column('Tpone',css_class='form-group col-md-3 mb-0'),
                Column('email', css_class='form-group col-md-3 mb-0'),
            ),
            Row(
                Column('foto', css_class='form-group col-md-6 mb-0'),
                Column('paddres', css_class='form-group col-md-6 mb-0'),
            ),
             HTML("""
                <div class="d-flex justify-content-end mt-3">
                    <a href="javascript:window.history.back()" class="btn btn-danger btn-sm">
                        <i class="fa fa-window-close"></i> Fila
                    </a>
                    <button type="submit" class="btn btn-primary btn-sm ml-2">
                        <i class="fa fa-save"></i> Save
                    </button>
                </div>
            """)
)

from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Row, Column, HTML
from crispy_forms.bootstrap import TabHolder, Tab
from .models import Alumni

class AlumniForm22(forms.ModelForm):
    class Meta:
        model = Alumni
        fields = [
            'nre', 'name', 'sex', 'dob', 'pob', 'faculdade', 'departamento',
            'mun', 'post', 'suk', 'ald', 'start_date', 'orientadorI', 'orientadorII',
            'title', 'point', 'predict', 'fname', 'mname', 'Tpone', 'email', 'foto', 'paddres',
          
        ]
        widgets = {
            'dob': forms.DateInput(attrs={'type': 'date'}),
            'start_date': forms.DateInput(attrs={'type': 'date'}),
        }

    def __init__(self, *args, **kwargs):
        super(AlumniForm22, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            TabHolder(
                Tab('Identidade Pessoal',
                    Row(
                        Column('nre', css_class='form-group col-md-4 mb-0'),
                        Column('name', css_class='form-group col-md-4 mb-0'),
                        Column('sex', css_class='form-group col-md-4 mb-0'),
                    ),
                    Row(
                        Column('dob', css_class='form-group col-md-6 mb-0'),
                        Column('pob', css_class='form-group col-md-6 mb-0'),
                    ),
                    Row(
                        Column('faculdade', css_class='form-group col-md-6 mb-0'),
                        Column('departamento', css_class='form-group col-md-6 mb-0'),
                    ),
                    Row(
                        Column('orientadorI', css_class='form-group col-md-6 mb-0'),
                        Column('orientadorII', css_class='form-group col-md-6 mb-0'),
                    ),
                    Row(
                        Column('mun', css_class='form-group col-md-3 mb-0'),
                        Column('post', css_class='form-group col-md-3 mb-0'),
                        Column('suk', css_class='form-group col-md-3 mb-0'),
                        Column('ald', css_class='form-group col-md-3 mb-0'),
                    ),
                    Row(
                        Column('start_date', css_class='form-group col-md-12 mb-0'),
                    ),
                    Row(
                        Column('title', css_class='form-group col-md-6 mb-0'),
                        Column('point', css_class='form-group col-md-3 mb-0'),
                        Column('predict', css_class='form-group col-md-3 mb-0'),
                    ),
                    
                    
                ),

                Tab('Kareira Servisu',
                   Row(
                        Column('fname', css_class='form-group col-md-3 mb-0'),
                        Column('mname', css_class='form-group col-md-3 mb-0'),
                        Column('Tpone', css_class='form-group col-md-3 mb-0'),
                        Column('email', css_class='form-group col-md-3 mb-0'),
                    ),
                ),

                Tab('Kontinua Estudo',
                    Row(
                        Column('foto', css_class='form-group col-md-6 mb-0'),
                        Column('paddres', css_class='form-group col-md-6 mb-0'),
                    ),
                ),
            ),
                 HTML("""
                    <div class="d-flex justify-content-end mt-3">
                        <a href="javascript:window.history.back()" class="btn btn-danger btn-sm">
                            <i class="fa fa-window-close"></i> Fila
                        </a>
                        <button type="submit" class="btn btn-primary btn-sm ml-2">
                            <i class="fa fa-save"></i> Save
                        </button>
                    </div>
                """)
        )
