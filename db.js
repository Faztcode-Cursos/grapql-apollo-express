const { connect } = require('mongoose');

const connectDB = async() => {
  try {
    await connect(process.env.MONGODB_CNN);
    console.log('Mongodb conectado');

  } catch (error) {
    console.error(error);
    // throw new Error('Error a la hora de iniciar la base de datos');
  }
}

module.exports = connectDB;