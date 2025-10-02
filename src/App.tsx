import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./routes/Board";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/:status" element={<Board />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
