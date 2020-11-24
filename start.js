const mongoose = require('mongoose');


(async ()=>{
    try {
        await mongoose.connect('mongodb://localhost/employee', {useNewUrlParser: true});
        console.log("Successfully connected to mongodb.");
    } catch (error) {
        console.log(`Connection field to MongoDB. Descrpition: ${error}`);
    }
})()

require('./model/employee_model.js')
require('./index.js');

