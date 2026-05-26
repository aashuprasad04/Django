#### Create Database in Mysql
```zsh
mysql -u root -p // 1234
```

```zsh
Database Name - '01ManPower'
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

step 03:
    open terminal : run Migration
        python manage.py makemigrations
        python manage.py migrate
        python manage.py runserver

    if mysql client are not available
        python3 -m venv venv
        source venv/bin/activate
        pip install mysqlclient
        pip install django mysqlclient
                
```

