require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const { json } = require('body-parser');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const connectDB = require('./db');

//* Inicializa Express 
const app = express();  
//* Inicializa conexion de MongoDB 
connectDB();

//* Endpoint GET 
app.get('/', (req, res) => res.send('Welcome to my api'));




async function start() {
  //* Instancia servidor de apollo 
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  //* Inicializa Apollo Server 
  await apolloServer.start();

  //* Agregando Middleware de CORS, Body JSON y Express con Apollo Server
  app.use('/graphql', cors(), json(), expressMiddleware(apolloServer));

  //* Middleware que envia un mensaje con codigo 404 a cualquier ruta no definida en la API 
  app.use('*', (req, res) => res.status(404).send("Not found"))

  //* Corriendo servidor de express y graphQL 
  app.listen(process.env.PORT, () => {
    console.log('Server on port', process.env.PORT);
  });
}

start();


module.exports = app;