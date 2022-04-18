import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Detail from "./components/detail";

function App() {
  return (
    <Router
      className="App"
    >
      <Routes>
        <Route path="/" exact element={ <LandingPage /> } />
        <Route path="/:name" exact element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
