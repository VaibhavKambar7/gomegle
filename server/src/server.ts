import { Socket } from "socket.io";
import http from "http";
import { UserManager } from "./managers/userManager";

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(http);

const io = new Server(server,{
  cors:{
    origin:'*'
  }
});

const userManager = new UserManager()

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  userManager.addUser('vaibhav',socket)
  socket.on('disconnect',()=>{
    userManager.removeUser(socket.id)
  })
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
