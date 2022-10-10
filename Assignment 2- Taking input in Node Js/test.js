// const arg = process.argv[2];

// console.log(`HEllo ${arg}`);

// const env = process.env.USERNAME;
// console.log(`Hello ${env}`);

const readline = require('readline');

const r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

r1.question("ENter your name : ", (ans) => {
    console.log(ans);
    r1.close();
})