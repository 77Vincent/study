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
| URL | Method | Resource |
| - | - | - |
| /api/sessions | POST | Sign in |
| /api/sessions | DELETE | Sign out |

### users
| URL | Method | Resource |
| - | - | - |
| /api/users | GET | All users |
| /api/users?id | GET | All users with specified id |
| /api/users?role_id | GET | All users with specified role |
| /api/users?gender | GET | All users with specified gender 
| /api/users?majors | GET | All users with specified majors |
| /api/users | PUT | Create a new user |
| /api/users/:id | GET | A user |
| /api/users/:id | POST | Update a user |
| /api/users/:id | DELETE | Delete a user |

### majors
| URL | Method | Resource |
| - | - | - |
| /api/majors | GET | All majors |

### courses
| URL | Method | Resource |
| - | - | - |
| /api/courses | GET | All courses |

