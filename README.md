# Library (Backend)
This is the backend of the application 'Library'. An application that helps you keep track of the books you're reading. 

![image](https://user-images.githubusercontent.com/84162315/183370309-dc07b1ff-e99f-4d85-95cc-d962a9711a99.png)

![image](https://user-images.githubusercontent.com/84162315/183370261-08760477-3526-4a16-a17a-21286f4cdf01.png)

A separate repository for the Vue.js Frontend is available  👉🏼[here](https://github.com/yushisalvador/libraryapp-frontend).

This is a RESTful API built with Node Express and Postgres.

# Table of Contents
* [Technologies](#technologies)
* [Setup](#setup)
* [API](#api)
* [Test](#test)
* [BackLog](#backlog)

# Technologies
* [Node](https://nodejs.org/en/) v16
* [TypeScript](https://www.typescriptlang.org/docs/) 4.7
* [Express](https://expressjs.com/) 4.1
* [PostgreSQL](https://www.postgresql.org/) with [Knex](http://knexjs.org/)
* [Heroku](https://devcenter.heroku.com/categories/reference)
* [Chai](https://www.chaijs.com/), [Mocha](https://mochajs.org/), [Supertest](https://www.npmjs.com/package/supertest)
* [JWT](https://jwt.io/)

# Setup
* Clone and open this repository by running the following command on your terminal. 
```
https://github.com/yushisalvador/libraryapp-backend.git
cd libraryapp-backend
code .
```
* Run ``` npm install ``` in your root directory to install the needed dependencies.

### Setting up the database. 
* To use this api, you will need Postgres installed. You will need Postgres installed. If you haven't installed it already, download and install the [PostgresApp](https://postgresapp.com/) and verify its working by running the command psql in your terminal.
* Once you got your psql set up, log in to your postgres account in your terminal, and create a database called "library" by running ``` CREATE DATABASE library; ```
* Once you got your database set up, exit the psql terminal and run ``` npx knex migrate: latest ``` to run the migrations, and ``` npx knex seed:run ``` to run the seeds (optional) 

### Environment variables 
* Create a .env file on your root directory with the following information: 
```
DB_USER= postgres username
DB_PASSWORD= postgres password
DB_NAME=library
PORT=9000
```

# API
/books
* ```GET```  : Get all books
* ```POST``` : Add a new book

/books?id
* ```PUT``` : Update the "date_finished" row of the book with the specified id
* ```DELETE``` : Delete the book with the specified id

/books/mybooks?username
* ```GET``` : Get books owned by the specified username
* ```DELETE``` : Delete the books by the specified username

/auth
* ```GET``` : Get all registered users

/auth?username
* ```DELETE``` : Delete a specific user

/auth/register
* ```POST``` : Register a new user

/auth/login
* ```POST``` : Login to account

/auth/logout?id
* ```DELETE``` : Logout and delete refresh token

/auth/token?id
* ```POST``` : Generate a new access token with the refresh token

# Test
This application uses Chai, Mocha and Supertest for api testing. To run the tests, run ``` npm test ``` in the root directory. A Test account is provided in the ```fixtures.js``` file.

# BackLog
* Write more tests for auth



