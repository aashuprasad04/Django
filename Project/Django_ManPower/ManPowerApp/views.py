from django.shortcuts import render, HttpResponse

# Create your views here.
def index(request):
    # return HttpResponse("hello wrold")
    return render(request, 'index.html')

def home(request):
    return render(request, 'home.html')

def addEmp(request):
    return render(request, 'add-employee.html')

def viewEmp(request):
    return render(request, 'view-employee.html')

def viewEmp2(request):
    return render(request, 'view.html')
    # return HttpResponse('view-employee.html')

def salary(request):
    # return HttpResponse("salary")
    return render(request, 'salary.html')

def reports(request):
    # return HttpResponse("report")
    return render(request, 'reports.html')