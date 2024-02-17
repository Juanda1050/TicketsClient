import React from "react";
import Login from "./components/Login";
import Tickets from "./components/Tickets";
import { Outlet } from "react-router-dom";
import Register from "./components/Register";

const LoginPage: React.FC = () => {
  return (
    <main className="App">
      <Tickets />
    </main>
  );
};

export default LoginPage;
