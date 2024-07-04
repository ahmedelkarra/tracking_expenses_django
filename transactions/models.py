from django.db import models
from django.contrib.auth.models import User

# Define your choices here
class TransactionType(models.TextChoices):
    ENTRANCE = 'entrance', 'Entrance'
    EXIT = 'exit', 'Exit'

class Transactions(models.Model):
    title = models.CharField(max_length=10, blank=False, null=False)
    price = models.IntegerField(blank=False, null=False)
    transaction_type = models.CharField(max_length=8, choices=TransactionType.choices, blank=False, null=False)
    date = models.DateField(auto_now_add=True, blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)

    def __str__(self):
        return self.title
