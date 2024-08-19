const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({ // Fixed typo: personShema -> personSchema
  name: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true, // Ensuring salary is only defined once
  },
  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: { // Use consistent casing
    type: String
  }
});

const Person = mongoose.model("Person", personSchema); // Use PascalCase for the model name
module.exports = Person;
