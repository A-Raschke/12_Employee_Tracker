const inquirer = require('inquirer');
const mysql = require('./config/connection');

// could not get employees and roles done in time

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?\n'
    }
]

const menuQuestions = [
    {
        type:'list',
        name: 'menuChoice',
        message: 'What would you like to do?',
        choices: ['View All Departments',
                    'Add Department',
                    'Quit']
    }
]

const viewDepartment = () =>{
    mysql.promise().query('SELECT * from department;')
    .then(res=>{console.table(res[0])
        showList()
    });
}

const addDepartment = () =>{
    inquirer
        .prompt(addDepartmentQuestions)
        .then(({departmentName})=>{
            mysql.promise().query(`INSERT INTO department(name) VALUE ('${departmentName}');`)
            .then(res=>{
                console.log(`Added ${departmentName} to database`);
                showList();
            })
        })
}

const listOptions = (response) =>{
    switch(response.menuChoice){
        case 'View All Departments':
            viewDepartment();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Quit':
            console.log('complete');
            mysql.end();
            break;
    }
}

const employeeGraphic = () => {
console.log(" _____                 _                       \r\n| ____|_ __ ___  _ __ | | ___  _   _  ___  ___ \r\n|  _| | \'_ ` _ \\| \'_ \\| |\/ _ \\| | | |\/ _ \\\/ _ \\\r\n| |___| | | | | | |_) | | (_) | |_| |  __\/  __\/\r\n|_____|_| |_| |_| .__\/|_|\\___\/ \\__, |\\___|\\___|\r\n                |_|            |___\/           \r\n __  __                                   \r\n|  \\\/  | __ _ _ __   __ _  __ _  ___ _ __ \r\n| |\\\/| |\/ _` | \'_ \\ \/ _` |\/ _` |\/ _ \\ \'__|\r\n| |  | | (_| | | | | (_| | (_| |  __\/ |   \r\n|_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|   \r\n                          |___\/           \r\n")
}

const showList = () =>{
    inquirer
    .prompt(menuQuestions)
    .then((response)=>listOptions(response))
}

const init = () =>{
    employeeGraphic();
    showList();
}

init();