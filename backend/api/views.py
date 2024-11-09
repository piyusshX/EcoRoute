import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
import requests
from rest_framework import status, generics
import math

from urllib.parse import urlencode

from .serializers import RegisterSerializer

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
    def post(self, request):
        # Fetch data from the request
        delivery_location = request.data.get("delivery_location")
        agent_location = request.data.get("agent_location")
        vehicle_type = request.data.get("vehicle_type", 'scooter')
        speed = request.data.get("speed", 'fast')
        
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
            "routingMode": speed,
            "alternatives": 2,
            "return": "polyline,summary",  # request polyline and summary (includes route length)
            "apikey": api_key
        }

        # Make the API request to HERE
        response = requests.get(url, params=params)

        # Check if the response is successful
        if response.status_code == 200:
            route_data = response.json()  # Parse JSON data from the response
            return Response({'route_data':route_data}, status=200)
        #     # Extracting the route length from the summary
        #     routes = route_data.get('routes', [])
        #     if routes:
        #         route_summary = routes[0].get('summary', {})
        #         route_length = route_summary.get('length', None)  # Length in meters
        #         # if route_length is not None:
        #         #     return Response({"route_length": route_length}, status=200)
        #         # else:
        #         #     return Response({"error": "Route length not available."}, status=500)
            # else:
            #     return Response({"error": "No routes found."}, status=500)
        return Response({"error": "Failed to retrieve route."}, status=response.status_code)


# this model is also not done yet
class FindOptimalRoute(APIView):

    def post(self, request):
        # Parse input data, with defaults to dummy data if not provided
        user_gps = request.data.get('user_gps', {'lat': 28.6139, 'lon': 77.2090})  # Delhi coordinates
        delivery_locations = request.data.get('delivery_locations', [
            {'lat': 28.7041, 'lon': 77.1025},  # Location A (Delhi area)
            {'lat': 28.5355, 'lon': 77.3910},  # Location B (nearby)
            {'lat': 28.4595, 'lon': 77.0266},  # Location C (further away)
            {'lat': 28.4089, 'lon': 77.3178}   # Location D (another nearby location)
        ])
        priority_order = request.data.get('priority_order', [1, 2, 3, 4])
        vehicle_type = request.data.get('vehicle_type', 'bike')  # Default vehicle

        # Step 2: Calculate distances and create a weighted graph
        graph = self.create_weighted_graph(user_gps, delivery_locations, priority_order, vehicle_type)

        # Step 3: Fetch traffic data and update the graph (dummy traffic data here)
        graph_with_traffic = self.modify_graph_with_traffic(graph)

        # Step 4: Apply a route optimization algorithm (dummy TSP solution here)
        optimal_route = self.find_optimal_route(graph_with_traffic)

        return Response({"optimal_route": optimal_route}, status=status.HTTP_200_OK)

    def create_weighted_graph(self, user_gps, delivery_locations, priority_order, vehicle_type):
        """
        Create a weighted graph with distances between all locations, including the user's starting point.
        Here we'll use Euclidean distance for simplicity.
        """
        locations = [user_gps] + delivery_locations
        graph = {}

        # Calculating distances (dummy Euclidean distance)
        for i, loc1 in enumerate(locations):
            graph[i] = {}
            for j, loc2 in enumerate(locations):
                if i != j:
                    dist = self.calculate_distance(loc1, loc2)
                    graph[i][j] = dist

        return graph

    def modify_graph_with_traffic(self, graph):
        """
        Modify the graph weights based on traffic data. For this demo, we add a fixed delay.
        """
        # Adding a fixed delay to each edge to simulate traffic (e.g., +10% of each distance)
        for node, edges in graph.items():
            for adj_node in edges:
                graph[node][adj_node] *= 1.1  # Adding a 10% "traffic" delay
        return graph

    def find_optimal_route(self, graph):
        """
        Dummy function to simulate a Traveling Salesman Problem solution.
        Returns a hardcoded route.
        """
        # Dummy solution path for the Traveling Salesman route
        route = [0, 1, 2, 3, 4, 0]  # Visiting all nodes and returning to start
        return route

    def calculate_distance(self, loc1, loc2):
        """
        Calculate a simple Euclidean distance between two locations (lat/lon points).
        """
        return math.sqrt((loc1['lat'] - loc2['lat']) ** 2 + (loc1['lon'] - loc2['lon']) ** 2)

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
