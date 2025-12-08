import sequelize from '../sequelize.js';
import { DataTypes } from 'sequelize';
import Student from './student.js';

const University = sequelize.define('university', {
    universityName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 20]
        }
    }    
});

export const hasMany = (StudentModel) => University.hasMany(StudentModel);
export const findAll = () => University.findAll();
export const findAllWithRelations = () => University.findAll({ 
  include: [Student] 
});
export const create = (data) => University.create(data);
export const findByPk = (id, options) => University.findByPk(id, options);

export default University;
