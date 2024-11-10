from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(null=True, blank=True)  # Bio field to save text
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)  # Image field for profile picture

    def __str__(self):
        return f"{self.user.username}'s Profile"

class Routes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    routes = models.JSONField(null=True, blank=True)
    delivery_location = models.JSONField(null=True, blank=True)
    agent_location = models.JSONField(null=True, blank=True)
    vehicle_type = models.CharField(max_length=10, null=True, blank=True)
    route_pref = models.CharField(max_length=10, null=True, blank=True)
    co_emission = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Route for {self.user.username}"
