from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Rubro

class RubroResource(resources.ModelResource):
  fields = (
    'nombre',
  )
  class Meta:
    model = Rubro

class RubroAdmin(ImportExportModelAdmin):
  resource_class = RubroResource
  list_display = ('id','nombre')
  ordering = ('nombre','id',)
  search_fields = ('id','nombre',)
  list_display_links = ('nombre',)
  

admin.site.register(Rubro, RubroAdmin)

# Register your models here.
