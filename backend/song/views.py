from django.http import JsonResponse
def get_routes(request):
   routes = [
       '/api/token',
       '/api/token/refresh'
   ]
   return JsonResponse(routes, safe=False)