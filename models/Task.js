const mongoose = require("mongoose");

//schema defines the structure of the documents.. data types, validations etc
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [20, "name cannot exceed 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

//model is a representation of the collection
//an interface to the database
//perform CRUD operations via the model
//instance of the model is called a document

module.exports = mongoose.model("Task", TaskSchema);
//Capitalised singular name of the collection -> plural lowercase named collection in the database
