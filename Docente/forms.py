from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Column, Row, Div, HTML
from .models import *



class DocentForm(forms.ModelForm):
    class Meta:
        model = Docente
        fields = ['name','sex','addres','level','faculdade','departamento','munisipiu']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Row(
                Column('name', css_class='form-group col-md-6 mb-0'),
                Column('sex', css_class='form-group col-md-6 mb-0'),
            ),
            Row(
                Column('addres', css_class='form-group col-md-6 mb-0'),
                Column('level', css_class='form-group col-md-6 mb-0'),
            ),
             Row(
                Column('faculdade', css_class='form-group col-md-6 mb-0'),
                Column('departamento', css_class='form-group col-md-6 mb-0'),
                Column('munisipiu', css_class='form-group col-md-6 mb-0'),
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
