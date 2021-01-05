
from django.urls import path
from django.conf.urls import url
from . import views


urlpatterns = [
    path('create_quiz/',views.create_quiz,name="create_quiz"),
    path('get_quiz/',views.get_quiz,name="get_quiz"),
    path('create_question/<slug:quiz_id>',views.create_question,name="create_question"),
    path('getallquestion/<slug:quiz_id>',views.getallquestion,name="create_question"),
    path('getquestion/<slug:quest_id>',views.getquestion,name="getquestion"),
    path('store_result/<slug:quiz_id>/<slug:user>',views.store_result,name="store_result"),
    ]