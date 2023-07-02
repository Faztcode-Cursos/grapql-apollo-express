//* Tipos de definiciones, Queries y Mutations 
const typeDefs = `#graphql
  type Task{
    id: ID
    title: String!
    description: String
  }

  type Query{
    hello: String
    getAllTask: [Task]
    getTask(id: ID): Task
  }

  input TaskInput{
    title: String!
    description: String
  }

  type Mutation{
    createTask(task: TaskInput!): Task
    deleteTask(id: ID!): String
    updateTask(id: ID!, task: TaskInput): Task
  }

`;

module.exports = typeDefs;