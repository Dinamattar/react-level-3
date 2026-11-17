import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from './pages/About';
import Signin from "./pages/signin/Signin"
import Signup from "./pages/Signup"
import { useContext } from "react";
import DataContext from "./context/DataContext";
import Profile from "./pages/Profile";
import Error404 from "./pages/error404";
import EditTask from "./pages/edit-task/EditTask";
function App() {
  const { theme } = useContext(DataContext);
  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/EditTask/:id" element={<EditTask />} />        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error404 />} />

      </Routes>
    </div>
  );
}

export default App;
