import dataclasses
import email
import datetime
import jwt
from django.conf import settings

from typing import TYPE_CHECKING

from pytz import UTC, utc
from . import models 
if TYPE_CHECKING:
    from .models import User

@dataclasses.dataclass
class UserDataClass:
    name  : str
    email : str
    region : str
    password : str = None
    id : int = None

    @classmethod
    def from_instance(cls, user: "User") -> "UserDataClass":
        return cls(
            name = user.name,
            email = user.email,
            region = user.region,
            id=user.id
        )

def create_user(user_dc:"UserDataClass") -> "UserDataClass":
    instance = models.User(
        name =user_dc.name,
        email =user_dc.email,
        region =user_dc.region
    )
    if user_dc.password is not None:
        instance.set_password(user_dc.password)
    
    instance.save()

    return UserDataClass.from_instance(instance)
def user_email_selector(email:str) -> "User":
    user = models.User.objects.filter(email=email).first()

    return user

def create_token(user_id:int) -> str:
    payload = dict(
        id = user_id,
        exp = datetime.datetime.utcnow() + datetime.timedelta(hours=24),
        iat = datetime.datetime.utcnow()
    )

    token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")

    return token

