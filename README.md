# Order Management System

## Tecnologías

- **Backend:** .NET 9, Entity Framework Core, PostgreSQL, JWT, Swagger.
- **Frontend:** React 19, Vite, Tailwind CSS v4, Axios, Lucide React, Framer Motion.

## Estructura del Proyecto

### Backend (Clean Architecture)
- **Domain:** Entidades e interfaces base.
- **Application:** Servicios, DTOs y lógica de negocio.
- **Infrastructure:** Repositorios (EF Core), persistencia y seguridad.
- **WebAPI:** Controladores, inyección de dependencias y Middleware de excepciones.

### Frontend
- **AuthContext:** Manejo de sesiones y seguridad.
- **Axios Interceptors:** Inyección de token automática.
- **Rutas protegidas:** Control de acceso en la navegación.
- **Framer Motion:** Micro-animaciones para la UI.

## Cómo ejecutar

### 1. Con Docker (Recomendado)
Es la forma más rápida ya que levanta todo el entorno.

1. Abrir terminal en la raíz del proyecto.
2. Ejecutar: `docker-compose up --build`
3. Acceso:
   - **Frontend:** http://localhost
   - **Swagger:** http://localhost:5182/swagger

### 2. Ejecución Manual

**Requisitos:** .NET 9 SDK, Node.js v20+, PostgreSQL.

**Base de Datos:**
1. Crear base de datos `order_db` en Postgres.
2. Ejecutar el script: `/scripts/database.sql`.

**Backend:**
```bash
cd backend/src/OrderManagement.API
dotnet run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Acceso:**
- App: http://localhost:5173
- Credenciales: `user@email.com` / `123456`