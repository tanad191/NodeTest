from django.urls import path, include
from . import views
from .views import (
    MyTokenObtainPairView,
    SongListApiView,
    CreateProfileView,
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'songs', SongListApiView, 'song')
router.register(r'register', CreateProfileView, 'register')

urlpatterns = [
    path('', include(router.urls)),
    path('profile/', views.get_profile),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]