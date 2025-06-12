from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Column, Row, Div, HTML
from.models import *


class FaculdadeForm(forms.ModelForm):
    class Meta:
        model = Faculdade  
        fields = ('code', 'name')
    
    def __init__(self, *args, **kwargs):
        super(FaculdadeForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Row(
                Column('code', css_class='form-group col-md-6 mb-0'),
                Column('name', css_class='form-group col-md-6 mb-0'),
                css_class="form-row"
            ),
            HTML(""" <div class="d-flex justify-content-end">
                            <a href="javascript:window.history.back()" class="btn btn-danger btn-sm">
                        <i class="fa fa-window-close"></i> Fila
                    </a>
                            <button type="submit" class="btn btn-primary btn-sm ml-2"><i class="fa fa-save"></i> Save</button>
                        </div> """)
        )

