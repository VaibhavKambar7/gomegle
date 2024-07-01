import { Socket } from "socket.io";
import { RoomManager } from "./roomManager";

export interface User {
  socket: Socket;
  name: string;
}

export class UserManager {
  private users: User[];
  private queue: string[];
  private roomManager: RoomManager;

  constructor() {
    this.users = [];
    this.queue = [];
    this.roomManager = new RoomManager();
  }

  addUser(name: string, socket: Socket) {
    this.users.push({ name, socket });
    this.queue.push(socket.id);
    socket.emit("lobby");
    this.clearQueue(); //take 2 users from queue and put them in a room
    this.initHandlers(socket);
  }

  removeUser(socketId: string) {
    const user = this.users.find((x) => x.socket.id === socketId);
    this.users = this.users.filter((user) => user.socket.id !== socketId); // give users array without that user , with a socketId
    this.queue = this.queue.filter((id) => id === socketId); //
  }

  clearQueue() {
    console.log("inside queue , queue length :-");
    console.log(this.queue.length);
    if (this.queue.length < 2) {
      return;
    }

    const user1 = this.users.find(
      (user) => user.socket.id === this.queue.pop()
    );
    const user2 = this.users.find(
      (user) => user.socket.id === this.queue.pop()
    );
    console.log(user1);
    console.log(user2);

    if (!user1 || !user2) return;

    console.log("creating roonm");

    this.roomManager.createRoom(user1, user2);
    this.clearQueue();
  }

  initHandlers(socket: Socket) {
    socket.on("offer", ({ sdp, roomId }: { sdp: string; roomId: string }) => {
      this.roomManager.onOffer(roomId, sdp);
    });
    socket.on("answer", ({ sdp, roomId }: { sdp: string; roomId: string }) => {
      this.roomManager.onAnswer(roomId, sdp);
    });
  }
}
