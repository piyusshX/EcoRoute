from django.urls import path
from .views import FindOptimalRouteSingle, RegisterView, LogoutView, GetPlace, UserRoutesView, UserProfileUpdateView
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('find-route/', FindOptimalRouteSingle.as_view(), name='findOptimalView-Single'),
    # path('find-optimal-route/', FindOptimalRoute.as_view(), name='findOptimalView'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='api_logout'),
    path('login/', obtain_auth_token, name='login'),
    path('place/', GetPlace.as_view(), name='get-place'),
    path('user/routes/', UserRoutesView.as_view(), name='user-routes'),
     path('user/profile/', UserProfileUpdateView.as_view(), name='user-profile-update'),
]

