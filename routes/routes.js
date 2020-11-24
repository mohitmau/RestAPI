const express = require('express');
const route = express.Router();

const controller = require('../Controller/employee_controller.js');

route.get('/load', controller.api_data);

route.get('/employee', controller.get);

route.post('/employee', controller.create);

route.put('/employee/:id', controller.update);

route.delete('/employee/:id', controller.destroy);

route.get('/employee/:id', controller.getId);

module.exports = route;
