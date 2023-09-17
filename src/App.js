import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useQueryClient } from "@tanstack/react-query";
import "./App.css";
import Colors from "./pages/Colors";
import EachColor from "./pages/EachColor";
import { getColor } from "./api/colors";
import AddColor from "./pages/AddColor";


function App() {
  const queryClient = useQueryClient()

  function onHoverColorLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getColor(1),
    })
  }

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
                <Link onMouseEnter={onHoverColorLink} to="/colors/:id">Each Color</Link>
              </li>
              <li>
                <Link to="/addcolor">Add Color</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/colors/:id" element={<EachColor/>} />
            <Route path="/addcolor" element={<AddColor />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
