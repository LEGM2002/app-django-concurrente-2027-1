from rest_framework import serializers
from .models import Supercomputadora

# el serializer nos permite convertir los objetos Python 
# de nuestra base de datos a JSON y viceversa, para poder 
# enviarlos a nuestro front, valida datos que entran a la API
class SupercomputadoraSerializer(serializers.ModelSerializer):
  class Meta:
    model = Supercomputadora
    fields = '__all__'