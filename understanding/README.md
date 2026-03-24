```zsh
django-admin startproject Hello
```
```zsh
python manage.py runserver
```
```zsh
python manage.py startapp home
```

![01.bmp](https://github.com/user-attachments/files/26201802/01.bmp)

### project have pre url file that contains some bydefault code : 
#### Hello/urls.py
```py
"""
URL configuration for Hello project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]

```


### And app don't have pre urls file that's why firstly creat urls.py file in app file, <br>
- and copy project code and paste in app urls file something like this : 
#### home/urls.py
```py
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]
```
#### After modiying home folder
<img width="258" height="502" alt="02" src="https://github.com/user-attachments/assets/9bea2a34-6908-4bd9-9e01-f051b9d56ed2" />

## Now crate first web page via Django
- step 00:
  - start server
    ```py
    python manage.py runserver
    ```
- step 01:
  - modifying Hello/urls.py
    ```py
    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls'))
    ]
    ```
- step 02:
  - modifying home/urls.py
    ```py
    from django.contrib import admin
    from django.urls import path
    from home import views

    urlpatterns = [
    path('', views.index, name='home'),
    path('login01/', views.login, name='login')
    ]
    ```
- step 03:
  - modifying home/views.py
    ```py
    from django.shortcuts import render, HttpResponse

    # Create your views here.
    def index(request):
    return HttpResponse("this is home page")

    def login(request):
    return HttpResponse('Login page')
    ```
- step 04:
  - reload web page





