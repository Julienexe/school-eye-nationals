from django.contrib import admin

from .models import Subject,User, Topic, Student,Profile


admin.site.register(Subject)
admin.site.register(User)
admin.site.register(Topic)
admin.site.register(Profile)
admin.site.register(Student)