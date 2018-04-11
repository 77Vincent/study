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
| /api/users?role_id=teacher | GET | All users with role of teacher |
| /api/users?gender=0 | GET | All users with gender of 0 |
| /api/users?majors=1,2 | GET | All users with majors of 1 and 2 |
