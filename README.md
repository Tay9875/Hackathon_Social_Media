# Hackathon_Social_Media
> Small social media project

- [Hackathon\_Social\_Media](#hackathon_social_media)
  - [Built with](#built-with)
  - [Database](#database)
  - [Routes](#routes)
  - [Authentication](#authentication)
  - [User](#user)
    - [All Users](#all-users)
    - [Current User](#current-user)
    - [Retrieve User](#retrieve-user)
    - [Create User](#create-user)
    - [Modify User](#modify-user)
    - [Delete User](#delete-user)
  - [Token](#token)
  - [Comment](#comment)

## Built with
This project uses the following languages, frameworks and tools:
1. Node / js
2. Vue
3. Vercel
4. Express
5. MongoDB

## Database
![alt text](SchemaBDD.png)

## Routes
## Authentication
## User
### All Users
Retrieves every user in table: `GET    /api/users`

**Response:**
```json
    {
        "_id": "68f1f35a5e81a958c048dff2",
        "firstName": "Thomas",
        "lastName": "Marques",
        "gender": "male",
        "birthDate": "2004-09-03T00:00:00.000Z",
        "email": "contact@coded4.me",
        "address": "47 bd de Pesaro",
        "avatar": "https://randomuser.me/api/portraits/lego/5.jpg",
        "password": "$2b$10$LrdmXwqecn1wW8tyG/ztiu9IE.Xld203LNHaBNKTsRi8gi.adire6",
        "description": "Je suis développeur",
        "uuid": "862cdfca-94c0-4f3f-a86f-65748bd5c91e",
        "token": "1fbf4ce5-ec45-4ae5-ad57-bd3bf1533f76",
        "createdAt": "2025-10-17T07:42:18.616Z",
        "updatedAt": "2025-10-17T07:42:18.616Z",
        "__v": 0
    }
```
**Status codes:**
- 200: All users are retrieved.
- 500: Error with detailed message.

### Current User
Retrieve current logged in user: `GET    /api/users/me`

**Response:**
```json
    {
        "uuid": "58446d3c-9fe9-4056-a1cb-ab92721151d7",
        "firstName": "Peter",
        "lastName": "PARKER",
        "gender": "male",
        "birthDate": "1990-01-01T00:00:00.000Z",
        "email": "spiderman@spidey.com",
        "address": "Somwhere in London",
        "avatar": "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg",
        "password": "TheOGSpiderMan#9562",
        "description": "With great power comes great responsibility",
        "_id": "68f204b4eed603da764bd2ef",
        "token": "3b806701-c62d-49d3-9937-bde5b65df63a",
        "createdAt": "2025-10-17T08:56:20.554Z",
        "updatedAt": "2025-10-17T08:56:20.554Z",
        "__v": 0
    }
```

**Status codes:**
- 200: User returned.
- 404: User not found.
- 500: Error with detailed message

### Retrieve User
Retrieves specific user: `GET    /api/users/:uuid`

**Required parameters:**
`:uuid` = User's unique identifier.

**Response:**
```json
    {
        "uuid": "58446d3c-9fe9-4056-a1cb-ab92721151d7",
        "firstName": "Peter",
        "lastName": "PARKER",
        "gender": "male",
        "birthDate": "1990-01-01T00:00:00.000Z",
        "email": "spiderman@spidey.com",
        "address": "Somwhere in London",
        "avatar": "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg",
        "password": "TheOGSpiderMan#9562",
        "description": "With great power comes great responsibility",
        "_id": "68f204b4eed603da764bd2ef",
        "token": "3b806701-c62d-49d3-9937-bde5b65df63a",
        "createdAt": "2025-10-17T08:56:20.554Z",
        "updatedAt": "2025-10-17T08:56:20.554Z",
        "__v": 0
    }
```

**Status codes:**
- 200: User created and returned.
- 500: Error with detailed message.

### Create User
Create a user: `POST    /api/users/`

**Body**
```json
    {
        "firstName": "Peter",
        "lastName": "PARKER",
        "gender": "male",
        "birthDate": "1990-01-01T00:00:00.000Z",
        "email": "spiderman@spidey.com",
        "address": "180 Roadfield Bd",
        "avatar": "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg",
        "password": "TheOGSpiderMan#9562",
        "description": "With great power comes great responsibility"
    }
```

**Response:**
```json
    {
        "uuid": "58446d3c-9fe9-4056-a1cb-ab92721151d7",
        "firstName": "Peter",
        "lastName": "PARKER",
        "gender": "male",
        "birthDate": "1990-01-01T00:00:00.000Z",
        "email": "spiderman@spidey.com",
        "address": "Somwhere in London",
        "avatar": "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg",
        "password": "TheOGSpiderMan#9562",
        "description": "With great power comes great responsibility",
        "_id": "68f204b4eed603da764bd2ef",
        "token": "3b806701-c62d-49d3-9937-bde5b65df63a",
        "createdAt": "2025-10-17T08:56:20.554Z",
        "updatedAt": "2025-10-17T08:56:20.554Z",
        "__v": 0
    }
```

**Status codes:**

- 200: User created and returned.
- 400: User isn't created because of missing required fields (firstName, lastName, password, email, birthDate ...).
- 401: User isn't created because email or password are invalid.
- 409: User isn't created because it already exists.
- 500: Error with detailed message

### Modify User
Modify a specific user's information (firstName, lastNAme, gender, birthDate, address, avatar, password, description): `PUT    /api/users/:uuid`

**Required parameters:**
`:uuid` = User's unique identifier.

**Body**
```json
    {
        "description": "I wanna quit!"
    }
```

**Response:**
```json
    {
        "aknowledged": "True",
        "count": 1
    }
```

**Status codes:**
- 200: User modified.
- 500: Error with detailed message

### Delete User
Delete user: `DELETE    /api/users/:uuid`

**Required parameters:**
`:uuid` = User's unique identifier.

**Response:**
```json
    {
        "aknowledged": "True",
        "count": 1
    }
```

**Status codes:**
- 200: User deleted.
- 500: Error with detailed message

## Token
## Comment
