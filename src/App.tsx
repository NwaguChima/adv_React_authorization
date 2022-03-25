import React from "react";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Others/Layout";
import LinkPage from "./components/Others/LinkPage";
import Unauthorized from "./components/Others/Unauthorized";
import Editor from "./components/Others/Editor";
import Admin from "./components/Others/Admin";
import Lounge from "./components/Others/Lounge";
import Home from "./components/Others/Home";
import Missing from "./components/Others/Missing";
import RequireAuth from "./components/Others/RequireAuth";

const ROLES = {
  admin: "admin",
  user: "user",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* We want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
