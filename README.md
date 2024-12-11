# Human Resources Management System
## Requirements
Design a recruitment system. Must include:
- A page to view list of candidates
- CRUD on candidates.
### Stack
- Backend: Java 8+, Spring Boot
- Database: H2(in prod), PostgreSQL(optional)
- Frontend: Angular, Ionic Framework, init with min. 10 candidates
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

#### CRUD API:
| Action             | HTTP Method | Endpoint                             | Description                                    |
|--------------------|-------------|--------------------------------------|------------------------------------------------|
| Aday ekleme        | POST        | /api/candidates                      | Add a new candidate                            |
| Aday listeleme     | GET         | /api/candidates                      | List all candidates                           |
| Aday güncelleme    | PUT         | /api/candidates/{id}                 | Update an existing candidate by ID            |
| Aday silme         | DELETE      | /api/candidates/{id}                 | Delete a candidate by ID                      |
| Filtreleme         | GET         | /api/candidates?position={position}&militaryStatus={status}&noticePeriod={period} | Filter candidates by position, military status, and notice period |

## Frontend
#### Candidate List:
- A list of registered candidates is displayed.
- The user can filter the list by position, military status, and notice period.

#### New Candidate Add/Edit Form:
- The user can enter first name, last name, applied position, military status, notice period, phone, and email information.
- A CV can be uploaded.
- When the form is saved, the data is sent to the backend, and the list is updated.

#### Delete Operation:
- Each candidate should have a "Delete" button next to them.



## Building & Running
## Database
## Endpoint List
| Action             | HTTP Method | Endpoint                             | Description                                    |
|--------------------|-------------|--------------------------------------|------------------------------------------------|
| Aday ekleme        | POST        | /api/candidates                      | Add a new candidate                            |
| Aday listeleme     | GET         | /api/candidates                      | List all candidates                           |
| Aday güncelleme    | PUT         | /api/candidates/{id}                 | Update an existing candidate by ID            |
| Aday silme         | DELETE      | /api/candidates/{id}                 | Delete a candidate by ID                      |
| Filtreleme         | GET         | /api/candidates?position={position}&militaryStatus={status}&noticePeriod={period} | Filter candidates by position, military status, and notice period |
