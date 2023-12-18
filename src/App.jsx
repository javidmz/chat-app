import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FeedbackDetailed from "./pages/ChatDetailed";
import Registration from "./pages/Registration";
import { UserProvider } from "./contexts/UserContext";
import "./style/Main.scss";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="app-container">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id/:id" element={<FeedbackDetailed />} />
          <Route path="/login" element={<Registration />} />
        </Routes>
      </UserProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
