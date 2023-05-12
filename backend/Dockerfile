FROM python:3.10 as base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1


WORKDIR /server
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . /server
RUN chmod -R 777 /server