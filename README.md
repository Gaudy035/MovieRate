# MovieRate

Full-stack movie rating web application built with **Next.js, Nest.js and PostgreSQL**

## Features

- **User authentication** - User authentication using JWT and HTTP only cookies.
- **Movie browsing** - Filtering movies in database by title.
- **Review system** - Viewing and writing reviews for movies.
- **Interactive documentation** - Interactive docs generated via Swagger UI available at `/docs`.

## Tech stack

- **Frontend** (Port:3000) - Next.js, TypeScript, tailwind.css
- **Backend** (Port:3001) - Nest.js, TypeORM, passport.js
- **Database** (Port:5433) - PostgreSQL

## Setting up

### .env files

Each required .env file has a corresponding .env.example showing how the file should look like

#### root .env

Variables used by database container in Docker

| Variable          | Description                            |
| ----------------- | -------------------------------------- |
| POSTGRES_USER     | User used by docker to access database |
| POSTGRES_PASSWORD | Database user password                 |
| POSTGRES_DB       | Name of the database used by Docker    |

#### backend/.env

Backend variables

| Variable    | Description                                       |
| ----------- | ------------------------------------------------- |
| PORT        | Port that backend will run on locally             |
| ORIGIN_URL  | URL of frontend                                   |
| DB_HOST     | Host where the database server runs               |
| DB_PORT     | Port on which database server runs                |
| DB_USERNAME | User that backend will use to connect to database |
| DB_PASSWORD | Database user password                            |
| DB_NAME     | Name of the database used by app                  |
| JWT_SECRET  | Secret key used by JWT                            |

#### frontend/.env

Frontend variables

| Variable                   | Description                                   |
| -------------------------- | --------------------------------------------- |
| API_URL_SERVER             | URL used by server components to call backend |
| NEXT_PUBLIC_API_URL_CLIENT | URL used by client components to call backend |

### Starting

When starting for the first time run:

```bash
docker-compose up --build
```

On later start-ups run

```bash
docker-compose up
```

To stop the app run

```bash
docker-compose down
```
