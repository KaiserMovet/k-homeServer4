# pull the official base image
FROM python:3.8.3-alpine

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apk add --no-cache npm
RUN pip install --upgrade pip 
COPY ./req.txt /usr/src/app
RUN pip install -r req.txt

# copy project
COPY . /usr/src/app

EXPOSE 8000

#CMD ["watch", "pwd"]
CMD ["./start.sh", "python"]
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
