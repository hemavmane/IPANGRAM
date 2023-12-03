// import logo from "./logo.svg";
import "./App.css";
import AddEmployee from "./Component/AddEmployee";
import { Route, Routes } from "react-router-dom";
import DataTbale from "./Component/dataTbale";
import Login from "./Component/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddEmployee />} />
        <Route path="/dataTbale" element={<DataTbale />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
