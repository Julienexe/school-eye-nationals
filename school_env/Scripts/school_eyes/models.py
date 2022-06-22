from django.db import models
'''from django.contrib.auth.models import User'''
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import (
    BaseUserManager, AbstractUser
)


class UserManager(BaseUserManager):
    def create_user(self, name:str, email:str, region:str,password:str = None, is_staff=False, is_superuser=False) -> "User":
        if not email:
            raise ValueError("User must have an email")
        if not name:
            raise ValueError("User must have a first name")
        #if not last_name:
        #    raise ValueError("User must have a last name")
        
        user = self.model(email=self.normalize_email(email))
        user.name = name
        user.region = region
        #user.last_name = last_name
        user.set_password(password)
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser = is_superuser

        return user

    def create_superuser(self, name: str, email:str, password:str) -> "User":
        user = self.create_user(
            name=name,
            #last_name= last_name,
            email= email,
            password=password,
            is_staff=True,
            is_superuser=True
        )
        user.save()


'''class to specify new user fields'''
class User(AbstractUser):
    name = models.CharField(verbose_name="Name", max_length=255)
    #last_name = models.CharField(verbose_name="Last Name" , max_length=255)
    password = models.CharField(max_length= 255)
    region = models.CharField(max_length=25)


    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    username = None
    objects = UserManager()


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','region']


'''class to govern all the subjects in school eye'''
class Subject(models.Model):
    SUBJECTS= [
            ('Physics', 'Physics'),
            ('Chemistry', 'Chemistry'),
            ('Maths', 'Maths'),
            
        ]


    text = models.CharField(max_length=20, choices=SUBJECTS)
    #papers= models.ManyToManyField(Paper)
    #topics = models.ManyToOneRel(Topic, on_delete=models.CASCADE)
    #school = models.ForeignKey(User,on_delete=models.CASCADE)
    def __str__(self):
        #return a string rep of the model
        return self.text

#topic
class Topic(models.Model):
    #for coverage
    COVERAGE_CHOICES = [
            ('0', '0'),
            ('25', '25'),
            ('75', '75'),
            ('100', '100'),
        ]


    text = models.CharField(max_length=70)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null='TRUE', blank='TRUE')
    #school = models.ForeignKey(User,on_delete=models.CASCADE)

    #general or default coverage for topics
    coverage = models.CharField(max_length=10,choices=COVERAGE_CHOICES )

    def __str__(self):
        return self.text

#user profiles to pass on coverage data 
class Profile(models.Model):
    user = models.OneToOneField(User,related_name='profile',null=True, on_delete=models.CASCADE)

    #coverage fields to be added here
    coverage = models.TextField()

    def __str__(self):
        #return a string rep of the model
        return str(self.user)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    #instance.profile.save()


@receiver(post_save, sender=User)
def save_user_profile(sender,instance, **kwargs):
    instance.profile.save()

class Student(models.Model):
    first_name = models.CharField(max_length=20)
    given_name = models.CharField(max_length=20)
    ID_Number = models.IntegerField(null=True)
    combination = models.CharField(max_length=20)
    school = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    score = models.TextField(default="25")
    DOB = models.CharField(max_length=15,default=18)

    def __str__(self):
        return str(self.first_name)
    
    #DOB = models.DateTimeField()