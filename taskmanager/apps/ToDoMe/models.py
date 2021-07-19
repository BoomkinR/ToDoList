from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from datetime import datetime


class Developer(AbstractUser):
    ID = models.AutoField('ID', primary_key=True)
    Leader = models.ForeignKey('self', on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = ('user')
        verbose_name_plural = ('users')

    # a = Developer(Name ='Alex', Surame ='Renev', Secondname = 'Victorovich',Login ='alexr', Password ='90alex13')
    def save(self, *args, **kwargs):
        self.password = make_password(self.password, hasher='bcrypt_sha256')
        super(Developer, self).save(*args, **kwargs)


class Task(models.Model):
    ID = models.AutoField('ID', primary_key=True)
    Title = models.CharField('Заголовок', max_length=200)
    Description = models.TextField('Описание')
    Date_create = models.DateField('Дата создания', auto_now_add=True, blank=True)
    Date_update = models.DateField('Последнее обновление')
    Date_end = models.DateField('Дедлайн')
    PRIORITY_CHOICES = (
        ('H', 'Высокий'),
        ('M', 'Средний'),
        ('L', 'Низкий')
    )
    STATUS_CHOICES = (
        ('NS', 'Not started'),
        ('P', 'In Process'),
        ('D', 'Done'),
        ('C', 'Canceled')
    )
    Priority = models.CharField(max_length=3, choices=PRIORITY_CHOICES)
    Status = models.CharField(max_length=3, choices=STATUS_CHOICES)
    Creator = models.ForeignKey(Developer, on_delete=models.SET_NULL, null=True, related_name='Creator')
    Respons = models.ForeignKey(Developer, on_delete=models.SET_NULL, null=True, related_name='Respons')

    def save(self, *args, **kwargs):
        self.Date_update = datetime.today().strftime('%Y-%m-%d')
        super(Task, self).save(*args, **kwargs)
