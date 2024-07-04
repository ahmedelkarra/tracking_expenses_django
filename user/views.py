from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import login,authenticate
import json

@csrf_exempt
def register_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username=data.get('username')
        email=data.get('email')
        first_name=data.get('first_name')
        last_name=data.get('last_name')
        password=data.get('password')
        confirmPassword=data.get('confirmPassword')
        checkEmail = User.objects.filter(email=email)
        checkUser = User.objects.filter(username=username)
        if password != confirmPassword:
            return JsonResponse({'message':'Password not match'},status=400)
        if checkEmail.exists():
            return JsonResponse({'message':'Email is already used'},status=400)
        elif checkUser.exists():
            return JsonResponse({'message':'Username is already used'},status=400)
        else:
            try:
                user = User(username=username,email=email,first_name=first_name,last_name=last_name)
                user.set_password(password)
                user.save()
                return JsonResponse({'message':'Account has been created'},status=201)
            except NameError:
                return JsonResponse({'message':NameError},status=400)
    else:
        return JsonResponse({'message':'Method Not Allowed'},status=405)



@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username=data.get('username')
        password=data.get('password')
        try:
            user = authenticate(request,username=username,password=password)
            if user is not None:
                userFilter = User.objects.filter(username=username)
                userInfo = {"first_name":userFilter[0].first_name,"last_name":userFilter[0].last_name,'username':userFilter[0].username,"email":userFilter[0].email}
                print(userInfo)
                login(request,user)
                return JsonResponse({'message':'login successfully'},status=200)
            else:
                return JsonResponse({'message':'Worng Username or Password'},status=400)
        except NameError:
            print(NameError)
            return JsonResponse({'message':'Error'},status=400)
    else:
        return JsonResponse({'message':'Method Not Allowed'},status=405)





























# from django.http import JsonResponse
# from django.contrib.auth.models import User
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import authenticate, login
# import json

# # Create your views here.

# @csrf_exempt
# def register_api(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             username = data.get('username')
#             first_name = data.get('first_name')
#             last_name = data.get('last_name')
#             email = data.get('email')
#             password = data.get('password')
#             confirm_password = data.get('confirmPassword')

#             # تحقق من صحة البيانات
#             if not username or not first_name or not last_name or not email or not password or not confirm_password:
#                 return JsonResponse({'message': 'All fields are required'}, status=400)

#             if password != confirm_password:
#                 return JsonResponse({'message': 'Passwords do not match'}, status=400)

#             # تحقق من وجود المستخدم
#             if User.objects.filter(username=username).exists():
#                 return JsonResponse({'message': 'Username is already taken'}, status=400)

#             if User.objects.filter(email=email).exists():
#                 return JsonResponse({'message': 'Email is already taken'}, status=400)

#             # إنشاء مستخدم جديد
#             user = User(username=username, first_name=first_name, last_name=last_name, email=email)
#             user.set_password(password)
#             user.save()

#             return JsonResponse({'message': 'User registered successfully'}, status=201)

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'message': 'You can not'}, status=403)

# @csrf_exempt
# def login_api(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             username = data.get('username')
#             password = data.get('password')

#             user = authenticate(request, username=username, password=password)
#             if user is not None:
#                 login(request, user)
#                 return JsonResponse({'message': 'Login successful'})
#             else:
#                 return JsonResponse({'message': 'Invalid credentials'}, status=400)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     else:
#         return JsonResponse({'message': 'You can not'}, status=403)