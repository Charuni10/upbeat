import "./App.css";
import { Chatbot } from "./pages/chat/chat";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/profile/profile";
import { Classify } from "./pages/profile/classify";

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
            <Route path="/profile" element={<Profile />}/>
            <Route path="/classify" element={<Classify/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
