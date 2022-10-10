const { stdin, stdout } = require("process");
const readline = require("readline");

const read = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

read.question("Please enter your name : ", (name) => {
    console.log(`Hello ${name}`);
    read.close();
})