from django.shortcuts import render
from rest_framework import viewsets
from .serializer import ProductoSerializer
from .models import Producto

#crud productos
class ProductoView(viewsets.ModelViewSet):
  serializer_class = ProductoSerializer
  queryset = Producto.objects.all()

