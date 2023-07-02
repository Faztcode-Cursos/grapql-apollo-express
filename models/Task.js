const { Schema, model } = require('mongoose');


//* Esquema Task 
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String
});

//* Exportando modelo del esquema 
module.exports = model('Task', TaskSchema);