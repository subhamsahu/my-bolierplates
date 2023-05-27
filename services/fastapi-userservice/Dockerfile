FROM python:3.10

ENV PYTHONUNBUFFERED 1
ENV POETRY_VIRTUALENVS_CREATE 0
WORKDIR /api
COPY . /api

RUN pip3 install poetry 
RUN cat requirements.txt | xargs poetry add
RUN poetry install

EXPOSE 33507

CMD ["python3", "start_server.py"]