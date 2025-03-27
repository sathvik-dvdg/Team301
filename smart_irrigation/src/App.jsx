import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FirstPage from "./pages/Firstpage";
import SecondPage from "./pages/Secondpage";

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </Router>
  )
}