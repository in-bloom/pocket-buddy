import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home/Home";
import { useEffect } from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Auth />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
