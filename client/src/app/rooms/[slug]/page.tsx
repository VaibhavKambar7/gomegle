"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:5000";

export default function Room() {
  const searchParams = useSearchParams();
  const [socket, setSocket] = useState<null | Socket>(null);
  const [lobby, setLobby] = useState(false);
  const name = searchParams.get("name");

  useEffect(() => {
    const socket = io(URL);
    alert("send offer please");//code  ,runs on one side / this side
    setLobby(false);
    socket.on("send-offer", (roomId) => {
      socket.emit("offer", {
        sdp: "",
        roomId,
      });
    });

    socket.on("offer", (roomId, offer) => {//code runs on other side (remember im also other side for that guy ,when this all code runs on his machine or for him)
      alert("send answer please");
      setLobby(false);
      socket.emit("answer", {
        sdp: "",
        roomId,
      });
    });

    socket.on("answer", (roomId, answer) => {
      alert("connection done");
      setLobby(false);
    });

    socket.on("lobby", () => {
      setLobby(true);
    });

    setSocket(socket);
  }, [name]);

  console.log(name);
  if (lobby) {
    return <div>Waiting to connect you to someone</div>;
  }
  return (
    <div className="mt-0 h-0">
      {/* {lobby ? "Waiting to connect you to someone" : null} */}
      Hi {name}
      <video width={500} height={500} />
      <video width={500} height={500} />
      <video />
    </div>
  );
}
