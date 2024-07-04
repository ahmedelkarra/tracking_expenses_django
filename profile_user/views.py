from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate,logout
import json

@login_required
@csrf_protect
def profile_api(request):
    if request.method == 'GET':
        data = request.user
        info = {
            'first_name': data.first_name,
            'last_name': data.last_name,
            'username': data.username,
            'email': data.email,
        }
        return JsonResponse({"message": info}, status=200)
    
    elif request.method == 'DELETE':
        try:
            input_data = json.loads(request.body)
            password = input_data.get('password')
            
            if not password:
                return JsonResponse({"message": 'Password is required'}, status=400)
            
            user = authenticate(username=request.user.username, password=password)
            
            if user is not None:
                user.delete()
                return JsonResponse({"message": 'Account has been deleted'}, status=200)
            else:
                return JsonResponse({"message": 'Invalid password'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"message": 'Invalid input'}, status=400)
    
    elif request.method == 'PUT':
        try:
            input_data = json.loads(request.body)
            user = request.user
            
            first_name = input_data.get('first_name', user.first_name)
            last_name = input_data.get('last_name', user.last_name)
            email = input_data.get('email', user.email)
            password = input_data.get('password')
            new_password = input_data.get('new_password')
            
            if password and new_password:
                if user.check_password(password):
                    user.set_password(new_password)
                else:
                    return JsonResponse({"message": 'Current password is incorrect'}, status=400)
            
            user.first_name = first_name
            user.last_name = last_name
            user.email = email
            user.save()
            
            return JsonResponse({"message": 'Account has been updated'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"message": 'Invalid input'}, status=400)
    
    else:
        return JsonResponse({'message': 'Method Not Allowed'}, status=405)


def logout_api(request):
    logout(request)
    return JsonResponse({"message": 'Logout successfully'}, status=200)