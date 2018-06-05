const Database = require('../database.js')

const run = async () => {
  try {
    await Database.model('course_major').bulkCreate([
      { course_id: 1, major_id: 1 }, { course_id: 1, major_id: 2 }, { course_id: 1, major_id: 3 },
      { course_id: 1, major_id: 4 }, { course_id: 2, major_id: 3 }, { course_id: 2, major_id: 6 },
      { course_id: 3, major_id: 3 }, { course_id: 3, major_id: 5 }, { course_id: 4, major_id: 4 },
      { course_id: 5, major_id: 5 }, { course_id: 6, major_id: 6 }, { course_id: 6, major_id: 1 },
    ])
    await Database.model('class_course').bulkCreate([
      { class_id: 1, course_id: 1 }, { class_id: 1, course_id: 2 }, { class_id: 1, course_id: 3 },
      { class_id: 2, course_id: 1 }, { class_id: 2, course_id: 3 }, { class_id: 2, course_id: 4 },
      { class_id: 3, course_id: 3 }, { class_id: 3, course_id: 4 }, { class_id: 4, course_id: 4 },
      { class_id: 4, course_id: 5 }, { class_id: 4, course_id: 6 }, { class_id: 4, course_id: 7 },
      { class_id: 5, course_id: 1 }, { class_id: 5, course_id: 3 }, { class_id: 6, course_id: 2 },
      { class_id: 6, course_id: 4 }, { class_id: 6, course_id: 6 }, { class_id: 7, course_id: 2 },
      { class_id: 7, course_id: 5 }, { class_id: 7, course_id: 6 }, { class_id: 8, course_id: 1 },
      { class_id: 8, course_id: 7 }, { class_id: 9, course_id: 3 }, { class_id: 9, course_id: 4 },
      { class_id: 9, course_id: 7 }, { class_id: 10, course_id: 1 }, { class_id: 10, course_id: 5 },
      { class_id: 10, course_id: 6 },
    ])

    Database.close()
  } catch (err) {
    console.error('init Error', err)
  }
}
run()