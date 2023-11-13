import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navigation/Navbar";
import Trail from "./pages/Trail";
import SubTrail from "./pages/Subtrail";
import Stages from "./pages/Stages";
import SearchResultsPage from "./pages/search/SearchResultsPage";
import AllTrails from "./pages/AllTrails";
import Footer from "./components/navigation/Footer";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trails/:trailId" element={<Trail />} />
        <Route
          path="/trails/:trailId/stages/:stageId"
          element={<Stages />}
        />
        <Route
          path="/trails/:trailId/subtrails/:subtrailId"
          element={<SubTrail />}
        />
        <Route exact path="/trails" element={<AllTrails />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
