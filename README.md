# IT Infrastructure - Docker Compose Application

ระบบเว็บแอปพลิเคชันสมบูรณ์โดยใช้ Docker Compose รวม PostgreSQL, Django Backend, React Frontend, และ Nginx Reverse Proxy

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Architecture](#architecture)
- [Development Guide](#development-guide)
- [Deployment Checklist](#deployment-checklist)

---

## ✨ Features

- **Django 4.2 Backend**: REST API with Django REST Framework
- **React 18 Frontend**: Modern UI with Vite
- **PostgreSQL 15**: Robust relational database
- **Nginx**: Reverse proxy and static file server
- **Docker Compose**: One-command deployment with all services
- **CORS Enabled**: Seamless frontend ↔ backend communication
- **Health Checks**: Automatic service readiness verification
- **Rate Limiting**: Built-in DDoS protection
- **Gzip Compression**: Optimized response sizes
- **Static File Caching**: 30-day browser cache for assets
- **Multi-stage Docker Build**: Optimized image sizes
- **Environment Variables**: Secure configuration management

---

## 🔧 Prerequisites

### Required Software

1. **Docker Desktop** (includes Docker Engine + Docker Compose)
   - Windows/Mac: https://www.docker.com/products/docker-desktop
   - Linux: Install Docker + Docker Compose separately
   - Verify installation:
     ```bash
     docker --version
     docker-compose --version
     ```
   - Both should show version numbers (e.g., Docker 24.0, Docker Compose 2.20)

2. **Git** (for cloning and version control)
   - Windows/Mac: https://git-scm.com/
   - Linux: `sudo apt-get install git`
   - Verify: `git --version`

3. **Node.js** (optional - only for local React development)
   - https://nodejs.org/ (LTS version recommended)
   - Verify: `node --version` and `npm --version`

### System Requirements

- **RAM**: Minimum 4GB, recommended 8GB
- **Disk Space**: 5GB free space
- **Network**: Ports 80, 8000, 5432 available

### Network Ports Used

| Port | Service | Access |
|------|---------|--------|
| 80 | Nginx (Reverse Proxy) | External (Browser) |
| 8000 | Django Backend | Internal (Docker network) |
| 3000 | React Frontend | Internal (Docker network) |
| 5432 | PostgreSQL | Internal (Docker network) |

---

## 📁 Project Structure

```
it-infras-test/
│
├── backend/                          # Django Backend Application
│   ├── config/                       # Django Project Settings
│   │   ├── __init__.py
│   │   ├── settings.py               # Main Django configuration
│   │   ├── urls.py                   # URL routing
│   │   ├── asgi.py
│   │   └── wsgi.py                   # WSGI application
│   │
│   ├── api/                          # Django App (API logic)
│   │   ├── migrations/               # Database migrations
│   │   ├── __init__.py
│   │   ├── admin.py                  # Django admin config
│   │   ├── apps.py
│   │   ├── models.py                 # Database models
│   │   ├── serializers.py            # DRF serializers
│   │   ├── views.py                  # API views/endpoints
│   │   ├── urls.py                   # API URL routing
│   │   └── tests.py
│   │
│   ├── venv/                         # Python Virtual Environment
│   │   └── (packages installed here)
│   │
│   ├── manage.py                     # Django management script
│   ├── Dockerfile                    # Docker build instructions
│   ├── requirements.txt              # Python dependencies list
│   └── .env                          # Environment variables (NOT git tracked)
│       ├── DEBUG
│       ├── SECRET_KEY
│       ├── DB_NAME
│       ├── DB_USER
│       ├── DB_PASSWORD
│       ├── DB_HOST
│       └── DB_PORT
│
├── frontend/                         # React Frontend Application
│   ├── src/                          # React source code
│   │   ├── App.jsx                   # Main React component
│   │   ├── App.css                   # Application styles
│   │   ├── main.jsx                  # Entry point
│   │   ├── index.css
│   │   └── (other components)
│   │
│   ├── public/                       # Static assets
│   │   ├── favicon.ico
│   │   ├── vite.svg
│   │   └── (images, etc)
│   │
│   ├── dist/                         # Build output (created after npm run build)
│   │   └── (compiled React app)
│   │
│   ├── node_modules/                 # NPM packages
│   │   └── (package dependencies)
│   │
│   ├── .dockerignore                 # Files to exclude from Docker
│   ├── .env                          # Environment variables (NOT git tracked)
│   │   └── VITE_API_URL
│   ├── .eslintrc.cjs                 # ESLint configuration
│   ├── index.html                    # HTML template
│   ├── package.json                  # NPM configuration & scripts
│   ├── package-lock.json             # Locked dependency versions
│   ├── vite.config.js                # Vite build configuration
│   └── Dockerfile                    # Docker build instructions
│
├── nginx/                            # Nginx Configuration
│   └── nginx.conf                    # Reverse proxy & routing rules
│       ├── Upstream definitions
│       ├── Rate limiting zones
│       ├── Server configuration
│       ├── Location routing
│       ├── Gzip compression
│       └── Security headers
│
├── docs/                             # Documentation
│   ├── architecture.md               # System architecture (Mermaid diagram)
│   ├── architecture.png              # Architecture diagram (PNG export)
│   └── (other documentation)
│
├── .git/                             # Git repository
│   └── (git version control)
│
├── .gitignore                        # Git ignore rules
│   ├── *.pyc
│   ├── __pycache__/
│   ├── venv/
│   ├── node_modules/
│   ├── .env
│   └── (other ignore patterns)
│
├── docker-compose.yml                # Docker Compose orchestration
│   ├── Services: db, backend, frontend, nginx
│   ├── Networks: app_network
│   ├── Volumes: postgres_data
│   └── Dependencies & healthchecks
│
└── README.md                         # This documentation file
```

---

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/<your-username>/it-infras-test.git
cd it-infras-test
```

### Step 2: Verify Docker Installation

```bash
docker --version
docker-compose --version
```

Both commands should return version numbers.

### Step 3: Check/Create Environment Files

#### Backend Environment File (backend/.env)

Create or verify `backend/.env` exists with:

```env
# Django Settings
DEBUG=True
SECRET_KEY=django-insecure-your-secret-key-here-change-in-production

# Database Configuration
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432

# Django Allowed Hosts (comma-separated)
ALLOWED_HOSTS=localhost,127.0.0.1,nginx,backend
```

**Important**: 
- In production, set `DEBUG=False`
- Change `SECRET_KEY` to a secure random value
- Change `DB_PASSWORD` to a strong password

#### Frontend Environment File (frontend/.env)

Create or verify `frontend/.env` exists with:

```env
# API Base URL
VITE_API_URL=http://localhost:8000
```

In production, change to your production domain.

### Step 4: Build and Run the Application

```bash
docker-compose up --build
```

**What this command does:**
- Builds Docker images for backend and frontend (--build flag)
- Starts all 4 containers (db, backend, frontend, nginx)
- Creates docker network and volume
- Applies database migrations automatically
- Displays logs from all services

**Expected output:**
```
✓ Container postgres_db is created
✓ Container postgres_db is started
✓ Container django_backend is created
✓ Container django_backend is started
✓ Container react_frontend is created
✓ Container react_frontend is started
✓ Container nginx_proxy is created
✓ Container nginx_proxy is started

...logs continue...
```

### Step 5: Access the Application

Once all containers are running, access:

| URL | Service | Purpose |
|-----|---------|---------|
| http://localhost/ | React Frontend | Main application UI |
| http://localhost:8000/ | Django Backend | API root |
| http://localhost/admin/ | Django Admin | Admin interface |
| http://localhost/api/ | Django API | API endpoints |
| http://localhost/health | Health Check | System status |

### Step 6: Stop the Application

```bash
# Stop containers (keep data)
docker-compose stop

# Stop and remove containers (keep data)
docker-compose down

# Stop and remove everything including volumes/data
docker-compose down -v
```

---

## 🔌 Configuration

### Environment Variables Reference

#### Backend (.env)

| Variable | Default | Type | Description | Production |
|----------|---------|------|-------------|------------|
| `DEBUG` | True | Boolean | Enable Django debug mode | False ⚠️ |
| `SECRET_KEY` | dev-key | String | Django secret key for security | Change required ⚠️ |
| `DB_NAME` | postgres | String | PostgreSQL database name | |
| `DB_USER` | postgres | String | PostgreSQL username | Change recommended |
| `DB_PASSWORD` | postgres | String | PostgreSQL password | Change required ⚠️ |
| `DB_HOST` | db | String | Database hostname (container name) | |
| `DB_PORT` | 5432 | Integer | Database port | |
| `ALLOWED_HOSTS` | * | CSV | Allowed hostnames | Change to domain ⚠️ |

#### Frontend (.env)

| Variable | Default | Type | Description |
|----------|---------|------|-------------|
| `VITE_API_URL` | http://localhost:8000 | String | Backend API URL |

### Docker Compose Services Configuration

#### PostgreSQL (db)

```yaml
Service: db
Image: postgres:15.2
Port: 5432 (internal only)
Volume: postgres_data (persistent storage)
Health Check: pg_isready query every 10s
```

#### Django Backend (backend)

```yaml
Service: backend
Build: ./backend/Dockerfile
Port: 8000 (internal only)
Command: gunicorn config.wsgi:application --bind 0.0.0.0:8000
Depends On: db (waits for health check)
Environment: All variables from backend/.env
```

#### React Frontend (frontend)

```yaml
Service: frontend
Build: ./frontend/Dockerfile
Port: 3000 (internal only, accessed via Nginx)
Two-stage build: Node (build) + Nginx (serve)
Environment: VITE_API_URL from frontend/.env
```

#### Nginx (nginx)

```yaml
Service: nginx
Image: nginx:alpine
Port: 80 (external access)
Config: ./nginx/nginx.conf
Depends On: backend, frontend
Routing:
  - /api/* → backend:8000
  - /admin/* → backend:8000
  - /* → frontend:80 (React)
```

---

## 📦 Running the Application

### Basic Commands

#### Start Application (with rebuild)

```bash
docker-compose up --build
```

#### Start Application (no rebuild)

```bash
docker-compose up
```

#### Start in Background (detached mode)

```bash
docker-compose up -d --build
```

Then view logs with:
```bash
docker-compose logs -f
```

#### Stop Application

```bash
docker-compose stop
```

#### Stop and Remove Containers

```bash
docker-compose down
```

#### Remove Everything Including Volumes

```bash
docker-compose down -v
```

### Viewing Logs

#### All Services Logs

```bash
docker-compose logs -f
```

#### Specific Service Logs

```bash
# Backend logs
docker-compose logs -f backend

# Frontend logs
docker-compose logs -f frontend

# Database logs
docker-compose logs -f db

# Nginx logs
docker-compose logs -f nginx
```

#### View Last N Lines

```bash
docker-compose logs -f --tail=100
```

### Accessing Services

#### Open Browser

- Frontend: http://localhost/
- Django Admin: http://localhost/admin/
- API: http://localhost/api/

#### Execute Commands in Containers

```bash
# Run Django management commands
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py collectstatic

# Run React commands (if needed)
docker-compose exec frontend npm install
docker-compose exec frontend npm run build

# Access PostgreSQL
docker-compose exec db psql -U postgres -d postgres
```

### Container Status

```bash
# Check running containers
docker-compose ps

# Get detailed info
docker-compose ps -a
```

Expected output:
```
NAME                COMMAND                  SERVICE      STATUS
postgres_db         "docker-entrypoint.s…"   db          Up 2 minutes
django_backend      "gunicorn config.wsgi…"  backend     Up 2 minutes
react_frontend      "nginx -g 'daemon off…"  frontend    Up 2 minutes
nginx_proxy         "nginx -g 'daemon off…"  nginx       Up 2 minutes
```

---

## 🔑 API Endpoints

### Health Check

**Endpoint**: `GET /health`

```bash
curl http://localhost/health
```

**Response**:
```
HTTP/1.1 200 OK
Content-Type: text/plain

healthy
```

### Django Admin

**Endpoint**: `GET /admin/`
**URL**: http://localhost/admin/

**Create Superuser**:
```bash
docker-compose exec backend python manage.py createsuperuser
```

Then login with created credentials.

### Example API Endpoints (Template)

These are examples - you'll add your own:

#### GET List

```bash
curl http://localhost/api/example/
```

**Response**:
```json
[
  {
    "id": 1,
    "name": "Example 1",
    "created_at": "2024-09-24T10:00:00Z"
  }
]
```

#### POST Create

```bash
curl -X POST http://localhost/api/example/ \
  -H "Content-Type: application/json" \
  -d '{"name": "New Item"}'
```

#### GET Detail

```bash
curl http://localhost/api/example/1/
```

#### PUT Update

```bash
curl -X PUT http://localhost/api/example/1/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

#### DELETE

```bash
curl -X DELETE http://localhost/api/example/1/
```

---

## 🏗️ Architecture

### System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User / Browser                        │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP Request (Port 80)
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Nginx Reverse Proxy                     │
│                    (nginx:alpine)                        │
└──────────┬──────────────────────────────┬────────────────┘
           │                              │
     /api/*│/admin/*                      │ /* (static/React)
           │                              │
           ▼                              ▼
┌──────────────────────┐         ┌──────────────────────┐
│  Django Backend      │         │  React Frontend      │
│  (Python 3.11)       │         │  (Node 18)           │
│  Port: 8000          │         │  Port: 3000          │
│  Gunicorn            │         │  Nginx               │
└──────────┬───────────┘         └──────────────────────┘
           │
           │ psycopg2 (port 5432)
           ▼
┌─────────────────────────────────────────────────────────┐
│                 PostgreSQL Database                      │
│               (postgres:15.2-alpine)                     │
│                   Port: 5432                             │
│         Volume: postgres_data (persistent)              │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

#### 1. Frontend Access Flow

```
Browser → Nginx (Port 80)
        → React Frontend (Static Files)
        → Browser Renders UI
```

#### 2. API Request Flow

```
React Component
    ↓
fetch/axios to /api/endpoint
    ↓
Nginx (Reverse Proxy)
    ↓
Django Backend (Port 8000)
    ↓
PostgreSQL Query
    ↓
Database Response
    ↓
Django Serializer
    ↓
JSON Response
    ↓
Nginx
    ↓
React Component
    ↓
UI Update
```

#### 3. CORS Flow

```
React Frontend (localhost)
    ↓
Request to Django API
    ↓
Django Check CORS_ALLOWED_ORIGINS
    ↓
If allowed → Send Response + CORS Headers
    ↓
If denied → Block (CORS Error in Console)
```

### Network Architecture

```
Docker Network: app_network (bridge)

Services connected:
- db (5432) ← accessible by backend only
- backend (8000) ← accessible by nginx only
- frontend (80) ← accessible by nginx only
- nginx (80) ← accessible by host machine (port 80)

Host Machine can access:
- Nginx on localhost:80
- (Backend/Frontend not directly accessible)
```

### Volume Management

```
postgres_data (Named Volume)
    ↓
Persists at: /var/lib/docker/volumes/
    ↓
Survives container restart/removal
    ↓
Can be backed up separately
    ↓
Removed only with: docker-compose down -v
```

For detailed architecture, see [docs/architecture.md](./docs/architecture.md)

---

## 🐛 Troubleshooting

### ❌ Containers won't start

**Symptoms**: 
- `docker-compose up` shows errors
- Containers exit immediately

**Solutions**:

```bash
# 1. Check logs for errors
docker-compose logs

# 2. Check individual service logs
docker-compose logs backend
docker-compose logs db

# 3. Rebuild from scratch
docker-compose down -v
docker-compose up --build

# 4. Check Docker daemon status
docker ps  # Should work if daemon is running
```

### ❌ Database connection error

**Symptoms**:
```
Connection refused: backend can't connect to db
psycopg2.OperationalError: could not connect to server
```

**Solutions**:

```bash
# 1. Check if db container is healthy
docker-compose ps
# Status should be "Up" for db

# 2. Check db logs
docker-compose logs db

# 3. Wait for health check - db takes time to initialize
# Wait 30-60 seconds on first run

# 4. Recreate db volume
docker-compose down -v
docker-compose up --build
# This clears the database and starts fresh
```

### ❌ React frontend not connecting to API

**Symptoms**:
- React console shows CORS error
- Network requests to /api/* fail
- Error: `Access to XMLHttpRequest at 'http://localhost:8000/api/...' from origin 'http://localhost' has been blocked by CORS policy`

**Solutions**:

```bash
# 1. Check frontend/.env
cat frontend/.env
# Should have: VITE_API_URL=http://localhost:8000

# 2. Check backend CORS settings
docker-compose exec backend grep -A 5 CORS_ALLOWED_ORIGINS config/settings.py
# Should include "http://localhost"

# 3. Check Django logs for CORS issues
docker-compose logs backend | grep -i cors

# 4. If still failing, update CORS in backend/config/settings.py:
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost",
#     "http://localhost:80",
#     "http://localhost:3000",
# ]

# 5. Restart backend
docker-compose restart backend
```

### ❌ Port already in use

**Symptoms**:
```
Address already in use
Port 80 is already allocated
```

**Solutions**:

```bash
# 1. Find what's using port 80 (Windows)
netstat -ano | findstr :80

# 2. Find what's using port 80 (Linux/Mac)
lsof -i :80

# 3. Stop conflicting service or change port
# Edit docker-compose.yml:
# ports:
#   - "8080:80"  # Use 8080 instead of 80
# Then access at http://localhost:8080/

# 4. Or kill the process using port
# Windows:
taskkill /PID <process_id> /F

# Linux/Mac:
kill -9 <process_id>
```

### ❌ Docker daemon not running

**Symptoms**:
```
Cannot connect to Docker daemon at unix:///var/run/docker.sock
```

**Solutions**:

```bash
# On Windows
# - Open Docker Desktop application
# - Wait for "Docker is running" notification

# On Mac
# - Open Docker.app from Applications folder
# - Wait for whale icon in menu bar

# On Linux
sudo systemctl start docker
```

### ❌ Out of memory / Disk space

**Symptoms**:
```
Docker: No space left on device
Killed container
```

**Solutions**:

```bash
# Clean up Docker
docker system prune -a

# Remove volumes (WARNING: deletes database)
docker-compose down -v

# Check disk space
df -h

# Remove old images
docker image prune -a
```

### ❌ Changes not reflecting after restart

**Issue**: 
Code changes not appearing after `docker-compose restart`

**Solutions**:

```bash
# 1. Rebuild (recommended)
docker-compose up --build

# 2. Force recreate containers
docker-compose up --force-recreate

# 3. For backend only
docker-compose up --build backend

# 4. For frontend only
docker-compose up --build frontend
```

### ❌ Permission denied errors

**Solutions**:

```bash
# Linux/Mac - run with sudo
sudo docker-compose up --build

# Or add user to docker group
sudo usermod -aG docker $USER
newgrp docker
docker-compose up --build

# Windows - Run Docker Desktop as Administrator
```

### ✅ Getting Help

1. **Check logs first**:
   ```bash
   docker-compose logs -f
   ```

2. **Refer to architecture documentation**:
   - [docs/architecture.md](./docs/architecture.md)

3. **Search GitHub issues**:
   - Check if someone had same problem

4. **Check service health**:
   ```bash
   docker-compose ps
   curl http://localhost/health
   ```

---

## 📚 Development Guide

### Adding New Django Model

**Step 1**: Edit `backend/api/models.py`

```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']
```

**Step 2**: Create migration

```bash
docker-compose exec backend python manage.py makemigrations
```

**Step 3**: Apply migration

```bash
docker-compose exec backend python manage.py migrate
```

**Step 4**: Create serializer in `backend/api/serializers.py`

```python
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'created_at']
```

**Step 5**: Create viewset in `backend/api/views.py`

```python
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
```

**Step 6**: Add URL in `backend/api/urls.py` (create if doesn't exist)

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

**Step 7**: Include in `backend/config/urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
```

**Step 8**: Restart backend

```bash
docker-compose restart backend
```

**Step 9**: Test API

```bash
curl http://localhost/api/products/
```

### Adding New React Component

**Step 1**: Create component `frontend/src/components/Products.jsx`

```jsx
import { useState, useEffect } from 'react'
import '../styles/Products.css'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/`
      )
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="products">
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products
```

**Step 2**: Use in App.jsx

```jsx
import Products from './components/Products'

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Products />
    </div>
  )
}

export default App
```

**Step 3**: Restart frontend

```bash
docker-compose up --build frontend
```

### Running Tests

#### Backend Tests

```bash
# Run all tests
docker-compose exec backend python manage.py test

# Run specific app tests
docker-compose exec backend python manage.py test api

# Run with verbosity
docker-compose exec backend python manage.py test --verbosity=2

# Run with coverage (if installed)
docker-compose exec backend coverage run --source='.' manage.py test
docker-compose exec backend coverage report
```

#### Frontend Tests (if Jest configured)

```bash
docker-compose exec frontend npm test
```

### Local Development (Without Docker)

If you want to develop locally without Docker:

**Backend**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
```

Then access frontend at http://localhost:5173 and configure API URL accordingly.

---

## 📝 Deployment Checklist

### Before Going to Production

- [ ] **Security**
  - [ ] Set `DEBUG=False` in backend/.env
  - [ ] Generate secure `SECRET_KEY` (use Django secret key generator)
  - [ ] Change `DB_PASSWORD` to strong password (12+ chars, mixed)
  - [ ] Update `ALLOWED_HOSTS` to your domain
  - [ ] Configure HTTPS/SSL certificates
  - [ ] Update `CORS_ALLOWED_ORIGINS` to production domain only
  - [ ] Set `SECURE_SSL_REDIRECT=True`
  - [ ] Add security headers in nginx.conf

- [ ] **Database**
  - [ ] Use managed database service (AWS RDS, DigitalOcean, etc.)
  - [ ] Set up automated backups
  - [ ] Test restore procedure
  - [ ] Set connection pool size
  - [ ] Enable encryption at rest

- [ ] **Backend**
  - [ ] Enable comprehensive logging
  - [ ] Set up log aggregation (ELK, DataDog, etc.)
  - [ ] Configure error tracking (Sentry)
  - [ ] Set up health monitoring
  - [ ] Configure request timeouts
  - [ ] Enable rate limiting

- [ ] **Frontend**
  - [ ] Build optimization (tree-shaking, minification)
  - [ ] Setup CDN for static assets
  - [ ] Configure cache headers
  - [ ] Enable gzip compression
  - [ ] Monitor frontend errors
  - [ ] Setup analytics

- [ ] **Infrastructure**
  - [ ] Use container orchestration (Kubernetes)
  - [ ] Setup load balancing
  - [ ] Configure auto-scaling
  - [ ] Set resource limits
  - [ ] Setup monitoring/alerting
  - [ ] Create disaster recovery plan

- [ ] **Testing**
  - [ ] Run full test suite
  - [ ] Load testing
  - [ ] Security scanning
  - [ ] Penetration testing
  - [ ] Backup/restore testing

- [ ] **Documentation**
  - [ ] Update README for production
  - [ ] Document deployment steps
  - [ ] Create runbooks
  - [ ] Document troubleshooting steps
  - [ ] Setup status page

---

## 🔒 Security Best Practices

### Environment Variables

✅ **DO**:
- Use `.env` file for secrets
- Add `.env` to `.gitignore`
- Use strong passwords
- Rotate secrets regularly
- Use environment-specific configs

❌ **DON'T**:
- Commit `.env` to git
- Use default passwords in production
- Share `.env` files via email
- Hardcode secrets in code

### Django Security

```python
# settings.py for production

DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# CSRF Protection
CSRF_TRUSTED_ORIGINS = ['https://yourdomain.com']

# CORS
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]

# SSL
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
```

### Nginx Security

```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;

# Security headers
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

---

## 📊 Monitoring & Logging

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Last N lines
docker-compose logs -f --tail=50

# Specific time range
docker-compose logs --since 2024-09-24T10:00:00
```

### Health Check

```bash
curl http://localhost/health
```

### Resource Usage

```bash
docker stats
```

### Container Info

```bash
docker-compose ps
docker-compose images
docker inspect <container_name>
```

---

## 📞 Support & Resources

### Documentation
- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Official Guides
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Vite Guide](https://vitejs.dev/)
- [Docker Compose Reference](https://docs.docker.com/compose/reference/)

### Common Issues
- Check GitHub Issues in this repository
- Review [Troubleshooting](#troubleshooting) section
- Check [docs/architecture.md](./docs/architecture.md)

---

## 📄 License

MIT License - feel free to use this project as a template for your own applications

```
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 Author & Credits

- **Project**: IT Infrastructure Qualification Test
- **Company**: Digital Storemesh Co., Ltd.
- **Created**: September 24, 2024
- **Repository**: https://github.com/<your-username>/it-infras-test

### Technologies Used
- Django 4.2 + Django REST Framework
- React 18 + Vite
- PostgreSQL 15
- Nginx Alpine
- Docker & Docker Compose

---

## 📞 Contact & Support

For issues, questions, or contributions:

1. **GitHub Issues**: Create a GitHub issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Docker output/logs

2. **Email**: (Add contact info if applicable)

3. **Documentation**: Check [docs/architecture.md](./docs/architecture.md)

---

## 🚀 Quick Reference

### Common Commands

```bash
# Start
docker-compose up --build

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Access database
docker-compose exec db psql -U postgres

# Clean rebuild
docker-compose down -v && docker-compose up --build
```

### URLs Reference

```
http://localhost/             # Frontend
http://localhost/admin/       # Django Admin
http://localhost/api/         # API Root
http://localhost/health       # Health Check
```

---

**Last Updated**: September 24, 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✓