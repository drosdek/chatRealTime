import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Routers from "./routers";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
