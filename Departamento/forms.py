from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Column, Row, Div, HTML
from .models import Departamento

class FormDeparta(forms.ModelForm):
    class Meta:
        model = Departamento
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Row(
                Column('faculdade', css_class='form-group col-md-3 mb-0'),
                Column('code', css_class='form-group col-md-3 mb-0'),
                Column('name', css_class='form-group col-md-6 mb-0'),
            ),

                        HTML(""" <div class="d-flex justify-content-end">
                            <a href="javascript:window.history.back()" class="btn btn-danger btn-sm">
                        <i class="fa fa-window-close"></i> Fila
                    </a>
                            <button type="submit" class="btn btn-primary btn-sm ml-2"><i class="fa fa-save"></i> Save</button>
                        </div> """)
        
        )
