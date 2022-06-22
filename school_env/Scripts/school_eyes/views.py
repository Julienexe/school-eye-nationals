from asyncio import run_coroutine_threadsafe
import profile
from rest_framework import views, response, exceptions, permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate

from .serializer import ProfileSerializer, UserSerializer, StudentSerializer
from . import services, authentication
from school_eyes import serializer
from .models import Profile, User,Student

class RegisterApi(views.APIView):
    def post(self,request):
        serializer =UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        serializer.instance = services.create_user(user_dc=data)

        print(data)

        return response.Response(data=serializer.data)

class LoginApi(views.APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = services.user_email_selector(email=email)

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid Credentials")

        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid Credentials")

        token = services.create_token(user_id=user.id)

        user = authenticate(email=email, password=password)

        user_info = {"email":user.email,"institution":user.name,"id":user.id}

        resp = response.Response(data=user_info)

        resp.set_cookie(key="jwt", value=token, httponly=True)

        return resp
        
class UserApi(views.APIView):
    """
    can only be used when user is authenticated
    """
    authentication_classes=(authentication.CustomAuthentication,)
    permission_classes=(permissions.IsAuthenticated,)

    def get(self,request):
        user = request.user
        serializer = UserSerializer(user)

        return response.Response(serializer.data)

class LogoutApi(views.APIView):
    authentication_classes=(authentication.CustomAuthentication,)
    permission_classes=(permissions.IsAuthenticated,)

    def post(self, request):
        resp = response.Response()
        resp.delete_cookie("jwt")
        resp.data = {"message":"bye"}

        return resp

@api_view(['GET','POST'])
def student(request):
    data = request.data
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        '''request.data["first_name"] = firs
        request.data["last_name"] = surname'''
        #serializer.save()
        serializer.create(data)
    return Response(serializer.data)

class StudentApi(views.APIView):
    # authentication_classes=(authentication.CustomAuthentication,)
    # permission_classes=(permissions.IsAuthenticated,)
    
    def get(self,request):
        #user = request.user
        # user_id = user.id
        students = Student.objects.all()
        serializer = StudentSerializer(students,many=True)
        return Response(serializer.data)

    def post(self,request):
        #validated_data = request.data
        serializer = StudentSerializer(data = request.data)
        school_id = request.data['user_id']
        current_school = User.objects.get(id = school_id)

        if serializer.is_valid():
            serializer.save(school = current_school)
            return Response(serializer.data)
        #return Response()


class ProfileApi(views.APIView):
    #GET REQUEST AND PUT REQUEST NOW WORKING :)
    def get(self,request):
        current_user = request.user
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)
    def post(self,request):
    #authentication_classes=(authentication.CustomAuthentication,)
    #permission_classes=(permissions.IsAuthenticated,)
        #current_user = request.user
        # profile = current_user.profile
        user_id = request.data['user']
        current_user = User.objects.get(id = user_id)
        profile = current_user.profile
        serializer = ProfileSerializer(profile,data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data["success"] = "update successful"
            return Response(data=data)
        return Response(serializer.data)

@api_view(['GET'])
def schools_api(request):
    schools = User.objects.filter(is_staff= False)
    serializer = UserSerializer(schools, many=True)
    return Response(serializer.data)
