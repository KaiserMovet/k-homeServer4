#!/bin/sh
if [ "$#" -ne 1 ]
then
  echo "Usage: $0 [python interpreter]"
  exit 1
fi

python_interpreter=$1
echo $python_interpreter
npm install khS/khS/static --prefix khS/khS/static

$python_interpreter khS/manage.py makemigrations khS4_pc_master

$python_interpreter khS/manage.py migrate
$python_interpreter khS/manage.py runserver 0.0.0.0:8000
