import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise ((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a Node.js millionaire?'
    )

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right
    Or I will haunt you for eternity...

    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Which of the following best describes Node.js?\n',
        choices: [
            'A frontend JavaScript library',
            'A server-side runtime environment',
            'A database management system',
            'A programming language',
        ]
    });
    return handleAnswer(answers.question_1 === 'A server-side runtime environment');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'What is the main purpose of the Node Package Manager (NPM)?\n',
        choices: [
            'To manage server configurations',
            'To create user interfaces',
            'To handle asynchronous operations',
            'To install and manage JavaScript packages',
        ]
    });
    return handleAnswer(answers.question_2 === 'To install and manage JavaScript packages');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'What does the event-driven, non-blocking I/O model in Node.js mean?\n',
        choices: [
            'It executes tasks synchronously, one after the other',
            'It allows multiple tasks to be executed concurrently',
            'It only supports blocking I/O operations',
            'It enables frontend and backend code to be executed together',
        ]
    });
    return handleAnswer(answers.question_3 === 'It allows multiple tasks to be executed concurrently');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'How can you create an HTTP server in Node.js using the Express framework?\n',
        choices: [
            'By using the `createServer() method from the HTTP module',
            'By using the `startServer() method from the Express module',
            'By using the `express.createServer() method',
            'By using the `express() function from the Express module',
        ]
    });
    return handleAnswer(answers.question_4 === 'By using the `express() function from the Express module');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'Which of the following is an advantage of using Node.js?\n',
        choices: [
            'It requires minimal server resources',
            'It only supports single threaded applications',
            'It is strictly limited to backend development',
            'It can handle a larger number of concurrent connections',
        ]
    });
    return handleAnswer(answers.question_5 === 'It can handle a larger number of concurrent connections');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That is the correct answer!`})
    } else {
        spinner.error({ text: `... Game Over ${playerName}, process has been killed. You failed!`})
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congrats, ${playerName} !\nYou've Won\n $ 1 , 0 0 0 , 0 0 0 !`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();