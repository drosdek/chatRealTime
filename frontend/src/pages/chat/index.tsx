import { useState } from "react";
import { Socket } from "socket.io-client";
import ChatMessage from "./containers/chatMessage";
import { IUser } from "../../interfaces/user.interface";

interface ChatPageProps {
  user: IUser;
  socket: Socket;
}

function Chat({ user, socket }: ChatPageProps) {
  return <ChatMessage user={user} socket={socket} />;
}

export default Chat;
