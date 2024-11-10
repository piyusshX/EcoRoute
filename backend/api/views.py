import os
import sys
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
import requests
from rest_framework import status, generics
import math
import json
from urllib.parse import urlencode
from django.http import JsonResponse


from django.db.models.signals import post_save
from django.dispatch import receiver
from .serializers import RegisterSerializer, UserProfileSerializer
from .models import Routes, UserProfile, User

# ml model import karna bhari pad raha
root_dir = os.path.abspath(__file__)
for _ in range(3):  # Move up 2 levels
    root_dir = os.path.dirname(root_dir)

# Add the ml_models directory to sys.path
sys.path.append(os.path.join(root_dir, 'ml_models'))

# Now we can import from ml_models
from emissions.model import predict_emission

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        # Create a profile when a user is created
        UserProfile.objects.create(user=instance)
    # Update the profile when the user is saved (e.g., to add bio or profile image)
    instance.userprofile.save()


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated] # Require Login

    def post(self, request):
        request.user.auth_token.delete()  # Delete the user's token
        return Response({"message": "Logged out successfully"}, status=200)

class FindOptimalRouteSingle(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Log the incoming request data to inspect it
        print("Received request data:", json.dumps(request.data))  # Correct way to print request data

        # Fetch data from the request (use request.data for JSON body)
        delivery_location = request.data.get("delivery_location")
        agent_location = request.data.get("agent_location")
        vehicle_type = request.data.get("vehicle_type")
        route_pref = request.data.get("route_pref")
        Fuel = request.data.get("Fuel")

        # Ensure required data is present
        if not all([delivery_location, vehicle_type]):
            return Response({"error": "Missing required parameters."}, status=400)

        # Default agent location if missing (this part can be toggled)
        # Uncomment the next lines to set a default agent location when it's null
        if not agent_location:
            agent_location = {
                "lat": 52.5200,  # Example: Berlin's latitude
                "lng": 13.4050   # Example: Berlin's longitude
            }

        # If agent_location is null, we can skip the default value or handle it differently
        if not agent_location:
            return Response({"error": "Agent location is required."}, status=400)

        # Example API request to the HERE Routes API v8
        api_key = "3TWVpmzl3O8Auvj5ZH3SbJ8OmetgN7BiT185Q-AzaT0"
        url = "https://router.hereapi.com/v8/routes"
        
        # Setting up the parameters for the request
        params = {
            "origin": f"{agent_location['lat']},{agent_location['lng']}",
            "destination": f"{delivery_location['lat']},{delivery_location['lng']}",
            "transportMode": vehicle_type,  # assuming vehicle type translates to transport mode
            # "routingMode": speed,
            "alternatives": 0,
            "return": "summary",  # request polyline and summary (includes route length)
            "apikey": api_key
        }

        # Make the API request to HERE
        response = requests.get(url, params=params)

        # Check if the response is successful
        if response.status_code == 200:
            route_data = response.json()  # Parse JSON data from the response

            user = request.user
            pred = predict_emission([vehicle_type, Fuel, 1500, 3])

            data = Routes(user=user,distance=route_data["routes"][0]["sections"][0]["summary"]["length"], duration=route_data["routes"][0]["sections"][0]["summary"]["duration"], routes=route_data, delivery_location=delivery_location, agent_location=agent_location, route_pref=route_pref, vehicle_type=vehicle_type, co_emission=pred)
            data.save()

            return Response({'success': 'data uploaded, route data saved'}, status=200)
        
        # If the request failed, include the response details
        return Response({"error": "Failed to retrieve route.", "details": response.json()}, status=response.status_code)

class GetPlace(APIView):
    def post(self, request):
        # Retrieve the place name from the request data, with a default value of 'delhi'
        place_name = request.data.get('place', 'delhi')
        
        # Construct the URL for the API request
        apiKey = '3TWVpmzl3O8Auvj5ZH3SbJ8OmetgN7BiT185Q-AzaT0'
        url = f'https://geocode.search.hereapi.com/v1/geocode?q={place_name}&apiKey={apiKey}'
        
        # Print the URL (useful for debugging)
        print(f"The address url is: {url}")
        
        # Send the request to the API
        response = requests.get(url)
        
        # Process the response from the API
        if response.status_code == 200:
            data = response.json()
            items = data.get('items', [])
            if items:
                position = items[0].get("position", {})
                lat = position.get("lat")
                lng = position.get("lng")
                query_score = items[0].get("scoring", {}).get("queryScore")
                
                # Return the results as JSON (only latitude, longitude, and queryScore)
                return Response({
                    "latitude": lat, 
                    "longitude": lng, 
                    "queryScore": query_score
                })
            
            # Return None values if no items were found
            return Response({
                "latitude": None, 
                "longitude": None, 
                "queryScore": None
            })
        else:
            # Handle error response status
            return Response({"error": f"Error: {response.status_code}"})

class UserRoutesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch all routes for the authenticated user
        user_routes = Routes.objects.filter(user=request.user)
        
        response_data = []

        for route in user_routes:
            route_data = {
                "user": route.user.username,
                "delivery_location": route.delivery_location,
                "agent_location": route.agent_location,
                "vehicle_type": route.vehicle_type,
                "route_pref": route.route_pref,
                "co_emission": route.co_emission,
            }

            # Exclude polyline from the nested 'routes' field
            filtered_routes = []

            # if route.routes:
            #     for route_section in route.routes:
            #         # Check if route_section is a dictionary (normal section) or string (e.g., polyline)
            #         if isinstance(route_section, dict):
            #             # If it's a dictionary, remove 'polyline' field
            #             route_section_copy = route_section.copy()  # Make a copy of the section
            #             route_section_copy.pop('polyline', None)  # Remove the 'polyline' key if it exists
            #             filtered_routes.append(route_section_copy)
            #         elif isinstance(route_section, str):
            #             # If it's a string (e.g., polyline), just append it as-is
            #             filtered_routes.append(route_section)

            route_data['routes'] = route.routes  # Assign the filtered routes without polyline
            response_data.append(route_data)

        return JsonResponse(response_data, safe=False, status=status.HTTP_200_OK)

class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can update

    def get(self, request):
        # Get the user profile for the logged-in user
        try:
            profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        # Update the user's profile (bio and/or image)
        try:
            profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(profile, data=request.data, partial=False)  # Set partial=True to allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        # Allow partial updates (e.g., just the bio or just the image)
        try:
            profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(profile, data=request.data, partial=True)  # partial=True allows partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)