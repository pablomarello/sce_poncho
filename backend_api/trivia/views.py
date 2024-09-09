from django.shortcuts import render
from rest_framework import viewsets
from .serializer import PreguntaSerializer, RespuestaIncorrectaSerializer
from .models import Pregunta, RespuestaIncorrecta

class PreguntaView(viewsets.ModelViewSet):
  serializer_class = PreguntaSerializer
  queryset = Pregunta.objects.all()

class RespuestaIncorrectaView(viewsets.ModelViewSet):
  serializer_class = RespuestaIncorrectaSerializer
  queryset = RespuestaIncorrecta.objects.all()
  

# Create your views here.
