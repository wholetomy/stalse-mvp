FROM python:3.11-slim

WORKDIR /app

# system deps for pandas (light)
RUN apt-get update && apt-get install -y build-essential gcc libpq-dev libxml2-dev libxslt1-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# create data processed dir if not exists
#RUN mkdir -p /app/data/processed

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
