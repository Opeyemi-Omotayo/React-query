import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Colors from "./pages/Colors";
import EachColor from "./pages/EachColor";
import AddColor from "./pages/AddColor";
import ColorsPaginated from "./pages/ColorsPaginated";


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
              <li>
                <Link  to="/colors/:id">Each Color</Link>
              </li>
              <li>
                <Link to="/addcolor">Add Color</Link>
              </li>
              <li>
                <Link to="/colors-paginated">Paginated Colours</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/colors/:id" element={<EachColor/>} />
            <Route path="/addcolor" element={<AddColor />} />
            <Route path="/colors-paginated" element={<ColorsPaginated />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
