# for models
from django.db import models
from django.contrib.auth.models import User

class Routes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    routes = models.JSONField(null=True, blank=True)
    delivery_location = models.JSONField(null=True, blank=True)
    agent_location = models.JSONField(null=True, blank=True)
    vehicle_type = models.CharField(max_length=10, null=True, blank=True)
    speed = models.IntegerField(null=True, blank=True)
    # co_emission = models.IntegerField(null=True,blank=True)