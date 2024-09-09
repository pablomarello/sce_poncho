from rest_framework.views import APIView
from rest_framework import generics
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializer import ExportacionesSerializer
from .models import Exportacion, Pais
from exportaciones.serializer import  ExportacionesSerializer
from .serializer import PaisSerializer, ProductoSerializer



class ExportacionView(viewsets.ModelViewSet):
    queryset = Exportacion.objects.all()
    serializer_class = ExportacionesSerializer


""" class ExportacionesMapaView(APIView):
    def get(self, request):
        paises_con_exportaciones = Pais.objects.filter(exportaciones__isnull=False).distinct()
        serializer = ExportacionPorPaisSerializer(paises_con_exportaciones, many=True)
        data = {
            "type": "FeatureCollection",
            "features": []
        }
        for pais_data in serializer.data:
            feature = {
                "type": "Feature",
                "properties": {
                    "pais": pais_data['nombre'],
                    "productos": pais_data['productos']
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        float(pais_data['longitud']),
                        float(pais_data['latitud'])
                    ]
                }
            }
            data["features"].append(feature)
        return Response(data) """


# Create your views here.
