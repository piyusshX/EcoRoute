# curl -X POST "http://127.0.0.1:8000/api/register/" -H "Content-Type: application/json" -d '{"username": "mayank", "password": "mayank", "email": "mayank@gmail.com" }'
# curl -X POST "http://127.0.0.1:8000/api/logout/" -H "Authorization: Token 7976b17ab32ab537704a08258b9f777ca5583560"
# curl -X POST "http://127.0.0.1:8000/api/login/" -H "Content-Type: application/json" -d '{ "username": "mayank", "password": "mayank"}'

# curl -X POST http://127.0.0.1:8000/api/find-optimal-route/ -d '{
#   "user_gps": {"lat": 28.7041, "lon": 77.1025},
#   "delivery_locations": [{"lat": 28.5355, "lon": 77.3910}, {"lat": 28.4595, "lon": 77.0266}],
#   "priority_order": [1, 2],
#   "vehicle_type": "car"
# }' -H "Content-Type: application/json"

# curl -o single_route.json -X POST "http://127.0.0.1:8000/api/find-route/" -H "Content-Type: application/json" -H "Authorization: Token b1de99f13f74cc5647c123d52ed16f77d83e5abf" -d '{        "delivery_location": {            "lat": 52.30645,            "lng": 13.38338        },        "agent_location": {            "lat": 52.5160,            "lng": 13.3777        },        "vehicle_type": "car",        "route_pref": "short", "Fuel":"electric"      }'

# curl -o routes_response.json -H "Authorization: Token 54bd0df8b78054abae6499bb9f2c140565345a4d" "http://127.0.0.1:8000/api/user/routes/"
