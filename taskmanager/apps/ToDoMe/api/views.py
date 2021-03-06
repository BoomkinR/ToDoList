from datetime import datetime

from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from ..models import Developer, Task
from .serializers import TasksSerializer, PadavanSerializer
from django.contrib.auth import login, logout
from rest_framework.decorators import action


class Autorization(APIView):

    def post(self, request):
        print("Post method")
        logout(request)
        if request.method == 'POST':
            print("true")
            dic = request.data
            log = dic['login']
            passwd = dic['password']
            result = self.checkpassword(log, passwd)
            if result == 'welldone':
                user = Developer.objects.get(username=log)
                login(request, user=user)
                print(f'{user.ID} has been loged in')
                return Response(result)
            return Response(result)

    def checkpassword(self, log, password):
        try:
            item = Developer.objects.get(username=log)
        except ObjectDoesNotExist:
            return 'usernameerror'

        if check_password(password, item.password):
            return 'welldone'
        return 'passerror'


class GetTasks(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TasksSerializer
    http_method_names = ['get', 'post']

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user.ID
        query_set = queryset.filter(Respons=user).order_by('Date_update') | queryset.filter(Creator=user).order_by(
            'Date_update')
        return query_set


class GetName(APIView):

    def get(self, request, *args, **kwargs):
        user = Developer.objects.get(username=request.user.username)

        serializer = PadavanSerializer(user, many=False)
        print(request.user.username)
        if request.user.is_authenticated:
            return Response(serializer.data)
        return Response("error")


class GetPadavan(viewsets.ModelViewSet):
    queryset = Developer.objects.all()
    serializer_class = PadavanSerializer
    http_method_names = ['get']

    def get_queryset(self):

        queryset = self.queryset
        user = self.request.user
        try:
            query_set = queryset.filter(Leader=user)
        except: query_set = None
        return query_set


class GetDeveloper(viewsets.ModelViewSet):
    queryset = Developer.objects.all()
    serializer_class = PadavanSerializer
    http_method_names = ['get']
    actor = None

    def retrieve(self, request, pk=None):
        if request.user.is_authenticated():
            queryset = Developer.objects.all()
            self.actor = queryset.get(pk=pk)
            serializer = PadavanSerializer(self.actor)
            return Response(serializer.data)
        else: return Response("error")

    @action(detail=False)
    def get_tasks(self, request, **kwargs):
        user = request.user
        developer = Developer.objects.get(ID=kwargs['pk'])
        print("-----------------------------------")
        print(developer.Leader.ID)
        print(user.ID)
        if (user.is_authenticated and developer.Leader.ID == user.ID) or user.ID == developer.ID:
            board = Task.objects.filter(Respons=developer)
            serializer = TasksSerializer(board, many=True)
            return Response(serializer.data)
        return Response()


class Create_or_Update_task(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data;
        print(data)
        user = Developer.objects.get(ID = request.user.ID)
        responser = Developer.objects.get(ID =data["Respons"])
        task = Task()
        if data["Create"] == "1":
            if responser == user:
                task.Respons = responser
            elif self.check_user(user, responser):
                task.Respons = responser
            else:
                task.Respons = user
            task.Date_create = datetime.today().strftime('%Y-%m-%d')
            task.Title = data["Title"]
            task.Date_end = data["Date_end"]
            task.Priority = data["Priority"]
            task.Status = data["Status"]
            task.Description = data["Description"]
            task.save()
            return Response("Created")
        elif data["Create"] == "0":
            task = Task.objects.get(ID=data["ID"])
            if responser == user or self.check_user(user, responser):
                print("Can be chenged")
                if responser == user:
                    task.Respons = responser
                elif self.check_user(user, responser):
                    task.Respons = responser
                else:
                    task.Respons = user
                task.Title = data["Title"]
                task.Date_end = data["Date_end"]
                task.Priority = data["Priority"]
                task.Status = data["Status"]
                task.Description = data["Description"]
                task.save()
                return Response("Saved all")
            else:
                print("ch just stsus")
                task.Status = data["Status"]
                task.save()
                return Response("Saved status")
        return Response("some error")

    def check_user(self, user, responser):
        if responser.Leader == user:
            print("Checked true")
            return True
        print("Checked F")
        return False
