import express from "express";
import productRouter from "../src/routes/products-route.js"
import cartsRouter from "../src/routes/carts-route.js"
import viewsRouter from "./routes/views-router.js"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());

app.use("/api/products", productRouter);
app.use("/api/cart", cartsRouter);
app.use("/", viewsRouter)


app.set("views", `${__dirname}/views`);
app.set ("view engine", "handlebars");
app.use(express.static(__dirname+"/public"));


const servidorHttp = app.listen(PORT, () => {
    console.log(`servidor en el puerto ${PORT}`)
});

const io = new Server(servidorHttp)

io.on("connection", (socket) => {
    socket.broadcast.emit ("todos_menos_el_cliente", `${socket.id} está conectado.`);
    socket.emit("mensaje_al_cliente", `Hola, ${socket.id}!`);  
    io.emit("mensaje_para_todos","Este mensaje lo tienen que recibir todos los clientes.");
});