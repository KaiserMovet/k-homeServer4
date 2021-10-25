from django.shortcuts import render


def indexx(request):
    return render(request, 'khs/base.html')
