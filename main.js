#! /usr/bin/env node
//SHEBANG
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Select an operation",
            choices: ["Add", "Update", "View", "Delete", "Exit"],
        }
    ]);
    if (ans.select === "Add") {
        let addToDo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "What would you like to add in your todos?",
            validate: function (input) {
                if (input.trim() == "") {
                    return "Please enter a non_empty item.";
                }
                return true;
            }
        });
        if (addToDo.todo.trim() !== "") {
            todos.push(addToDo.todo);
            todos.forEach(todos => console.log(todos));
        }
    }
    if (ans.select === "Update") {
        let updateToDo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "Would you like to update in todos?",
            choices: todos.map(item => item)
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add items in list",
        });
        let newTodo = todos.filter(val => val !== updateToDo.todo);
        todos = [...newTodo, addTodo.todo];
        todos.forEach(todos => console.log(todos));
    }
    if (ans.select === "View") {
        console.log("To-Do list");
        todos.forEach(todos => console.log(todos));
    }
    if (ans.select === "Delete") {
        let deleteToDo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "Would you like to delete in todos?",
            choices: todos.map(item => item)
        });
        let newTodo = todos.filter(val => val !== deleteToDo.todo);
        todos = [...newTodo];
        todos.forEach(todos => console.log(todos));
    }
    if (ans.select === "Exit") {
        console.log(`Exiting..`);
        condition = false;
    }
}
