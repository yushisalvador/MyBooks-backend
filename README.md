# Library (Backend)

This is the backend of the application 'Library'. An application that helps you keep track of the books you're reading.

![image](https://user-images.githubusercontent.com/84162315/183370309-dc07b1ff-e99f-4d85-95cc-d962a9711a99.png)

![image](https://user-images.githubusercontent.com/84162315/183370261-08760477-3526-4a16-a17a-21286f4cdf01.png)

A separate repository for the Vue.js Frontend is available 👉🏼[here](https://github.com/yushisalvador/libraryapp-frontend).

This is a RESTful API built with Node Express and Postgres.

# Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Guide](#guide)
- [API](#api)
- [Test](#test)
- [BackLog](#backlog)

# Technologies

- [Node](https://nodejs.org/en/) v16
- [TypeScript](https://www.typescriptlang.org/docs/) 4.7
- [Express](https://expressjs.com/) 4.1
- [PostgreSQL](https://www.postgresql.org/) with [Knex](http://knexjs.org/)
- [Heroku](https://devcenter.heroku.com/categories/reference)
- [Chai](https://www.chaijs.com/), [Mocha](https://mochajs.org/), [Supertest](https://www.npmjs.com/package/supertest)
- [JWT](https://jwt.io/)

# Setup

- Clone and open this repository by running the following command on your terminal.

```
https://github.com/yushisalvador/libraryapp-backend.git
cd libraryapp-backend
code .
```

- Run `npm install` in your root directory to install the needed dependencies.

### Setting up the database.

- To use this api, you will need Postgres installed. You will need Postgres installed. If you haven't installed it already, download and install the [PostgresApp](https://postgresapp.com/) and verify its working by running the command psql in your terminal.
- Once you got your psql set up, log in to your postgres account in your terminal, and create a database called "library" by running `CREATE DATABASE library;`
- Once you got your database set up, exit the psql terminal and run `npx knex migrate: latest` to run the migrations, and `npx knex seed:run` to run the seeds (optional)

### Environment variables

- Create a .env file on your root directory with the following information:

```
DB_USER= postgres username
DB_PASSWORD= postgres password
DB_NAME=library
PORT=9000
ACCESS_TOKEN_SECRET=random access token
REFRESH_TOKEN_SECRET=random refresh token

```
### Start server
- To sart the server, run ``` npm run dev ``` . This command will start the server with nodemon.

# Guide (Quick walkthrough the repository)

`` db `` Contains the migration files and seeds. 

`` src ``
   * `` auth `` 
       * `` auth.model.ts `` Contains all the Knex query builder code for auth.
       * `` auth.controller.ts `` Contains logic for authorization used by routes, and uses auth.model.
   * `` books `` 
       * `` books.model.ts`` Contains all the Knex query builder code for books.
       *  `` books.controller.ts `` Contains logic for authorization used by routes, and uses auth.model.
   * `` middleware ``
       * `` middleware.ts`` Contains auhtenticateFunction which serves as a middleware to protect routes.
   * `` routes ``
       * `` index.ts `` Contains all the main routes for the app -- /auth and /book.
       * `` auth.ts `` Contains all the auth routes.
       * `` books.ts `` Contains all the book api routes
   * `` types ``
       * `` types.ts `` Contains the types for User, Books, Token -- mainly use to specify types all throughout the app. 
   * `` utils ``
       * ``generateToken.ts `` Contains all the jwt related requests/functions
   * `` index.ts `` Contains the server builder function.
   * `` server.ts `` Sets up all the middlewares used all throughout the routes such as cors, express.
   
`` Procfile `` Used for Heroku deployment

`` Knexfile.ts `` Houses all the Knex configurations


# API
#### Books
/books

- `GET` : Get all books
- `POST` : Add a new book

/books/:id

- `PUT` : Update the "date_finished" row of the book with the specified id
- `DELETE` : Delete the book with the specified id


/api/mybooks?username

- `GET` : Get books owned by the specified username
- `DELETE` : Delete the books by the specified username


#### Auth 
/auth/users

- `GET` : Get all registered users

/auth/user?username

- `DELETE` : Delete a specific user


/auth/register

- `POST` : Register a new user

/auth/login

- `POST` : Login to account

/auth/logout/:id

- `DELETE` : Logout and delete refresh token

/auth/token

- `POST` : Generate a new access token with the refresh token


# Test
This application uses Chai, Mocha and Supertest for api testing. To run the tests, run `npm test` in the root directory. A Test account is provided in the `fixtures.js` file.

# BackLog

- Write more tests for auth
- Implement roles and enhance security
