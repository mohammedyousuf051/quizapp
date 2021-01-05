from django.shortcuts import render

# Create your views here.
def signup(request):
    return render(request,template_name="siginup.html")

def login(request):
    return render(request, template_name="login.html")

def index(request):
    return render(request,template_name="index.html")

def newquiz(request):
    return render(request, template_name="newquiz.html")

def test(request):
    return render(request, template_name="quiz.html")