const fs = require("fs");
const http = require('http');

const name = "pepper"
const fileName = "index.html"
const fileContent = `<h1> Hello World </h1>
<p> This is ${name}... </p>`;

fs.writeFile(fileName, fileContent, (err) => {
    if(err)
    {
        console.log(err);
    }
})

fs.readFile(fileName, "utf-8", (err, data) => {

    if(err)
    {
        console.log(err);
    }

    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });

    server.listen(5000, () => console.log("Server is up on 5000"));

});




