from rest_framework import serializers
from . import services
from .models import Profile, Student
from dataclasses import fields

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only = True)
    name = serializers.CharField()
    email = serializers.CharField()
    region = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def to_internal_value(self, data):
        data=super().to_internal_value(data)

        return services.UserDataClass(**data)

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields ='__all__'

class ProfileSerializer(serializers.ModelSerializer):
    #school_name = serializers.CharField()
    class Meta:
        model = Profile
        fields = '__all__'

