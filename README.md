# MovieRate

Full-stack movie rating web application built with **Next.js, Nest.js and PostgreSQL**

## Features

- **User authentication** - User authentication using JWT and HTTP only cookies.
- **Movie browsing** - Filtering movies in database by title.
- **Review system** - Viewing and writing reviews for movies.

## Tech stack

- **Frontend** - Next.js, TypeScript, tailwind.css
- **Backend** - Nest.js, TypeORM, passport.js
- **Database** - PostgreSQL

## Setting up

### .env files

Every required .env have .env.example showing how the file should look like

#### root .env

Variables used by database container in Docker

| Variable          | Description                            |
| ----------------- | -------------------------------------- |
| POSTGRES_USER     | User used by docker to access database |
| POSTGRES_PASSWORD | Database user password                 |
| POSTGRES_DB       | Name of the database used by Docker    |

#### backend/.env

Backend variables

| Variable    | Description                                             |
| ----------- | ------------------------------------------------------- |
| PORT        | Port that backend will on while running on local server |
| ORIGIN_URL  | URL of frontend                                         |
| DB_HOST     | Host on which database server runs                      |
| DB_PORT     | Port on which database server runs                      |
| DB_USERNAME | User that backend will use to connect to database       |
| DB_PASSWORD | Database user password                                  |
| DB_NAME     | Name of the database used by app                        |
| JWT_SECRET  | Secret key used by JWT                                  |

#### frontend/.env

Frontend variables

| Variable                   | Description                                   |
| -------------------------- | --------------------------------------------- |
| API_URL_SERVER             | URL used by server components to call backend |
| NEXT_PUBLIC_API_URL_CLIENT | URL used by client components to call backend |

### Docker

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

### Local server

#### Database

Replace `db_name` and `db_user` by Names of database and user that you are going to use with th app.

1. Create a database

```bash
createdb db_name
```

2. Run database script

```bash
psql -U db_user -d db_name -f ./db/script.sql
```

#### Backend

1. Install node dependencies

```bash
cd backend
npm install --legacy-peer-deps
```

2. With dependencies installed run:

```bash
npm run start:dev
```

#### Frontend

1. Install node dependencies

```bash
cd frontend
npm install --legacy-peer-deps
```

2. With dependencies installed run:

```bash
npm run dev
```
