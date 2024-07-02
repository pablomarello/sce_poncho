from django.urls import path, include
from rest_framework import routers
from productos import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'productos',views.ProductoView,'productos')

urlpatterns = [
    path('api/', include(router.urls) ),
    path('docs/', include_docs_urls(title="Productos API")),
]
