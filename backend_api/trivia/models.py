from django.db import models

class Pregunta (models.Model):
    question = models.CharField(max_length=255,verbose_name='Pregunta')
    correct_answer = models.CharField(max_length=255,verbose_name='Respuesta Correcta')

    def __str__(self):
        return self.question

class RespuestaIncorrecta(models.Model):
    question_inc = models.ForeignKey(Pregunta, related_name='incorrect_answers',verbose_name='Pregunta', on_delete=models.CASCADE)
    answer_incorrect = models.CharField(max_length=255,verbose_name='Respuesta Incorrecta')

    def __str__(self):
        return self.answer_incorrect

# Create your models here.
