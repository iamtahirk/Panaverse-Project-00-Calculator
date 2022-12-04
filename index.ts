#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from 'chalk-animation';
import { createSpinner } from "nanospinner";
import { clear } from "console";


const sleep = (ms = 2000) => new Promise((res) => setTimeout(res, ms));

async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow(`
    Welcome to the most advanced calculator ever existed 😁`);
    await sleep();
    rainbowTitle.stop();
    
    console.log(chalk.redBright(`
    ██████╗ ██╗   ██╗    ███╗   ███╗   ████████╗ █████╗ ██╗  ██╗██╗██████╗ 
    ██╔══██╗╚██╗ ██╔╝    ████╗ ████║   ╚══██╔══╝██╔══██╗██║  ██║██║██╔══██╗
    ██████╔╝ ╚████╔╝     ██╔████╔██║      ██║   ███████║███████║██║██████╔╝
    ██╔══██╗  ╚██╔╝      ██║╚██╔╝██║      ██║   ██╔══██║██╔══██║██║██╔══██╗
    ██████╔╝   ██║       ██║ ╚═╝ ██║██╗   ██║   ██║  ██║██║  ██║██║██║  ██║
    ╚═════╝    ╚═╝       ╚═╝     ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
    
    `));
}

await welcome();

async function askQuestion() {
    const answers = await inquirer
    .prompt([
        {
            type: "list",
            name: "operator",
            Message: "\nWhich operation do you want to perform?\n",
            choices: ["Addition", "Subtraction", "Multiplication", "Division", "Remainder (Modulo)", "Exponent"]
        },

        {
            type:"number",
            name: "num1",
            message: "Enter first Number: ",
            default:0,
        },

        {
            type:"number",
            name: "num2",
            message: "Enter second Number: ",
            default:0,
        }
    ]);
    
    let result:number = 0;
    const spinner = createSpinner ('Calculating ...').start();
    await sleep(2000);
    
    switch (answers.operator) {
        case "Addition":
            result = answers.num1 + answers.num2;
            spinner.success();
            console.log(chalk.greenBright(`${answers.num1} + ${answers.num2} = ${result}\n`));
        break;

        case "Subtraction":
            result = answers.num1 - answers.num2;
            spinner.success();
            console.log(chalk.greenBright(`${answers.num1} - ${answers.num2} = ${result}\n`));
        break;

        case "Multiplication":
            result = answers.num1 * answers.num2;
            spinner.success();
            console.log(chalk.greenBright(`${answers.num1} * ${answers.num2} = ${result}\n`));
        break;

        case "Division":
            result = answers.num1 / answers.num2;
            spinner.success();
            console.log(chalk.greenBright(`${answers.num1} / ${answers.num2} = ${result}\n`));
        break;

        case "Remainder (Modulo)":
            result = answers.num1 % answers.num2;
            spinner.success();
            console.log(chalk.greenBright(`${answers.num1} % ${answers.num2} = ${result}\n`));
        break;

        case "Exponent":
            result = answers.num1 ** answers.num2;
            spinner.success();
            console.log(chalk.blueBright(`${answers.num1} ^ ${answers.num2} = ${result}\n`));
        break;
        
        default:
            return;
    }
}

async function loopCalculator() {
    do {
        await askQuestion();
        var again = await inquirer
        // inquirer
        .prompt ({
            type: "input",
            name: "restart",
            message: "Do you want to perform any further calculations (Y/N)?",
            default: 'y'
        })
    } while (again.restart == 'y' || again.restart == 'Y' || again.restart == 'Yes' || again.restart == 'YES' || again.restart == 'yes');


    let rainbowBye = chalkAnimation.rainbow(`\nThanks for using my Calculator. Goodbye.\n`);
    await sleep(1500);
    rainbowBye.stop();
}

loopCalculator()


