# Proyecto Final - Programación Concurrente

Django (API REST, SQLite) + React (Vite) + Tailwind, orquestado con Docker Compose.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) con Docker Compose v2

## Estructura

```
├── README.md
├── docker-compose.yml
├── backend/    # Django
└── frontend/   # React + Vite + Tailwind
```

## Replicar

```bash
git clone https://github.com/LEGM2002/app-django-concurrente-2027-1.git # HTTPS
# or
git clone git@github.com:LEGM2002/app-django-concurrente-2027-1.git # SSH (Recommended)
cd app-django-concurrente-2027-1
docker compose up --build
```

Las migraciones se aplican automáticamente al iniciar el backend.

## Comprobación

Para comprobar que funciona bien al acceder ingresa en el navegador `http://localhost:5173/` 
y deberías ver la palabra Hello en la página, además dale clic derecho, selecciona 
`Inspect` y de ahí vete a `Console` y deberías ver el mensaje `{"message": "Hola Mundo... Django"}`.

## Comandos útiles

```bash
docker compose exec backend python manage.py createsuperuser   # crear al admin
docker compose exec backend python manage.py makemigrations    # nuevas migraciones
docker compose exec backend pip install <paquete>              # luego añádelo a requirements.txt con pip freeze > requirements.txt
docker compose exec frontend npm install <paquete>             # actualizará el package.json
docker compose down                                            # detener
docker compose down -v                                         # detener y limpiar volúmenes
```

Si se cambia `requirements.txt` o `package.json`, hay que reconstruir con `docker compose up --build`.

## Notas

- La base de datos es SQLite (`backend/db.sqlite3`) y persiste en la carpeta local.
- CORS permite únicamente `http://localhost:5173` (ver `backend/config/settings.py`).