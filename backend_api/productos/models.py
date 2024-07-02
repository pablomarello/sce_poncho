from django.db import models

class Producto(models.Model):
  nombre = models.CharField(max_length=100)
  fob_dolar = models.IntegerField(blank=True,null=True)
  peso_neto = models.IntegerField(blank=True,null=True)
  rubro_id = models.IntegerField(blank=True,null=True)
  def __str__(self):
    return self.nombre
# Create your models here.
