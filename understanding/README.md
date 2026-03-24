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


## 01 UnderStanding 
```py    
path('login01/', views.login, name='login')
```
- name = 'login' is a alias (nickname) for this URL path 'login01'
- Example without name
  ```py
    path('user-login/', views.login)
  ```
  ```html
    <a href="/login01/">Login</a>
  ```
- Example with name
  ```py
    path('login01/', views.login, name='login')
  ```
  ```html
    <a href="{% url 'login' %}">Login</a>
  ```
- if URL change does not affect in template that's why use name

<br><br>
# Static and Template
- create static and templates folder in root folder like that <br>
<img width="224" height="581" alt="04ng" src="https://github.com/user-attachments/assets/1050d914-5674-4522-85aa-67f058a4c2d8" />

### Static
- step 01
  - create text.txt file in staic folder
  <img width="241" height="66" alt="05" src="https://github.com/user-attachments/assets/2314f4ed-42bd-41d8-9527-cfb9c90b2ba1" />

- step 02 : Modify Hello/settings.py
  - Hello/settings.py
  ```py
  import os

  # Added manually
  STATICFILES_DIRS = [
  os.path.join(BASE_DIR, 'static')
    ]
  ```
- step 03
  - now check in url via
    ```
    http://127.0.0.1:8002/static/text.txt
    ```
<br><br>
### Templates
- step01 => Hello/settings.py
  - predefault code
    ```py
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]
    ```
- step02 => Hello/settings.py
  - modify predefault code
    ```py
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [os.path.join(BASE_DIR, 'templates')],    # modify here
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]
    ```
- step02
  - create index.html file in templates folder <br>
  <img width="235" height="60" alt="06" src="https://github.com/user-attachments/assets/f1322371-82cb-4dcb-9439-3ae9ac545a2f" />

- step03
  - modify / edit home/views.py
  ```py
    # home/urls.py
    # path('', views.index, name='index'),

    def index(request):
        # return HttpResponse("Hello World")
        return render(request, 'index.html')
  ```
