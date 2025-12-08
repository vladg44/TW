import sequelize from '../sequelize.js';
import { DataTypes } from 'sequelize';
import Student from './student.js';

const Course = sequelize.define('course', {
    courseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// Many-to-many relationship: Student has many Courses and Course has many Students
Course.belongsToMany(Student, { through: 'StudentCourse' });
Student.belongsToMany(Course, { through: 'StudentCourse' });

export const findAll = () => Course.findAll();
export const create = (data) => Course.create(data);
export const findByPk = (id) => Course.findByPk(id);

export default Course;
