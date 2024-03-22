import "./App.css";
import { Chatbot } from "./pages/chat/chat";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
