# Server Documentation

## Development 
```js
npm i
npm start
```

## Production
```js
npm i
npm run server 
```

## Initialize database
* Initial data in ./scripts/init-db.js
```js
npm run db 
```

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
```
/api/users?gender=0&majors=2,3,4&cost=DESC
```
* Pagination, page start from 1, limit is 20 items per page by default
```
/api/users?page=1
```

### sessions
| URL | Method | Resource |
| - | - | - |
| /api/sessions | POST | Sign in |
| /api/sessions | DELETE | Sign out |

### users
| URL | Method | Resource | Params range |
| - | - | - | - |
| /api/users | GET | All users | |
| /api/users?id | GET | **Filter**: users with specified id |  |
| /api/users?majors | GET | **Filter**: users with specified majors |  |
| /api/users?province | GET | **Filter**: users with specified province | [Check here](http://39.104.108.82:3001/location/zh/provinces.json) |
| /api/users?city | GET | **Filter**: users with specified city | [Check here](http://39.104.108.82:3001/location/zh/cities.json) |
| /api/users?role_id | GET | **Filter**: users with specified role | teacher, student, admin |
| /api/users?gender | GET | **Filter**: users with specified gender | 0, 1 |
| /api/users?place | GET | **Filter**: users with specified place to have the course | online, offline, both |
| /api/users?cost | GET | **Sorting**: users ordered by cost | DESC, ASC |
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
| /api/courses?majors | GET | **Filter**: courses with specified majors |
| /api/courses?label | GET | **Search (Strict match)**: courses with specified label |
| /api/courses | PUT | Create a course |
| /api/courses/:id | POST | Update a course |
| /api/courses/:id | DELETE | Delete a course |

## Static Assets
| URL | Resource |
| - | - |
| /location/zh/provinces.json | Provinces list |
| /location/zh/cities.json | Cities list |


## User Story
### 导航条
* 非固定，背景色全宽，内容区同主体部分容器宽

### 登录页
* 可用于登陆的ID包括：手机号、邮箱
* 微信登陆

### 注册页
* ID：手机号、邮箱注册（需有相应的验证）
* 后端预留用户名，自动生成，客户端不暴露给用户，作为标准实践，以便日后需要。
* 注册时不区分身份，默认皆为学生，后可申请成为老师，申请后通过认证身份才会变成老师。

### 老师搜索页
* 老师有active状态，默认true，可被搜出
* 过滤器：专业、性别、上课方式、地点、国家、价格
* 一次只显示一个老师，类似幻灯片的方式切换
* 左右切换老师
* 老师背景图轮播，共可放置三张，第一张为头像，后两张需自行设置
* 点击红心收藏老师，加进我的老师列表
* 点击按钮“跟ta学习”，进入老师主页

### 老师主页
* 老师才开放主页功能
* 每条状态图片不超过5张，配文不超过200个字符。
* 每条状态有点赞和评论区
* 访客（非注册用户）也可点赞，评论只能是注册用户。

### 信箱系统

### 支付、订单系统
