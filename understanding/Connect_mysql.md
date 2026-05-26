#### Create Database in Mysql
```zsh
mysql -u root -p // 1234
```

```zsh
Database Name - 'ManPower'
```

#### Now go to Django Project Folder
```zsh
step 01:
    Ex - Project Name : 'ManPower'
         App Name     : 'myapp'

step 02:
    open [ ManPower/settings.py ]
    reconfig :
                DATABASES = {
                    'default': {
                        'ENGINE': 'django.db.backends.mysql',
                        'NAME': '01ManPower',
                        'USER': 'root',
                        'PASSWORD': '1234',
                        'HOST': 'localhost',
                        'PORT': '3306',
                    }
                }
                
```


```zsh
django-admin startproject Hello
```

```text
move to Hello folder
    then run python manage.py runserver
```
```zsh
python manage.py runserver
```
```zsh
python manage.py startapp home
```
