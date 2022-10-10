const fs = require('fs');
const http = require('http');

const fileContent = `<h1> Hello World </h1>
<p> This is Divyanshi... </p>`

fs.writeFile("test.html", fileContent, (err) => {
    if(err)
    {
        console.log(err);
    }
});

fs.readFile("test.html", "utf-8", (err,data) => {

    const server = http.createServer((req, res) => {
        res.write(data);
        res.end();
    })

    server.listen(5000, () => console.log("Server connected on 5000"))
})