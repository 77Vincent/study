# Server Documentation

## Run
```js
npm i
npm start
```

## Initialize database
* Initial data in ./scripts/init-db.js
```js
npm run db 
```

## Code Convention
* No semi-colon
* Use async / await instead of Promise

## Structure
* Configurations: ./config.js
* Entry file: ./index.js
* Functions: ./utils
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

### courses
* GET: all courses
```bash
/api/sessions
```
* PUT: create a course
```bash
/api/sessions
```

* POST: update a course
```bash
/api/sessions/:id
```

* DELETE: a course
```bash
/api/sessions/:id
```

### majors
* GET: all majors
```bash
/api/majors
```
