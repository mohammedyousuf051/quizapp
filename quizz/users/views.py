
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import get_user_model
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes
from .models import UserProfile


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
def login(request):
    try:
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        if username == "" or password == "":
            return Response({"status": "failure"})
        if username is not None or password is not None:
            user = authenticate(username=username, password=password)
            print(user)
            if user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                print(token.key)
                # u = UserProfile()
                # priv = u.objects.get(user = username)
                # print(priv)
                response=Response({"status": "success", "user": username, "token": token.key})
                response.set_cookie(key="token",value=token,max_age=900)
                return response
            else:
                return Response({"status": "failure"})
        else:
            return Response({"status": "Enter User name and password"})
    except json.decoder.JSONDecodeError as e:
        return Response({"status":"failed","exception":str(e)})
    except Exception as e:
        return Response({"status": "failed", "exception": str(e)})


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create(request):
    try:
        data=request.data
        try:
            print(data['username'],data['email'])
            User=get_user_model()
            user = User.objects.create_user(username=data['username'], email=data['email'], is_staff=True)
            user.set_password(data['password'])
            user.save()
            token,_=Token.objects.get_or_create(user=user)
            profile = UserProfile()
            profile.user = user
            profile.email = data.get("email")
            profile.save()
        except Exception as e:
            print("Exception is ",e)
            return Response({"status": str(e)})

        return Response({"status": "success"},status=HTTP_200_OK)


    except Exception as e:
        print("Exception is ",e)
        return Response({"status": "failed","Exception":str(e)})




