const http = require("http");

const server = http.createServer((request, response)=>{
    response.end("Mi primer Hola mundo! desde backend - CONTENTO");     
});

const PORT = 8080;

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});