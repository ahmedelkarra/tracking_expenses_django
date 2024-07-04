from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from .models import Transactions
import json
# Create your views here.

@csrf_protect
@login_required
def transactions_api(request):
    if(request.method == 'GET'):
        transactions = Transactions.objects.filter(author = request.user)
        data = list(transactions.values())
        return JsonResponse({'message':data},status=200)
    elif(request.method == 'POST'):
        try:
            data =json.loads(request.body)
            title = data.get('title')
            price = data.get('price')
            transaction_type = data.get('transaction_type')
            transactions = Transactions(author = request.user , title = title , price = price, transaction_type = transaction_type )
            transactions.save()
            return JsonResponse({'message':'Transaction has been created'},status=201)
        except NameError:
            return JsonResponse({'message':NameError},status=400)
    else:
        return JsonResponse({'message':'Method Not Allowed'},status=405)


@csrf_protect
@login_required
def transactions_api_update(request,id):
    if(request.method == 'PUT'):
        try:
            data =json.loads(request.body)
            title = data.get('title')
            price = data.get('price')
            transaction_type = data.get('transaction_type')
            transactions = Transactions.objects.filter(id = id)
            if(transactions.exists()):
                transactions.update( title = title , price = price, transaction_type = transaction_type)
                return JsonResponse({'message':'transaction has been updated'})
            else:
                return JsonResponse({'message':'transaction not found'},staus=404)
        except NameError:
            return JsonResponse({'message':NameError},status=400)
    elif(request.method == 'DELETE'):
        try:
            transactions = Transactions.objects.filter(id = id)
            if(transactions.exists()):
                transactions.delete()
                return JsonResponse({'message':'transaction has been deleted'})
            else:
                return JsonResponse({'message':'transaction not found'},staus=404)
        except NameError:
            return JsonResponse({'message':NameError},status=400)
    else:
        return JsonResponse({'message':'Method Not Allowed'},status=405)