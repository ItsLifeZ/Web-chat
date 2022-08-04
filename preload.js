import apiApp from "./app/api.js";
import socketApp from "./app/socket.js";

export function startApp(api, io) {
    apiApp(api);
    socketApp(io); 

    console.log("Server started!");
}