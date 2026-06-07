import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Skills from "./pages/Skills"
import DaShBoard from "./pages/DashBoard"
import Projects from "./pages/Projects";
import SingUp from "./pages/SingUp";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
        <Route path="/about" element={ <About /> }></Route>
        <Route path="/contact" element={ <Contact /> }></Route>
        <Route path="/projects" element={ <Projects /> }></Route>
        <Route path="/skills" element={ <Skills /> }></Route>
        <Route path="/daShBoard" element={ <DaShBoard /> }></Route>
        <Route path="/singup" element={ <SingUp /> }></Route>
        <Route path="/login" element={ <Login /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;