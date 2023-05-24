const http = require("http");

const server = http.createServer((req, res) => {
        res.end("mi primer hola mundo mundial")
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${8080}`)
});