import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Board from "./components/Board";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/board" />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:status" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}
