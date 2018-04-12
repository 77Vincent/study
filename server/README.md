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
* Querystring can be multiple values separated by comma and chained
* Sorting has two possible value: **DESC** or **ASC**
```
/api/users?gender=0&majors=2,3,4&cost=DESC
```
* Pagination, page start from 1
* Each page is limited by 20 items by default
```
/api/users?page=1
```

### sessions
| URL | Method | Resource |
| - | - | - |
| /api/sessions | POST | Sign in |
| /api/sessions | DELETE | Sign out |

### users
| URL | Method | Resource |
| - | - | - |
| /api/users | GET | All users |
| /api/users?id | GET | **Filter**: users with specified id |
| /api/users?role_id | GET | **Filter**: users with specified role |
| /api/users?gender | GET | **Filter**: users with specified gender 
| /api/users?majors | GET | **Filter**: users with specified majors |
| /api/users?province | GET | **Filter**: users with specified province |
| /api/users?city | GET | **Filter**: users with specified city |
| /api/users?place | GET | **Filter**: users with specified place to have the course |
| /api/users?cost | GET | **Sorting**: users ordered by cost |
| /api/users | PUT | Create a new user |
| /api/users/:id | GET | A user |
| /api/users/:id | POST | Update a user |
| /api/users/:id | DELETE | Delete a user |


### majors
| URL | Method | Resource |
| - | - | - |
| /api/majors | GET | All majors |
| /api/majors | PUT | Create a major |
| /api/majors/:id | POST | Update a major |
| /api/majors/:id | DELETE | Delete a major |

### courses
| URL | Method | Resource |
| - | - | - |
| /api/courses | GET | All courses |
| /api/courses | PUT | Create a course |
| /api/courses/:id | POST | Update a course |
| /api/courses/:id | DELETE | Delete a course |

## Static Assets
| URL | Resource |
| - | - |
| /location/zh/provinces.json | Provinces list |
| /location/zh/cities.json | Cities list |

