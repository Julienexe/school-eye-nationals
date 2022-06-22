from django.conf import settings
from rest_framework import authentication, exceptions
import jwt
from rest_framework.authentication import BaseAuthentication

from . import models

class CustomAuthentication(BaseAuthentication):

    def authenticate(self,request):
        token = request.COOKIES.get("jwt")

        if not token :
            return None

        try :
            payload = jwt.decode(token,settings.JWT_SECRET,algorithms="HS256")
        except:
            raise exceptions.AuthenticationFailed("unauthorised")
        
        user = models.User.objects.filter(id = payload["id"]).first()

        return (user, None)
