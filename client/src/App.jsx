import { useContext } from "react";
import Footers from "./components/Footers";
import Login from "./components/Login";

import Navbar from "./components/Navbar";
import BuyCredit from "./pages/BuyCredit";
import Home from "./pages/Home";
import Result from "./pages/Result";
import { Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { AppContext } from "./context/AppContext";
import UserProfile from "./components/UserProfile";

const App = () => {
  const {showLogin,userProfile}=useContext(AppContext)
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen  bg-gradient-to-b from-teal-50 to-orange-50">

      <ToastContainer position="bottom-right"/>  {/* for showing toast notification */}
      <Navbar />
     {showLogin && <Login />}
     {userProfile && <UserProfile/>}
      <Routes>
        {/* <Route path="/" element={<Link to="/home">Home</Link>} />{" "} */}
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>
      <Footers/>
    </div>
  );
};

export default App;
