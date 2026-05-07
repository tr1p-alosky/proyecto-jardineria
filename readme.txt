# Backend BrightView Landscapes - API Documentation

Esta es la documentacion completa del backend del sistema BrightView Landscapes para desarrolladores frontend.

## Tecnologias Principales
- Framework: NestJS (TypeScript)
- ORM: Prisma (v7 Early Access)
- Base de Datos: PostgreSQL
- Autenticacion: JWT
- Validacion: class-validator

## Configuracion del Proyecto

### 1. Instalar dependencias
Asegurese de tener Node.js instalado. Abra la terminal en la raiz del proyecto y ejecute:

```
npm install
```

### 2. Configurar Variables de Entorno
Cree un archivo llamado `.env` en la raiz del proyecto (al mismo nivel que `package.json`) y agregue las siguientes variables. Ajuste el usuario, contrasena y puerto segun la instalacion de PostgreSQL en su computadora:

```
DATABASE_URL="postgresql://postgres:equipo3@localhost:5432/brightview_db"
JWT_SECRET="super-secreto-brightview-2026-XD"
```

Nota: Asegurese de que la base de datos `brightview_db` ya este creada en su servidor PostgreSQL local antes de continuar.

### 3. Configurar la Base de Datos con Prisma
Para sincronizar el esquema con su base de datos (crear las tablas automaticamente) ejecute:

```
npx prisma db push
```

Para generar el cliente tipado de Prisma (necesario cada vez que modifica el schema):

```
npx prisma generate
```

### 4. Levantar el Servidor
Para iniciar el servidor en modo desarrollo (con recarga automatica de cambios):

```
npm run start:dev
```

El backend estara listo para recibir peticiones en http://localhost:3000.

### 5. Documentacion Interactiva
La documentacion completa de la API esta disponible en Swagger UI en:
http://localhost:3000/api

## Autenticacion

La API utiliza JWT (JSON Web Tokens) para autenticacion. Todos los endpoints excepto el login requieren un token Bearer en el header Authorization.

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email_corporativo": "usuario@empresa.com",
  "password": "contrasena123"
}
```

Respuesta exitosa:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "001-BV",
    "nombre": "Juan Perez",
    "role": "ADMIN"
  }
}
```

Para usar el token en peticiones posteriores, incluyalo en el header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints de la API

### Gestion de Personal

#### Crear primer usuario (solo cuando no hay usuarios registrados)
```
POST /personal/onboarding/init
Content-Type: application/json

{
  "id_empleado": "001-BV",
  "nombre_completo": "Juan Perez Garcia",
  "email_corporativo": "juan.perez@brightview.com",
  "password": "password123",
  "telefono": "+1234567890",
  "cargo": "Gerente General",
  "departamento": "Administracion",
  "direccion": "Calle Principal 123",
  "fecha_nacimiento": "1985-05-15"
}
```

#### Crear empleado (requiere autenticacion ADMIN o RH)
```
POST /personal/onboarding
Authorization: Bearer <token>
Content-Type: application/json

{
  "id_empleado": "002-BV",
  "nombre_completo": "Maria Rodriguez",
  "email_corporativo": "maria.rodriguez@brightview.com",
  "password": "password123",
  "role": "EMPLEADO",
  "telefono": "+1234567891",
  "cargo": "Jardinero",
  "departamento": "Operaciones",
  "direccion": "Avenida Central 456",
  "fecha_nacimiento": "1990-08-20"
}
```

### Control de Asistencias

#### Registrar asistencia
```
POST /asistencia
Authorization: Bearer <token>
Content-Type: application/json

{
  "id_empleado": "001-BV",
  "hora_entrada": "2026-05-07T08:00:00Z",
  "hora_salida": "2026-05-07T17:00:00Z",
  "ganancias_dia": 120.50,
  "bonos_activos": 25.00
}
```

#### Actualizar asistencia
```
PATCH /asistencia/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "hora_salida": "2026-05-07T17:30:00Z",
  "ganancias_dia": 135.75
}
```

#### Listar asistencias
```
GET /asistencia?id_empleado=001-BV
Authorization: Bearer <token>
```

### Gestion de Permisos

#### Crear solicitud de permiso
```
POST /permisos
Authorization: Bearer <token>
Content-Type: application/json

{
  "id_empleado": "001-BV",
  "tipo_permiso": "VACACION",
  "fecha_inicio": "2026-06-01T00:00:00Z",
  "fecha_fin": "2026-06-05T23:59:59Z"
}
```

Tipos de permiso disponibles:
- VACACION
- CITA_MEDICA
- ASUNTOS_PERSONALES

#### Actualizar estado de permiso (solo ADMIN o RH)
```
PATCH /permisos/1/estado
Authorization: Bearer <token>
Content-Type: application/json

{
  "estado": "APROBADA"
}
```

Estados disponibles:
- PENDIENTE
- APROBADA
- RECHAZADA

#### Listar permisos
```
GET /permisos?id_empleado=001-BV
Authorization: Bearer <token>
```

### Gestion de Formacion

#### Crear registro de formacion (solo ADMIN o RH)
```
POST /formacion
Authorization: Bearer <token>
Content-Type: application/json

{
  "id_empleado": "001-BV",
  "nombre_curso": "Diseño Biofilico Avanzado",
  "progreso": 0,
  "fecha_expiracion": "2027-05-07T00:00:00Z",
  "reconocimiento": "Top 5% Company Talent"
}
```

#### Actualizar formacion (solo ADMIN o RH)
```
PATCH /formacion/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "progreso": 75,
  "reconocimiento": "Certificado Completado"
}
```

#### Listar formaciones
```
GET /formacion?id_empleado=001-BV
Authorization: Bearer <token>
```

## Roles y Permisos

La API utiliza un sistema de roles para controlar el acceso:

- **ADMIN**: Acceso completo a todas las funcionalidades
- **RH**: Gestion de personal, formacion y aprobacion de permisos
- **JEFE_CUADRILLA**: Supervision de equipo operativo
- **EMPLEADO**: Acceso basico a funciones personales

## Manejo de Errores

La API devuelve errores en formato JSON con la siguiente estructura:

```json
{
  "statusCode": 400,
  "message": "Mensaje de error descriptivo",
  "error": "Bad Request"
}
```

Codigos de estado comunes:
- 200: Exito
- 201: Creado exitosamente
- 400: Datos invalidos
- 401: No autorizado (token invalido o faltante)
- 403: Prohibido (permisos insuficientes)
- 404: Recurso no encontrado
- 409: Conflicto (datos duplicados)
- 500: Error interno del servidor

## Validaciones

Todos los endpoints validan automaticamente los datos de entrada. Los campos requeridos y formatos se especifican en los DTOs. Los errores de validacion se devuelven con mensajes descriptivos.

## Comandos Utiles

Para visualizar e interactuar con la base de datos de manera grafica desde el navegador:

```
npx prisma studio
```

Para ejecutar pruebas (cuando se implementen):

```
npm test
```

Para construir la aplicacion para produccion:

```
npm run build
npm run start:prod
```

## Soporte

Para preguntas sobre la API o problemas de integracion, consulte la documentacion de Swagger en http://localhost:3000/api o contacte al equipo de backend.
