const socket = io();

socket.on ("todos_menos_el_cliente", (data) => {
    console.log ("El servidor nos dijo a todos menos a:", data)
}) ;

socket.on ("mensaje_al_cliente", (data) => {
    console.log("El servidor me dijo: ", data)
}) ;

socket.on ("mensaje_para_todos", (data) => {
    console.log("El servidor nos dijo a todos: ", data)
}) ;

