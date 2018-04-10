# SERVER DOCUMENTATION

## Run
```js
npm i
npm start
```

## Initialize database
```js
npm run db 
```

## Code Convention
* No semi-colon
* Use async / await instead of Promise

## Structure
* Configurations: ./config.js
* Entry file: ./index.js
* Functions: ./utili
* Routes: ./routes
* Models: ./models
* Static files: ./static
* Scripts for development: ./scripts

## REST API
### sessions
* POST: sign in
```bash
/api/sessions
```
* DELETE: sign out
```bash
/api/sessions
```

### users
* GET: all users
```bash
/api/users
```
* GET: a user
```bash
/api/users/:id
```
* POST: update a user
```bash
/api/users/:id
```
* PUT: create a user
```bash
/api/users
```
* DELETE: delete a user
```bash
/api/users
```

### majors
* GET: all majors
```bash
/api/majors
```
