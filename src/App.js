import { Routes, Route } from "react-router-dom";
import { DepartmentList, Department } from "./pages";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Welcome to our page</div>} />
      <Route path="/department" element={<DepartmentList />} />
      <Route path="/department/:id" element={<Department />} />
    </Routes>
  );
};
