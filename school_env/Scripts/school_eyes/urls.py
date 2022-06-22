from django.contrib import admin
from django.urls import path
from .views import RegisterApi, LoginApi,UserApi,LogoutApi,StudentApi,ProfileApi
from . import views

app_name = 'school_eyes'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegisterApi.as_view(), name="register"),
    path('login/', LoginApi.as_view(), name="login"),
    path('user/', UserApi.as_view(), name="user"),
    #duuhhh
    path('logout/', LogoutApi.as_view(), name="logout"),
    #access to all students in a school and a form to add new ones
    path('student/', StudentApi.as_view(), name="student"),
    #to access coverage of a specific user and update it
    path('profile/', ProfileApi.as_view(), name="profile"),
    #for all users
    path('users/', views.schools_api, name="schools"),
]