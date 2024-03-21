import "./App.css";
import Chat from "./pages/chat/Chat";
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
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
