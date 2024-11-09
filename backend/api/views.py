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

from .serializers import RegisterSerializer
from .models import Routes

# ml model import karna bhari pad raha
root_dir = os.path.abspath(__file__)
for _ in range(3):  # Move up 2 levels
    root_dir = os.path.dirname(root_dir)

# Add the ml_models directory to sys.path
sys.path.append(os.path.join(root_dir, 'ml_models'))

# Now we can import from ml_models
from emissions.model import predict_emission

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

import json
import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class FindOptimalRouteSingle(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Log the incoming request data to inspect it
        print("Received request data:", json.dumps(request.data))  # Correct way to print request data

        # Fetch data from the request (use request.data for JSON body)
        delivery_location = request.data.get("delivery_location")
        agent_location = request.data.get("agent_location")
        vehicle_type = request.data.get("vehicle_type")
        speed = request.data.get("speed")

        # Ensure required data is present
        if not all([delivery_location, agent_location, vehicle_type]):
            return Response({"error": "Missing required parameters."}, status=400)

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
            "return": "polyline,summary",  # request polyline and summary (includes route length)
            "apikey": api_key
        }

        # Make the API request to HERE
        response = requests.get(url, params=params)

        # Check if the response is successful
        if response.status_code == 200:
            route_data = response.json()  # Parse JSON data from the response

            user = request.user
            data = Routes(user=user, routes=route_data, delivery_location=delivery_location, agent_location=agent_location, speed=speed, vehicle_type=vehicle_type)
            data.save()

            predict_emission()

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
