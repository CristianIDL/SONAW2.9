import BOB from "./pages/BOB/BOB";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Saved from "./pages/Saved/Saved";
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register"
import BOBAdmin from "./pages/BOBAdmin/BOBAdmin";
import Followed from "./pages/Followed/Followed";
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin";
import ChatAdmin from "./pages/ChatAdmin/ChatAdmin";
import ProfileAdmin from "./pages/ProfileAdmin/ProfileAdmin";
import Notifications from "./pages/Notifications/Notifications";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import RestorePassword from "./pages/RestorePassword/RestorePassword";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/bob/" element={<BOB />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/saved/" element={<Saved />} />
        <Route path="/register" element={<Register />} />
        <Route path="/followed/" element={<Followed />} />
        <Route path="/bobadmin/" element={<BOBAdmin />} />
        <Route path="/chatadmin" element={<ChatAdmin />} />
        <Route path="/homeadmin/" element={<HomeAdmin />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/notifications/" element={<Notifications />} />
        <Route path="/forgotpassword/" element={<ForgotPassword />} />
        <Route path="/restorepassword/" element={<RestorePassword />} />
        <Route path="/profileadmin/:username" element={<ProfileAdmin />} />
      </Routes>
    </Router>
  );
}
export default App;
