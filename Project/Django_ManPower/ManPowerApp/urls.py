from django.contrib import admin
from django.urls import path
from ManPowerApp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
    path('addEmp/', views.addEmp, name='addEmp'),
    path('viewEmp/', views.viewEmp, name='viewEmp'),
    path('viewEmp2/', views.viewEmp2, name='viewEmp2'),
    path('salary/', views.salary, name='salary'),
    path('reports/', views.reports, name='reports'),

]