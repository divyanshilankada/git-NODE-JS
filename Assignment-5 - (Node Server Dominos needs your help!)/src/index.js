var http = require("http");
const httpServer = http.createServer(handleServer);


function handleServer(req, res) {
  
    if(req.url === '/welcome')
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("Welcome to Dominos!");
    }
    else if(req.url === '/contact')
    {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify({  
            phone: '18602100000', 
            email: 'guestcaredominos@jublfood.com' 
        })) 
    }
    else
    {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("Page not found");
    }
    
}

httpServer.listen(8081, () => console.log("The server is up at 8081"));
module.exports = httpServer;