# Human Resources Management System
## Requirements
Design a recruitment system:
- A page to view list of candidates
- CRUD on candidates.

### Stack
- Backend: Java 8+, Spring Boot
- Database: H2(in dev), PostgreSQL(in prod-optional)
- ~~Frontend: Angular, Ionic Framework, init with min. 10 candidates~~
- Frontend: React

## Details
### Backend
#### Candidates Table:
| Field           | Description                                |
|-----------------|--------------------------------------------|
| id              | Unique identifier                          |
| firstName      | First name                                 |
| lastName       | Last name                                  |
| position       | Applied position                           |
| militaryStatus | Military status (tamamlandı/muaf/tecilli) |
| noticePeriod   | Notice period (e.g., 2 weeks/1 month)      |
| phone          | Phone number                               |
| email          | Email address                              |
| cv             | CV file name or path                       |

### Frontend
#### Candidate List:
- A list of registered candidates is displayed.
- The user can filter the list by position, military status, and notice period.

#### New Candidate Add/Edit Form:
- The user can enter first name, last name, applied position, military status, notice period, phone, and email information.
- A CV can be uploaded.
- When the form is saved, the data is sent to the backend, and the list is updated.

#### Delete Operation:
- Each candidate should have a "Delete" button next to them.

# Project Completion Details
## What's done
|  | Task |
| --- | --- |
| `X` | Backend: Java Spring Boot JDK 17 |
| `X` | Database: H2 in development + PostgreSQL |
| `X` | Frontend: Used React instead of Angular |
| `X` | All required endpoints + login and register + JWT |
| `X` | CV file upload |


## Build & Run

### Docker
In the root of repo:
```
docker-compose up --build
```
This will build and run frontend, backend and postgresql.
> localhost:8080 Backend

> localhost:3000 Frontend

> localhost:5432 PostgreSQL

```
Note: in Fedora 41 docker rpm repo, docker-compose in cli is not supported(yet, as i know). use this instead:
docker compose up --build
```

### Manually
#### Verify you have JDK 17 installed
```
java -version
```

#### Verify you have Maven
```
mvn -version
```

#### Verify you have node.js 20 or later
```
node -v
npm -v
```

#### Build and Run the Backend
```
cd backend
mvn clean package -Dmaven.test.skip=true
java -jar target/backend.jar
```
The backend will now be running on port 8080.

#### Build and Run the Frontend
```
cd frontend
npm install
npm run build
npm install -g serve
serve -s build
```
The frontend will now be running on port 3000.

## Database

### PostgreSQL
PostgreSQL Database credentials are configured in .env file(available in repo):
```
POSTGRES_USER=cankurttekin-db-user
POSTGRES_PASSWORD=cankurttekin-db-pass
```

To create db and user:
```
CREATE DATABASE hr_db;
CREATE USER your_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE hr_db TO your_user;
```

#### Tables
#### OPTION1 - Auto schema generation with Hibernate:
Add these lines to application.properties file:
```
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
# To show SQL uncomment:
# spring.jpa.show-sql=true 
```

#### OPTION2 - Creating tables manuallay:
> SQL Script provided in db_scripts/ directory.
```
-- Create the `app_user` table
CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the `candidates` table
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    military_status VARCHAR(50),
    notice_period VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cv VARCHAR(255) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE
);
```

To verify tables run this in psql:
```
\dt
```
or
```
SELECT * FROM information_schema.tables WHERE table_schema = 'public';
```



## Endpoints
| Action             | HTTP Method | Endpoint                             | Description                                    |
|--------------------|-------------|--------------------------------------|------------------------------------------------|
| Aday ekleme        | POST        | /api/candidates                      | Add a new candidate                            |
| Aday listeleme     | GET         | /api/candidates                      | List all candidates                           |
| Aday güncelleme    | PUT         | /api/candidates/{id}                 | Update an existing candidate by ID            |
| Aday silme         | DELETE      | /api/candidates/{id}                 | Delete a candidate by ID                      |
| Filtreleme         | GET         | /api/candidates/filter?position={position}&militaryStatus={status}&noticePeriod={period} | Filter candidates by position, military status, and notice period |
| login    | POST         | /api/auth/login                | Login with username and password            |
| register         | POST      | /api/auth/register                 | Register                      |
