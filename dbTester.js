const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/lyndaAPI');
/*
 * Connect to a database so the below code works.
 * What is happening is that we are creating a new schema
 * and making a 'todos' collection and a 'Todo' model.
 * We then create a new Todo
 * So, in the mongo shell in the terminal, connect to your
 * database and query it there and check whether you see the
 * todo below log in the terminal.
 * Run `db.Tester` to execute this file
 * MAKE SURE MONGOD is RUNNING
 */

const TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean
});

const Todo = mongoose.model("todo", TodoSchema);
Todo.create({
    name: "Clean up your room!!!",
    completed: false
  })
  .then((err, todo) => {
    console.log(err, todo);
  });
