from django.db import models

# Create your models here.
class Slider(models.Model):
    title = models.CharField(max_length=200, verbose_name="TItulo Informasaun")
    description = models.TextField(verbose_name="Deskrisaun Informasaun")
    image = models.ImageField(upload_to='sliders/', verbose_name="Imajen")
    button_text = models.CharField(max_length=100, blank=True, null=True, verbose_name="Imajen Iha Button")
    button_link = models.URLField(blank=True, null=True, verbose_name="Link Butaun")
    order = models.PositiveIntegerField(default=0, verbose_name="Formatura Fo Sai")
    is_active = models.BooleanField(default=True, verbose_name="Aktivu")

    class Meta:
        ordering = ['order']
        verbose_name = "Slider"
        verbose_name_plural = "Informasaun Slider"

    def __str__(self):
        return self.title