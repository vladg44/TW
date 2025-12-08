const { Op } = require("sequelize");
const Employee = require("../models/employee");

const router = require("express").Router();

router
  .route("/employees")
  .get(async (req, res) => {
    // get all with optional filtering by name and sorting
    try {
      const { name, sortBy, order } = req.query;
      let whereCondition = {};
      let orderCondition = [];

      // If name query parameter is provided, filter by firstName or lastName
      if (name) {
        whereCondition = {
          [Op.or]: [
            { firstName: { [Op.like]: `%${name}%` } },
            { lastName: { [Op.like]: `%${name}%` } }
          ]
        };
      }

      // If sortBy query parameter is provided, add ordering
      if (sortBy) {
        const sortOrder = order && (order.toUpperCase() === 'DESC' || order.toUpperCase() === 'ASC') 
          ? order.toUpperCase() 
          : 'ASC';
        orderCondition = [[sortBy, sortOrder]];
      }

      const employees = await Employee.findAll({ 
        where: whereCondition,
        order: orderCondition
      });
      return res.status(200).json(employees);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    // create
    // console.log("req.body :>> ", req.body);
    try {
      const newEmployee = await Employee.create(req.body);
      return res.status(200).json(newEmployee);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

// Get employee by ID
router
  .route("/employees/:id")
  .get(async (req, res) => {

     const { minSalary, simplified } = req.query;

    try {
      const employee = await Employee.findByPk(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      return res.status(200).json(employee);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  // Update employee
  .put(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      const updatedEmployee = await employee.update(req.body);
      return res.status(200).json(updatedEmployee);
    } catch (err) {
      return res.status(500).json(err);
    }
  })
  // Delete employee
  .delete(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      await employee.destroy();
      return res.status(200).json({ message: "Employee deleted successfully" });
    } catch (err) {
      return res.status(500).json(err);
    }
  });

module.exports = router;