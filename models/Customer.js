var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var CustomerSchema = new mongoose.Schema({
  nik: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    // match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },
  name: {
    type: String,
    required: [true, "can't be blank"],
    // match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },
  email1: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  email2: {
    type: String,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  }
}, {timestamps: true});

CustomerSchema.plugin(uniqueValidator, {message: 'is already taken'});

CustomerSchema.methods.toJSONFor = function(){
  return {
    nik: this.nik,
    name: this.name,
    email1: this.email1,
    email2: this.email2
  }
}

mongoose.model('Customer', CustomerSchema);