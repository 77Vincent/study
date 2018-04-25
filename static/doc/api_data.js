define({ "api": [
  {
    "type": "delete",
    "url": "/api/classes/:id",
    "title": "Delete a class",
    "group": "Classes",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>void</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/classes.js",
    "groupTitle": "Classes",
    "name": "DeleteApiClassesId"
  },
  {
    "type": "get",
    "url": "/api/classes",
    "title": "Get all classes",
    "group": "Classes",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "boolean",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": true,
            "field": "finished",
            "defaultValue": "0,1",
            "description": "<p>Filtered by if the schedule is finished</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "allowedValues": [
              "ASC",
              "DESC"
            ],
            "optional": true,
            "field": "start",
            "defaultValue": "ASC",
            "description": "<p>Ordered by start time of the class</p>"
          },
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all schedules</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/classes.js",
    "groupTitle": "Classes",
    "name": "GetApiClasses"
  },
  {
    "type": "post",
    "url": "/api/classes/:id",
    "title": "Update a class",
    "group": "Classes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "start",
            "description": "<p>Class start time</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "end",
            "description": "<p>Class end time</p>"
          },
          {
            "group": "Parameter",
            "type": "double",
            "optional": false,
            "field": "length",
            "description": "<p>Duration of the class in hours</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": false,
            "field": "finished",
            "description": "<p>Is the class finished or not</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n  \"start\": new Date(),\n  \"end\": new Date('2018/05/01'),\n  \"length\": 2.5,\n  \"finished\": 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The updated class</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/classes.js",
    "groupTitle": "Classes",
    "name": "PostApiClassesId"
  },
  {
    "type": "put",
    "url": "/api/classes",
    "title": "Create a class",
    "group": "Classes",
    "description": "<p>The property &quot;finished&quot; is set to false by default</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "start",
            "description": "<p>Class start time</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": true,
            "field": "end",
            "description": "<p>Class end time</p>"
          },
          {
            "group": "Parameter",
            "type": "double",
            "optional": false,
            "field": "length",
            "description": "<p>Duration of the class in hours</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": true,
            "field": "finished",
            "defaultValue": "0",
            "description": "<p>Duration of the class in hours</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "schedule_id",
            "description": "<p>Which schedule does this class belong to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n  \"start\": new Date(),\n  \"end\": new Date('2018/05/01'),\n  \"length\": 2.5,\n  \"finished\": 0,\n  \"schedule_id\": 3 \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The created class</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/classes.js",
    "groupTitle": "Classes",
    "name": "PutApiClasses"
  },
  {
    "type": "delete",
    "url": "/api/comments/:id",
    "title": "Delete a comment",
    "group": "Comment",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>void</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/comments.js",
    "groupTitle": "Comment",
    "name": "DeleteApiCommentsId"
  },
  {
    "type": "get",
    "url": "/api/comments/",
    "title": "Get all comments",
    "group": "Comment",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all comments</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/comments.js",
    "groupTitle": "Comment",
    "name": "GetApiComments"
  },
  {
    "type": "put",
    "url": "/api/comments/",
    "title": "Create a comment",
    "group": "Comment",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The created comment</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/comments.js",
    "groupTitle": "Comment",
    "name": "PutApiComments"
  },
  {
    "type": "delete",
    "url": "/api/courses/:id",
    "title": "Delete a course",
    "group": "Courses",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>void</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/courses.js",
    "groupTitle": "Courses",
    "name": "DeleteApiCoursesId"
  },
  {
    "type": "get",
    "url": "/api/courses",
    "title": "Get all courses",
    "group": "Courses",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "id",
            "description": "<p>Filtered by the major ID</p>"
          },
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "user_id",
            "description": "<p>Filtered by the creator's user ID</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "label",
            "description": "<p>Search by course name</p>"
          },
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all courses</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/courses.js",
    "groupTitle": "Courses",
    "name": "GetApiCourses"
  },
  {
    "type": "post",
    "url": "/api/courses/:id",
    "title": "Update a course",
    "group": "Courses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "label",
            "description": "<p>The course name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>The course description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n  \"label\": \"course name\",\n  \"description\": \"course description\" \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The updated course</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/courses.js",
    "groupTitle": "Courses",
    "name": "PostApiCoursesId"
  },
  {
    "type": "put",
    "url": "/api/courses",
    "title": "Create a course",
    "group": "Courses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "label",
            "description": "<p>The course name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "description",
            "description": "<p>The course description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n  \"label\": \"course name\",\n  \"description\": \"course description\" \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The created course</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/courses.js",
    "groupTitle": "Courses",
    "name": "PutApiCourses"
  },
  {
    "type": "get",
    "url": "/cities/CN/cities.json",
    "title": "Cities list",
    "group": "Locations",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Cities list</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Locations",
    "name": "GetCitiesCnCitiesJson"
  },
  {
    "type": "get",
    "url": "/cities/CN/provinces.json",
    "title": "Provinces list",
    "group": "Locations",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Provinces list</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Locations",
    "name": "GetCitiesCnProvincesJson"
  },
  {
    "type": "get",
    "url": "/countries.json",
    "title": "Countries list",
    "group": "Locations",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Countries list</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Locations",
    "name": "GetCountriesJson"
  },
  {
    "type": "get",
    "url": "/api/majors/",
    "title": "Get all majors",
    "group": "Majors",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all majors</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/majors.js",
    "groupTitle": "Majors",
    "name": "GetApiMajors"
  },
  {
    "type": "put",
    "url": "/api/majors/",
    "title": "Create a major",
    "group": "Majors",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The created major</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/majors.js",
    "groupTitle": "Majors",
    "name": "PutApiMajors"
  },
  {
    "type": "get",
    "url": "/api/messages",
    "title": "Get all messages",
    "group": "Messages",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "user_id",
            "description": "<p>Filtered by the sender's user ID</p>"
          },
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "recipient_id",
            "description": "<p>Filtered by the recipient's user ID</p>"
          },
          {
            "group": "Query String",
            "type": "boolean",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": true,
            "field": "read",
            "defaultValue": "0,1",
            "description": "<p>Filtered by if the message is read</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "content",
            "description": "<p>Search by message content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all messages</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/messages.js",
    "groupTitle": "Messages",
    "name": "GetApiMessages"
  },
  {
    "type": "put",
    "url": "/api/messages",
    "title": "Create a new message",
    "group": "Messages",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>Message content</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>The sender's user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "recipient_id",
            "description": "<p>The recipient's user ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n  \"content\": \"Hellow world\",\n  \"user_id\": 1,\n  \"recipient_id\": 2 \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The newly created message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/messages.js",
    "groupTitle": "Messages",
    "name": "PutApiMessages"
  },
  {
    "type": "delete",
    "url": "/api/pictures/:id",
    "title": "Delete a picture",
    "group": "Picture",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>void</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pictures.js",
    "groupTitle": "Picture",
    "name": "DeleteApiPicturesId"
  },
  {
    "type": "get",
    "url": "/api/pictures/",
    "title": "Get all pictures",
    "group": "Picture",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all pictures</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pictures.js",
    "groupTitle": "Picture",
    "name": "GetApiPictures"
  },
  {
    "type": "put",
    "url": "/api/pictures/",
    "title": "Create a picture",
    "group": "Picture",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The created picture</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/pictures.js",
    "groupTitle": "Picture",
    "name": "PutApiPictures"
  },
  {
    "type": "delete",
    "url": "/api/posts/:id",
    "title": "Delete a post",
    "group": "Posts",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>void</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Posts",
    "name": "DeleteApiPostsId"
  },
  {
    "type": "get",
    "url": "/api/posts",
    "title": "Get all posts",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "user_id",
            "description": "<p>Filtered by user ID</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "content",
            "description": "<p>Search by posts' content</p>"
          },
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all posts</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Posts",
    "name": "GetApiPosts"
  },
  {
    "type": "get",
    "url": "/api/posts/:id",
    "title": "Get a post",
    "group": "Posts",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>A post object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Posts",
    "name": "GetApiPostsId"
  },
  {
    "type": "get",
    "url": "/api/posts/:id/comments",
    "title": "Get a post's comments",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all comments under a post</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Posts",
    "name": "GetApiPostsIdComments"
  },
  {
    "type": "get",
    "url": "/api/posts/:id/pictures",
    "title": "Get a post's pictures",
    "group": "Posts",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all pictures from a post</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Posts",
    "name": "GetApiPostsIdPictures"
  },
  {
    "type": "put",
    "url": "/api/posts",
    "title": "Create a post",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user_id",
            "description": "<p>The creator's user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>The post content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n  \"user_id\": 1,\n  \"content\": \"post content\" \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The created post</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/posts.js",
    "groupTitle": "Posts",
    "name": "PutApiPosts"
  },
  {
    "type": "get",
    "url": "/api/roles/",
    "title": "Get all roles",
    "description": "<p>0=admin, 1=teacher, 2=student</p>",
    "group": "Roles",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all roles</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/roles.js",
    "groupTitle": "Roles",
    "name": "GetApiRoles"
  },
  {
    "type": "put",
    "url": "/api/roles/",
    "title": "Create a role",
    "description": "<p>0=admin, 1=teacher, 2=student</p>",
    "group": "Roles",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The created role</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/roles.js",
    "groupTitle": "Roles",
    "name": "PutApiRoles"
  },
  {
    "type": "delete",
    "url": "/api/schedules/:id",
    "title": "Delete a schedule",
    "group": "Schedules",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>void</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/schedules.js",
    "groupTitle": "Schedules",
    "name": "DeleteApiSchedulesId"
  },
  {
    "type": "get",
    "url": "/api/schedules",
    "title": "Get all schedules",
    "group": "Schedules",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "teacher_id",
            "description": "<p>Filtered by teacher ID</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "student_id",
            "description": "<p>Filtered by student ID</p>"
          },
          {
            "group": "Query String",
            "type": "boolean",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": true,
            "field": "finished",
            "defaultValue": "0,1",
            "description": "<p>Filtered by if the schedule is finished</p>"
          },
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all schedules</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/schedules.js",
    "groupTitle": "Schedules",
    "name": "GetApiSchedules"
  },
  {
    "type": "get",
    "url": "/api/schedules/:id",
    "title": "Get a schedule",
    "group": "Schedules",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>A schedule</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/schedules.js",
    "groupTitle": "Schedules",
    "name": "GetApiSchedulesId"
  },
  {
    "type": "post",
    "url": "/api/schedules/:id",
    "title": "Update a schedule",
    "group": "Schedules",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "label",
            "description": "<p>The schedule name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The updated schedule</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/schedules.js",
    "groupTitle": "Schedules",
    "name": "PostApiSchedulesId"
  },
  {
    "type": "put",
    "url": "/api/schedules",
    "title": "Create a schedule",
    "group": "Schedules",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "label",
            "description": "<p>The schedule name</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "teacher_id",
            "description": "<p>The teacher user ID</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "student_id",
            "description": "<p>The student user ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The created schedule</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/schedules.js",
    "groupTitle": "Schedules",
    "name": "PutApiSchedules"
  },
  {
    "type": "delete",
    "url": "/api/sessions",
    "title": "Sign out",
    "group": "Sessions",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>void</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/sessions.js",
    "groupTitle": "Sessions",
    "name": "DeleteApiSessions"
  },
  {
    "type": "post",
    "url": "/api/sessions",
    "title": "Sign in",
    "group": "Sessions",
    "description": "<p>If now params are passed (id and password), a 204 respond will be returned</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>User ID, can be id, username, mobilephone, email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n  \"id\": \"12345678901\",\n  \"password\": \"000000\" \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>User Object</p>"
          }
        ],
        "204": [
          {
            "group": "204",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>No returned object when no params are passed</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>Access denied</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/sessions.js",
    "groupTitle": "Sessions",
    "name": "PostApiSessions"
  },
  {
    "type": "delete",
    "url": "/api/tags/:id",
    "title": "Delete a tag",
    "group": "Tag",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>void</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tags.js",
    "groupTitle": "Tag",
    "name": "DeleteApiTagsId"
  },
  {
    "type": "get",
    "url": "/api/tags/",
    "title": "Get all tags",
    "group": "Tag",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all tags</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tags.js",
    "groupTitle": "Tag",
    "name": "GetApiTags"
  },
  {
    "type": "put",
    "url": "/api/tags/",
    "title": "Create a tag",
    "group": "Tag",
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The created tag</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/tags.js",
    "groupTitle": "Tag",
    "name": "PutApiTags"
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "Delete a user",
    "group": "Users",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "void",
            "optional": false,
            "field": "void",
            "description": "<p>void</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "DeleteApiUsersId"
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "Get all users",
    "group": "Users",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "id",
            "description": "<p>Filtered by user ID</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "mobilephone",
            "description": "<p>Filtered by user mobilephone</p>"
          },
          {
            "group": "Query String",
            "type": "integer",
            "allowedValues": [
              "0",
              "1",
              "2"
            ],
            "optional": true,
            "field": "role_id",
            "defaultValue": "1,2",
            "description": "<p>Filtered by user's role, 0=admin, 1=teacher, 2=student</p>"
          },
          {
            "group": "Query String",
            "type": "boolean",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": true,
            "field": "gender",
            "defaultValue": "0,1",
            "description": "<p>Filtered by user gender</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "allowedValues": [
              "'online'",
              "'offline'",
              "'both'"
            ],
            "optional": true,
            "field": "place",
            "defaultValue": "both",
            "description": "<p>Filtered by the place to have the class</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "city",
            "description": "<p>Filtered by the city a user is living in, check &quot;Cities list&quot;</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "province",
            "description": "<p>Filtered by the province a user is living in, check &quot;Provinces list&quot;</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "optional": true,
            "field": "countries",
            "description": "<p>Filtered by the country a user is living in, check &quot;Countries list&quot;</p>"
          },
          {
            "group": "Query String",
            "type": "boolean",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": true,
            "field": "active",
            "defaultValue": "0,1",
            "description": "<p>Filtered by if a user wished to be found</p>"
          },
          {
            "group": "Query String",
            "type": "boolean",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": true,
            "field": "available",
            "defaultValue": "0,1",
            "description": "<p>Filtered by if a user is opened for booking</p>"
          },
          {
            "group": "Query String",
            "type": "string",
            "allowedValues": [
              "'DESC'",
              "'ASC'"
            ],
            "optional": true,
            "field": "cost",
            "description": "<p>Sorting by cost</p>"
          },
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "/api/users?id=1&gender=1,0&place=online&role_id=1&city=4503,1101",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains all users</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "GetApiUsers"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Get a user",
    "group": "Users",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>User object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "GetApiUsersId"
  },
  {
    "type": "get",
    "url": "/api/users/:id/followers",
    "title": "Get a user's followers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains a user's followers</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "GetApiUsersIdFollowers"
  },
  {
    "type": "get",
    "url": "/api/users/:id/followings",
    "title": "Get a user's followings",
    "group": "Users",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains a user's followings</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "GetApiUsersIdFollowings"
  },
  {
    "type": "get",
    "url": "/api/users/:id/students",
    "title": "Get a user's students",
    "group": "Users",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains a user's students</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "GetApiUsersIdStudents"
  },
  {
    "type": "get",
    "url": "/api/users/:id/teachers",
    "title": "Get a user's teachers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Query String": [
          {
            "group": "Query String",
            "type": "integer",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Pagination</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object[]",
            "optional": false,
            "field": "void",
            "description": "<p>Array contains a user's teachers</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "GetApiUsersIdTeachers"
  },
  {
    "type": "post",
    "url": "/api/users/:id",
    "title": "Update a user",
    "group": "Users",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The updated user object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PostApiUsersId"
  },
  {
    "type": "put",
    "url": "/api/users",
    "title": "Create a new user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobilephone",
            "description": "<p>User mobilephone number</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>User passowrd</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-example:",
          "content": "{\n  \"name\": \"Tony\",\n  \"mobilephone\": \"12345678901\",\n  \"password\": \"000000\" \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "object",
            "optional": false,
            "field": "void",
            "description": "<p>The newly created user object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users",
    "name": "PutApiUsers"
  }
] });
