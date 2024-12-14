import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from "./pages/Navbar"
import Home from "./pages/Home"
import Students from "./pages/Students"
import Login from "./pages/Login"
import Student from "./pages/Student"
import Signup from "./pages/Signup"
import Admin from "./pages/Admin"
import Company from "./pages/Company"

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/students" element = {<Students/>}></Route>
        <Route path = "/login" element = {<Login/>}></Route>
        <Route path = "/student/:id" element = {<Student/>}></Route>
        <Route path = "/admin/:id" element = {<Admin/>}></Route>
        <Route path = "/company/:id" element = {<Company/>}></Route>
        <Route path = "/signup" element = {<Signup/>}></Route>
      </Routes>
    </Router>

  );
}

export default App;
