from django.db import models
from rubros .models import Rubro

class Producto(models.Model):
  nombre = models.CharField(max_length=400)
  rubro = models.ForeignKey(Rubro, on_delete=models.CASCADE, related_name='rubros', blank=True,null=True)
  imagen = models.ImageField(upload_to='productos/', blank=True, null=True)
  def __str__(self):
    return self.nombre
# Create your models here.
