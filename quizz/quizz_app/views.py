
from .models import *
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.decorators import api_view
from rest_framework.authentication import get_user_model
from rest_framework.response import Response
from users.models import UserProfile
import os
from rest_framework.status import (
     HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
import json
# Create your views here.

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_quiz(request):
    data = request.data
    try:
        quizz = quiz()
        quizz.name = data["name"]
        quizz.description = data["description"]
        quizz.save()
    except Exception as e:
        print("Exception is ",e)
        return Response({"status": str(e)})

    return Response({"status": "success","id":quizz.id},status=HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_quiz(request):
    all_quiz = quiz.objects.all()
    resp = {}
    for k in all_quiz:
        resp[k.id]={}
        temp = {"name":k.name,"description":k.description,"prop":json.loads(k.prop)}
        resp[k.id] = temp
    return Response(resp)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_question(request, quiz_id):
    data = request.data
    quizdata = quiz.objects.get(id=quiz_id)
    quiz_name = quizdata.name
    quest_data = questions()
    quest_data.quiz_name = quiz.objects.get(name = quiz_name)
    quest_data.question= data["question"]
    quest_data.mcq= json.dumps(data["mcq"])
    quest_data.answer= json.dumps(data["answer"])
    quest_data.save()
    temp = json.loads(quizdata.prop)
    temp.append(quest_data.id)
    quizdata.prop = json.dumps(temp)
    quizdata.save()
    return Response({"status":"success"})


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def store_result(request, quiz_id,user):
    data = request.data
    quizdata = quiz.objects.get(id=quiz_id)
    quizdata = quizdata.name
    User = get_user_model()
    res_user = User.objects.get(username=user)
    res_data = results()
    res_data.quiz_name = quiz.objects.get(name = quizdata)
    res_data.user= res_user
    res_data.result_data= json.dumps(data)
    res_data.save()
    return Response(json.loads(res_data.result_data))




@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getquestion(request,quest_id):
    get_quest = questions.objects.get(id = quest_id)
    resp = {"question":get_quest.question,"mcq":json.loads(get_quest.mcq),"answer":json.loads(get_quest.answer)}
    return Response(resp)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getallquestion(request,quiz_id):
    quizdata = quiz.objects.get(id=quiz_id)
    quiz_name = quizdata.name
    st = quiz.objects.get(name = quiz_name)
    allquest = questions.objects.filter(quiz_name = st)
    print(allquest)
    resp = {}
    for i in allquest:
        resp[i.id]={}
        temp = {"question":i.question,"mcq":json.loads(i.mcq),"answer":json.loads(i.answer)}
        resp[i.id]= temp
    return Response(resp)


