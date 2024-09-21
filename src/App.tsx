import "./App.css";
import { Chatbot } from "./pages/chat/chat";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/profile/profile";
import { Classify } from "./pages/profile/classify";
import { ProfileView } from "./pages/profileView/profileView";
import { DailyQues } from "./pages/home/dailyques";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <ChakraProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<Chatbot />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/classify" element={<Classify />} />
              <Route path="/profileview" element={<ProfileView />} />
              <Route path="/dailyques" element={<DailyQues />} />
            </Routes>
          </ChakraProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
