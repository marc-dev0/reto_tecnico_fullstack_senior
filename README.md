
# 🧪 Reto Técnico — Fullstack Senior (.NET + React)

## **Postulación: Desarrollador Fullstack Senior**

Este reto técnico evalúa tus habilidades en **backend con .NET**, **frontend con React**, **arquitectura limpia**, **seguridad**, **patrones de resiliencia** y **buenas prácticas profesionales**, mediante la construcción de una aplicación **end-to-end**.

El alcance ha sido diseñado para ser **simple y de rapida implementación**, pero suficientemente robusto para evaluar un **perfil senior** con habilidades tanto Backend como Frontend.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/53d27747-edc1-4f5c-b9ff-105ce5be142a" />

---

# 🚀 **1. Objetivo del Reto**

Implementar una solución **Fullstack** que permita:

- Autenticación de usuarios.
- Gestión completa (**CRUD**) de **Pedidos**.
- Aplicación de **seguridad**, **patrones de resiliencia** y **arquitectura limpia**.
- Interfaz web funcional y clara en **React**.

La solución debe ser **funcional**, **segura**, **bien estructurada** y con código de calidad **senior**.

---

# 🏗️ **2. Arquitectura General**

La solución consta de **dos capas principales**:

### ✔️ **1. Backend — API REST (.NET 8/9)**

- API RESTful.
- Autenticación y autorización con JWT.
- Endpoints para:
  - Login
  - CRUD de Pedidos
- Aplicación de patrones de seguridad y resiliencia.

### ✔️ **2. Frontend — React**

- Aplicación SPA.
- Manejo de sesión con JWT.
- Pantallas de login y gestión de pedidos.

---

# 🔐 **3. Seguridad y Autenticación**

### Backend

- Endpoint `/auth/login`
- Validación de credenciales contra base de datos.
- Generación de **JWT Bearer Token** con claims.
- Protección de endpoints con `[Authorize]`.

### Reglas mínimas:

- Tokens con expiración.
- Uso de roles o claims (ej: `Admin`, `User`) **(Opcional pero valorado)**.
- Manejo de errores de autenticación y autorización.

---

# 📦 **4. Funcionalidad del Backend (API REST)**

## 📌 Endpoints mínimos requeridos

### 🔑 Autenticación

```
POST /auth/login
```

Request:
```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

Response:
```json
{
  "token": "jwt_token",
  "expiresIn": 3600
}
```

---

### 📦 Pedidos (CRUD)

- `GET /api/pedidos`
- `GET /api/pedidos/{id}`
- `POST /api/pedidos`
- `PUT /api/pedidos/{id}`
- `DELETE /api/pedidos/{id}`

### Modelo de Pedido (referencial)

```json
{
  "id": 1,
  "numeroPedido": "PED-001",
  "cliente": "Juan Perez",
  "fecha": "2025-01-10",
  "total": 250.75,
  "estado": "Registrado"
}
```

---

# 🧠 **5. Reglas de Negocio**

- No se pueden crear pedidos con total menor o igual a 0.
- El número de pedido debe ser único.
- Solo usuarios autenticados pueden acceder al CRUD.
- Eliminación lógica **(Opcional pero valorado)**.

---

# 🛡️ **6. Patrones y Requerimientos Técnicos Obligatorios**

## Backend (.NET)

- .NET **8 o 9**
- **Arquitectura limpia**
- Principios **SOLID**
- Inyección de dependencias
- Manejo global de excepciones (Opcional)
- Logging estructurado (Opcional)

### 🔐 Seguridad

- JWT Bearer
- Authorization Middleware

*(Se puede usar Polly o mecanismos nativos)*

### 💾 Persistencia

- SQL Server o PostgreSQL
- Entity Framework Core
- Migraciones automáticas

---

## Frontend (React)

- **React 16+ y/o Next.js**
- Manejo de rutas(React Router / Next Router)
- Estilos con **Tailwind CSS**, CSS o Styled Components
- Consumo de **API REST**
- Manejo de **estado de autenticación**

### Pantallas requeridas:

1. **Login** (Opcional pero valorado)
2. **Listado de Pedidos**
3. **Crear Pedido**
4. **Editar Pedido** (Opcional pero valorado)
5. **Eliminar Pedido** (Opcional pero valorado)
6. **Menú de navegación** (Opcional pero valorado)

---

# 📊 **7. Base de Datos (Modelo Referencial)**

```sql
CREATE TABLE Pedidos (
    Id INT IDENTITY PRIMARY KEY,
    NumeroPedido VARCHAR(50) NOT NULL UNIQUE,
    Cliente VARCHAR(150) NOT NULL,
    Fecha DATETIME NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    Estado VARCHAR(50) NOT NULL
);
```

---

# 🧪 **8. Criterios de Evaluación**

### 🏗️ Arquitectura (30%)
- Separación de responsabilidades
- Limpieza del código
- Uso correcto de patrones

### ⚙️ Funcionalidad (30%)
- CRUD completo funcional
- Autenticación operativa
- Validaciones de negocio

### 🔐 Seguridad (20%)
- JWT

### 🎨 Frontend (20%)
- UX clara
- Navegación funcional
- Correcta integración con API

⭐ Bonus:
- Mejoras creativas de UX no requeridas explícitamente

---

# 📬 **9. Entrega Final**

El candidato debe entregar:

- Repositorio Git
- README documentado
- Scripts de base de datos
- Instrucciones para ejecutar el proyecto
- Postman collection **(Opcional)**

---

# 🎯 **10. Resultado Esperado**

Una aplicación **Fullstack**, funcional, segura y bien estructurada, que refleje experiencia real en proyectos profesionales con **.NET y React**.

---

# ✅ ¡Éxitos en el reto!
