from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication

from ..serializers import ProfileSerializer, SongSerializer
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from ..models import Song

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    profile = user.profile
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

class CreateProfileView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ProfileSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.data.get('first_name')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            host = self.request.session.session_key
            queryset = Profile.objects.filter(host=host)
            if queryset.exists():
                profile = queryset[0]
                profile.first_name = first_name
                profile.last_name = last_name
                profile.email = email
                profile.save(update_fields=['first_name', 'last_name', 'email'])
                self.request.session['profile_code'] = profile.code
                return Response(profileSerializer(profile).data, status=status.HTTP_200_OK)
            else:
                profile = profile(host=host, first_name=first_name,
                            last_name=last_name,email=email)
                profile.save()
                self.request.session['profile_code'] = profile.code
                return Response(profileSerializer(profile).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class SongListApiView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = SongSerializer
    queryset = Song.objects.all()