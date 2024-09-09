from django.utils.html import format_html
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Producto

class ProductoResource(resources.ModelResource):
  fields = (
    'nombre',
  )
  class Meta:
    model = Producto

class ProductoAdmin(ImportExportModelAdmin):
  resource_class = ProductoResource
  list_display = ('id','nombre','rubro','imagen_thumbnail')

  def imagen_thumbnail(self, obj):
        if obj.imagen:
            return format_html('<img src="{}" width="100" height="100" />', obj.imagen.url)
        return 'Sin imagen'
  imagen_thumbnail.short_description = 'Imagen'
    
  ordering = ('nombre','id','rubro',)
  search_fields = ('id','nombre','rubro',)
  list_display_links = ('nombre',)

admin.site.register(Producto, ProductoAdmin)
# Register your models here.
