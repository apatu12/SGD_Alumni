from django import forms
from .models import Activity
from ckeditor.widgets import CKEditorWidget
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Column, Row, HTML


class ActiviForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorWidget())

    class Meta:
        model = Activity
        fields = ['title', 'content', 'data_create', 'foto']
        widgets = {
            'data_create': forms.DateInput(
                attrs={
                    'class': 'form-control form-group',
                    'type': 'date'
                }
            )
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Row(
                Column('title', css_class='form-group col-md-4 mb-0'),
                Column('data_create', css_class='form-group col-md-4 mb-0'),
                Column('foto', css_class='form-group col-md-4 mb-0'),
            ),
            Row(
                Column('content', css_class='form-group col-md-12 mb-0'),
            ),
            HTML("""
                <button type="submit" class="btn btn-primary btn-sm">
                    <i class="fa fa-save"></i> Save
                </button>
            """)
        )
