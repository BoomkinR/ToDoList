from django.urls import path
from .views import Autorization
from rest_framework import routers
from .views import GetTasks, GetName, GetPadavan, GetDeveloper, Create_or_Update_task



router = routers.SimpleRouter()
router.register('task', GetTasks, basename='task')
router.register('padavan', GetPadavan, basename='padavan')

urlpatterns = [
    path('autorization/', Autorization.as_view()),
    path('getname/', GetName.as_view()),
    path('redact/', Create_or_Update_task.as_view()),
    path('getdev/<int:pk>/', GetDeveloper.as_view({'get': 'retrieve'})),
    path('getdev/<int:pk>/tasks', GetDeveloper.as_view({'get': 'get_tasks'}))
]
print(router.urls)
urlpatterns += router.urls
