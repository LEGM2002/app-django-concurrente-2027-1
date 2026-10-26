from django.db import models

# modelo supercomputadora para nuestra base de datos
class Supercomputadora(models.Model):
  nombre = models.CharField(max_length=100, unique=True)
  pais = models.CharField(max_length=100)
  cores = models.PositiveBigIntegerField()
  ram_tb = models.FloatField()
  almacenamiento_tb = models.FloatField()
  teraflops = models.FloatField()
  sistema_operativo = models.CharField(max_length=100)

  def __str__(self): # definimos cómo se representará un objeto en el admin panel
    return self.nombre