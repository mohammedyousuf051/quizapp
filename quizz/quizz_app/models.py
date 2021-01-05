from django.db import models
from rest_framework.authentication import get_user_model
from datetime import date
from django.utils import timezone



class quiz(models.Model):
    name=models.CharField(max_length=255,unique=True)
    description=models.CharField(max_length=255,default="",null=True,blank=True)
    created_date=models.DateTimeField(default=timezone.now)
    prop = models.TextField(default=[],null=True,blank=True)

    def __str__(self):
        return str(self.name) +"_"+str(self.id)

class questions(models.Model):
    quiz_name = models.ForeignKey(quiz,on_delete=models.CASCADE)
    question = models.TextField(default="",null=True,blank=True)
    mcq = models.TextField(default=[],null=True,blank=True)
    answer=models.TextField(default=[],null=True,blank=True)
    created_date=models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.quiz_name) +"_"+str(self.id)

class results(models.Model):
    quiz_name = models.ForeignKey(quiz,on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    result_data=models.TextField(default={},null=True,blank=True)
    created_date=models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.quiz_name) +"_"+str(self.user)