from django.db import models

class Rubro(models.Model):
  nombre = models.CharField(max_length=100)

# Create your models here.
