import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import TeachersPage from "./pages/TeachersPage";
import LayoutComponent from "./components/layout";

import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <TeachersPage /> : <LoginPage setIsAuth={setIsAuth} />}
        />
        <Route path="" element={<LoginPage setIsAuth={setIsAuth} />} />
        {isAuth && (
          <Route element={<LayoutComponent />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
