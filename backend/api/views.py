from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Supercomputadora
from .serializers import SupercomputadoraSerializer


@api_view(["GET", "POST"])
def lista(request):
    if request.method == "GET":  # si es GET sin pk es general para visualizar todas las super computadoras
        data = SupercomputadoraSerializer(Supercomputadora.objects.all(), many=True).data
        return Response(data) # retornar los objetos Python ya en JSON

    serializer = SupercomputadoraSerializer(data=request.data)  # si es POST (no se necesita pk)
    serializer.is_valid(raise_exception=True) # verifica que sea válido el formato
    serializer.save() # guarda el objeto a la base
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def detalle(request, pk):
    obj = get_object_or_404(Supercomputadora, pk=pk) # busca por pk

    if request.method == "GET":  # GET con pk para visualizar una supercomputadora
        return Response(SupercomputadoraSerializer(obj).data)

    if request.method == "DELETE":  # DELETE para borrar una supercomputadora por pk
        obj.delete() # lo borra
        return Response(status=status.HTTP_204_NO_CONTENT)

    # para editar objeto PUT edita todo el objeto, PATCH edita parcialmente
    serializer = SupercomputadoraSerializer(obj, data=request.data, partial=(request.method == "PATCH"))
    serializer.is_valid(raise_exception=True) # los datos tienen formato válido y además no se violan restricciones
    serializer.save()
    return Response(serializer.data)