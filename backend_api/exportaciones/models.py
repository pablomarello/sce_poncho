from django.db import models
from productos .models import Producto
from geo .models import Pais

class Exportacion(models.Model):
  destino = models.ForeignKey(Pais, on_delete=models.CASCADE, blank=True, null=True)
  producto = models.ForeignKey(Producto, on_delete=models.CASCADE, blank=True, null=True)
  fob_dolar = models.FloatField(blank=True,null=True)
  peso_neto = models.BigIntegerField(blank=True,null=True)
  año = models.IntegerField(blank=True,null=True,verbose_name="Año")

# Create your models here.
