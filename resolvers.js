const Task = require('./models/Task');

const resolvers = {
  Query: {
    hello: () => "Hello World",
    getAllTask: async() => {
      //* Obtiene todas las tareas 
      const tasks = await Task.find();

      return tasks;
    },
    getTask: async (_, args) => {
      //* Obtiene una tarea por id 
      const task = await Task.findById(args.id);
      return task;
    },
  },
  Mutation: {
    createTask: async(_, args) => {
      //* Desestructurando objeto de task pasado como argumento y obteniendo su "title" y "description" 
      const { title, description } = args.task;

      //* Creando documento a insertar a la coleccion Task(devuelve el objeto con la nueva tarea creada)
      const newTask = new Task({ title, description });
      // console.log(newTask);
      //* Insertando nueva Task a mongoDB
      await newTask.save();

      return newTask;
    },
    deleteTask: async (_, { id }) => {
      //* Elimina la tarea segun el ID especificado
      await Task.findByIdAndDelete(id);

      return "Task deleted";
    },
    updateTask: async (_, {task,id}) => { 
      //* Actualizando tarea segun el Id y objeto de nueva tarea especificado 
      const taskUpdated = await Task.findByIdAndUpdate(id,{
        //* $set permite actualizar o todos o algunos campos de un documento 
        $set: task
      },{new: true});

      //* Devuelve el objeto ya actualizado de la tarea
      return taskUpdated;
    }
  }
}

module.exports = resolvers