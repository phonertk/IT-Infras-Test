# System Architecture Diagram

## Overview

```mermaid
graph TB
    User["👤 User/Client<br/>Browser"]
    
    subgraph "Internet"
        direction TB
    end
    
    subgraph "Docker Network"
        direction TB
        Nginx["🌐 Nginx<br/>Reverse Proxy<br/>Port: 80"]
        
        subgraph "Backend Services"
            direction TB
            React["⚛️ React Frontend<br/>Vite App<br/>Port: 3000"]
            Django["🐍 Django Backend<br/>REST API<br/>Port: 8000"]
        end
        
        DB["🗄️ PostgreSQL<br/>Database<br/>Port: 5432"]
    end
    
    User -->|HTTP Request| Nginx
    
    Nginx -->|Static Files<br/>CSS, JS| React
    Nginx -->|API Routes<br/>/api/*| Django
    
    React -->|CORS Request<br/>Axios/Fetch| Django
    
    Django -->|Query| DB
    DB -->|Response| Django
    
    Django -->|JSON| React
    React -->|HTML + JSON| Nginx
    Nginx -->|Response| User
    
    classDef userStyle fill:#FFB6C1,stroke:#333,stroke-width:2px
    classDef proxyStyle fill:#87CEEB,stroke:#333,stroke-width:2px
    classDef frontendStyle fill:#90EE90,stroke:#333,stroke-width:2px
    classDef backendStyle fill:#FFD700,stroke:#333,stroke-width:2px
    classDef dbStyle fill:#DDA0DD,stroke:#333,stroke-width:2px
    
    class User userStyle
    class Nginx proxyStyle
    class React frontendStyle
    class Django backendStyle
    class DB dbStyle
```

## Data Flow

### 1. Frontend Request Flow
- User opens browser → `http://localhost`
- Nginx receives request at port 80
- Routes to React static files
- React app loads and displays UI

### 2. API Request Flow
- React component calls backend API: `axios.get('/api/data/')`
- Request goes through Nginx (reverse proxy)
- Nginx routes to Django backend at `http://backend:8000`
- Django processes request and queries PostgreSQL
- Response returns through Nginx to React

### 3. Services Communication
- **Frontend ↔ Backend**: Via Nginx proxy (http://backend:8000)
- **Backend ↔ Database**: Direct connection (db:5432)
- **User ↔ System**: Via Nginx port 80

## Component Details

### Nginx (Reverse Proxy)
- **Port**: 80 (external access)
- **Role**: Route traffic, load balance, serve static files
- **Routes**:
  - `GET /api/*` → Django Backend
  - `GET /admin/*` → Django Admin
  - `GET /*` → React Frontend

### React Frontend
- **Port**: 3000 (internal, accessed via Nginx)
- **Technology**: React 18 + Vite
- **Build**: Multi-stage Docker build (Node + Nginx)
- **Static Serving**: Nginx alpine

### Django Backend
- **Port**: 8000
- **Technology**: Django 4.2 + DRF (Django REST Framework)
- **Server**: Gunicorn WSGI server
- **Database**: PostgreSQL 15.2

### PostgreSQL Database
- **Port**: 5432
- **Technology**: PostgreSQL 15.2
- **Storage**: Docker volume (persistent)
- **Access**: Django ORM via psycopg2-binary

## Docker Network