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

## Test
```bash
npm test
```

## Generate REST API Documentation
* The documentation is generated at /static/doc
* The documentation can be accessed at http://localhost:3001/doc/index.html
```bash
npm run doc
```

## File Structure
```
xfolio-server
|   config.js       // Global basic configurations
|   database.js     // Database instance
|   index.js        // Entry file
|
|---services/
|       index.js    // Global functions
|
|---routes/
|       index.js    // Routes
|
|---models/
|       index.js    // Models and relationships
|
|---static/         // Static files also served through 3001
|
|---test/        // Scripts for test 
```

## API
[RESTful API](http://39.104.108.82:3001/doc/index.html)
