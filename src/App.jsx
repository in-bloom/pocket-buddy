import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home/Home";
import CookieConsent from "./pages/CookieConsent/CookieConsent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Auth />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
      <CookieConsent />
    </Router>
  );
};

export default App;
