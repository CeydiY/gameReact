import "./App.css";
import NavBar from "./components/header/NavBar";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Tamagotchi } from "./components/Pages/Tamagotchi";
import { LagartoSpock } from "./components/Pages/Lagarto-Spock";
import { Records } from "./components/Pages/Records";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tamagotchi" element={<Tamagotchi />} />
            <Route path="/lagarto" element={<LagartoSpock />} />
            <Route path="/records" element={<Records />} />
          </Routes>
        </div>
      </Router>
        <Footer />
  </>
  );
}

export default App;
