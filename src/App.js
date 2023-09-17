import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Colors from "./pages/Colors";


function App() {
  return (   
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/colors">Colors</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colors" element={<Colors />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
