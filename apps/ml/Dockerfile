FROM python:3.12-slim

WORKDIR /app

# Supaya Python tidak membuat file .pyc
ENV PYTHONDONTWRITEBYTECODE=1

# Supaya log Python langsung muncul
ENV PYTHONUNBUFFERED=1

# Install dependency
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy source code Python
COPY . .

# Port FastAPI
EXPOSE 8001

# Jalankan FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]