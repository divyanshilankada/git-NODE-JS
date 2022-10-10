const fs = require('fs');

fs.readFile("data.txt", "utf-8", (err, data) => {
    console.log(data);
});

// fs.writeFile("data.txt", "Hey data file", (err) => {
//     if(err)
//     {
//         console.log(err);    
//     }
// })

fs.appendFile("data.txt", "How are you ?", (err) => {
    if(err)
    {
        console.log(err);
    }
});

fs.readFile("data.txt", "utf-8", (err, data) => {
    console.log(data);
});

fs.unlink("data.txt", (err) => {
    if(err)
    {
        console.log(err);
    }
})