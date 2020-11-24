const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const fetch = require('node-fetch');

exports.api_data = async function(request, response){
	 try{
        let api_data = await fetch("http://dummy.restapiexample.com/api/v1/employees");
    if (api_data.ok) { 
        let employee_json = await api_data.json();
        response.status(200).json(employee_json);
      } else {
        console.log("HTTP-Error: " + api_data.status);
    }
      }catch(e){
        console.log('Error is:');
        console.log(e);
    }
}

exports.get = async function(request, response){
	const employee = await Employee.find({});
	return response.status(200).json(employee);
}

exports.create = async function(request, response){
	let {id, employee_name, employee_salary, employee_age, profile_image} = request.body;
	let employee = new Employee();
	
	employee.id = id;
	employee.employee_name = employee_name;
	employee.employee_age = employee_age;
	employee.employee_salary = employee_salary;
	employee.profile_image = profile_image;
	await employee.save();
	return response.status(201).json(employee);
}

exports.update = async function(request, response){
	let {id, employee_name, employee_salary, employee_age, profile_image} = request.body;
	let employee = await Employee.findById(request.params.id);
	if(!employee){
		return response.status(204).json({ 'error': 'Employee Data not found' });
	}else{
		employee.id = id;
		employee.employee_name = employee_name;
		employee.employee_age = employee_age;
		employee.employee_salary = employee_salary;
		employee.profile_image = profile_image;
		await employee.save();
		return response.status(200).json(employee);
	}
}

exports.destroy = async function(request, response){
	let employee = await Employee.findById(request.params.id);
	if(!employee){
		return response.status(204).json({'error': 'Employee Data not found'});
	}else{
		await employee.remove();
		return response.status(204).json({});	
	}
}

exports.getId = async function(request, response){
	let employee = await Employee.findById(request.params.id);
	return response.status(200).json(employee);
}
