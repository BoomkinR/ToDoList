from rest_framework import serializers
from ..models import Developer, Task


class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['ID', 'Title', 'Priority', 'Status', 'Date_update', 'Date_end', 'Description', 'Respons']


class PadavanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = ['ID', 'username', 'first_name', 'last_name']
