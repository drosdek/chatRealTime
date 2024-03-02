import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/login";
import Chat from "../pages/chat";
import { useState } from "react";
import { Socket, io } from "socket.io-client";

const socket = io("http://localhost:3005");

interface User {
  id: string;
  username: string;
}

function Routers() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (username: string) => {
    socket.emit("addUser", username);
    socket.on("userAdded", (user: User | null) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        navigate("chat");
      } else {
        setError("Tente outro nome usuário!");
      }
    });
  };
  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} error={error} />} />
      <Route
        path="/chat"
        element={
          isAuthenticated && user ? (
            <Chat user={user} socket={socket} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default Routers;
