# Server Documentation

## Runtime
* node@8.11.1

## Development 
```bash
npm i
npm start
```

## Production
```bash
npm i
npm run server 
```

## Initialize database
* Create dummy data from scratch
```bash
npm run create-db 
```
* Update some of the dummy data
```bash
npm run update-db 
```
* Delete some of the dummy data
```bash
npm run delete-db 
```

## Generate REST API Documentation
* The documentation is generated at /static/doc
* The documentation can be accessed at http://localhost:3001/api/doc/index.html
```bash
npm run doc
```

## Structure
* All global basic configurations
```
xfolio-server
|   config.js       // Global basic configurations
|   index.js        // Entry file
|
|---utils/
|       index.js    // Functions
|
|---routes/
|       index.js    // Routes
|
|---models/
|       index.js    // Models and relationships
|
|---static/         // Static files also served through 3001
|
|---scripts/        // Scripts for development       
```

## API
[RESTful API](http://39.104.108.82:3001/doc/index.html)
