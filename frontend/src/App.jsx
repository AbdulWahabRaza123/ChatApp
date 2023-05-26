import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";
function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
