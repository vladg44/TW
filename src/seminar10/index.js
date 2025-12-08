// Express Initialisation
import express, { urlencoded, json } from "express";
const app = express();
const port = 3000;

// Sequelize Initialisation
import { sync } from "./sequelize.js";

// Import created models
import { hasMany, findAll, create, findByPk } from "./models/university.js";
import University from "./models/university.js";
import Student, { findAll as _findAll } from "./models/student.js";
import Course from "./models/course.js";

// Express middleware
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

// Define the model relationship.
hasMany(Student);

// Kickstart the Express aplication
app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});

/**
 * EXPORT - GET all universities with their students, courses and enrollments.
 */
app.get("/", async (req, res, next) => {
  try {
    let allCourses = [];
    try {
      allCourses = await Course.findAll();
    } catch (err) {
      // If Course table doesn't exist yet, return empty array
      allCourses = [];
    }
    
    const universities = await University.findAll({ 
      include: [Student]
    });
    
    // Format the data for export with enrollments
    const exportData = await Promise.all(universities.map(async (uni) => {
      const students = uni.students || [];
      const enrollments = [];
      
      // Collect all enrollments (student-course pairs)
      for (const student of students) {
        try {
          const courses = await student.getCourses();
          courses.forEach(course => {
            enrollments.push({
              studentId: student.id,
              courseId: course.id
            });
          });
        } catch (err) {
          // If enrollment table doesn't exist, skip
        }
      }
      
      return {
        universityName: uni.universityName,
        students: students.map(s => ({
          id: s.id,
          studentFullName: s.studentFullName,
          studentStatus: s.studentStatus
        })),
        courses: allCourses.map(c => ({
          id: c.id,
          courseName: c.courseName,
          courseCode: c.courseCode
        })),
        enrollments: enrollments
      };
    }));
    
    res.status(200).json(exportData);
  } catch (err) {
    next(err);
  }
});

/**
 * IMPORT - POST to import universities with students, courses and enrollments.
 */
app.post("/import", async (req, res, next) => {
  try {
    const { universities } = req.body;
    
    if (!universities || !Array.isArray(universities)) {
      return res.status(400).json({ message: 'Invalid import format. Expected { universities: [...] }' });
    }

    for (const uniData of universities) {
      // Create university
      const university = await create({ universityName: uniData.universityName });

      // Create courses
      const courseMap = {};
      if (uniData.courses) {
        for (const courseData of uniData.courses) {
          const course = await Course.create({ 
            courseName: courseData.courseName,
            courseCode: courseData.courseCode 
          });
          courseMap[courseData.id] = course.id;
        }
      }

      // Create students
      const studentMap = {};
      if (uniData.students) {
        for (const studentData of uniData.students) {
          const student = new Student({
            studentFullName: studentData.studentFullName,
            studentStatus: studentData.studentStatus
          });
          student.universityId = university.id;
          await student.save();
          studentMap[studentData.id] = student.id;
        }
      }

      // Add enrollments
      if (uniData.enrollments) {
        for (const enrollment of uniData.enrollments) {
          const student = await Student.findByPk(studentMap[enrollment.studentId]);
          const course = await Course.findByPk(courseMap[enrollment.courseId]);
          if (student && course) {
            await student.addCourse(course);
          }
        }
      }
    }

    res.status(201).json({ message: 'Data imported successfully!' });
  } catch (err) {
    next(err);
  }
});

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
app.get("/create", async (req, res, next) => {
  try {
    await sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all the universities from the database.
 */
app.get("/universities", async (req, res, next) => {
  try {
    const universities = await findAll();
    res.status(200).json(universities);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new university to the database.
 */
app.post("/university", async (req, res, next) => {
  try {
    await create(req.body);
    res.status(201).json({ message: "University Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all students.
 */
app.get("/students", async (req, res, next) => {
  try {
    const students = await _findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

/**
 * GET all courses.
 */
app.get("/courses", async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new course.
 */
app.post("/courses", async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new student into a university.
 */
app.post("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await findByPk(req.params.universityId);
    if (university) {
      const student = new Student(req.body);
      student.universityId = university.id;
      await student.save();
      res.status(201).json({ message: 'Student crated!'});
    } else {
      res.status(404).json({ message: '404 - University Not Found'});
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET all the students from a university using include.
 */
app.get("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await findByPk(req.params.universityId, {
      include: [Student]
    });
    if (university) {
      res.status(200).json(university.students);
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch(error) {
    next(error);
  }
});

/**
 * GET a specific student from a university.
 */
app.get("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await findByPk(req.params.universityId, {
      include: [Student]
    });
    if (university) {
      const student = university.students.find(s => s.id == req.params.studentId);
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: '404 - Student Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch(error) {
    next(error);
  }
});

/**
 * PUT in order to update a student from a university.
 */
app.put("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await findByPk(req.params.universityId);
    if (university) {
      const stundents = await university.getStudents({ id: req.params.studentId });
      const student = stundents.shift();
      if (student) {
        student.studentFullName = req.body.fullName;
        student.studentStatus = req.body.status;
        await student.save();
        res.status(202).json({ message: 'Student updated!' });
      } else {
        res.status(404).json({ message: '404 - Student Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE a student from a university.
 */
app.delete("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await findByPk(req.params.universityId);
    if (university) {
      const students = await university.getStudents({ id: req.params.studentId });
      const student = students.shift();
      if (student) {
        await student.destroy();
        res.status(200).json({ message: 'Student deleted!' });
      } else {
        res.status(404).json({ message: '404 - Student Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET all enrollments (courses) for a specific student.
 */
app.get("/universities/:universityId/students/:studentId/enrollments", async (req, res, next) => {
  try {
    const university = await findByPk(req.params.universityId);
    if (university) {
      const students = await university.getStudents({ where: { id: req.params.studentId } });
      const student = students.shift();
      if (student) {
        const courses = await student.getCourses();
        res.status(200).json(courses);
      } else {
        res.status(404).json({ message: '404 - Student Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST - Enroll a student in a course.
 */
app.post("/students/:studentId/courses/:courseId", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    const course = await Course.findByPk(req.params.courseId);
    
    if (!student) {
      return res.status(404).json({ message: '404 - Student Not Found!'});
    }
    if (!course) {
      return res.status(404).json({ message: '404 - Course Not Found!'});
    }
    
    await student.addCourse(course);
    res.status(201).json({ message: 'Student enrolled in course!' });
  } catch (error) {
    next(error);
  }
});

