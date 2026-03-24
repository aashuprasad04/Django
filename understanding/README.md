```zsh
django-admin startproject Hello
```
```zsh
python manage.py runserver
```
```zsh
python manage.py startapp home
```

### project have pre url file that contains some bydefault code : 
#### Project
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
![01.bmp](https://github.com/user-attachments/files/26201802/01.bmp)

### And app don't have pre urls file that's why firstly creat urls.py file in app file, <br>
- and copy project code and paste in app urls file something like this : 
#### App
```py
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]
```


