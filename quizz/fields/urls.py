
from django.contrib import admin
from django.urls import path,include
from . import views
from django.conf.urls import url


urlpatterns = [
    path('login/', views.login,name="login"),
    path('signup/', views.signup,name="signup"),
    path('index/', views.index,name="index"),
    path('new/', views.newquiz,name="new"),
    path('test/', views.test,name="test"),
    ]