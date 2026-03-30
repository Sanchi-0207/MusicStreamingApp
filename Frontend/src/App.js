import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Auth from "./Auth/auth.jsx";
import EnterOtp from "./Auth/enterOtp.jsx";
import Home from "./Pages/Home";
import ResetPassword from "./Auth/resetPassword.jsx";
import ForgotPassword from "./Auth/forgotPassword.jsx";
import Navbar from "./Components/Navbar.jsx";
import Upload from "./Pages/Upload.jsx";
import { AppConstants } from "./constants/appConstants.js";

function App() {

 const [{isArtist,token}, setIsArtist] = useState(() => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return {isArtist:user?.data?.role === "artist",token:user?.token};
});
  return (
    <>

      <Routes>
        <Route path="/" element={<Auth />} />
       
        <Route
          path={AppConstants.HOME_PAGE}
          element={
            <>
             <Navbar isArtist={isArtist} setIsArtist={setIsArtist} />
          <Home isArtist={isArtist} />
          </>
        }
        />
        <Route path={AppConstants.ENTER_OTP_PAGE} element={<EnterOtp />} />
        <Route path={AppConstants.RESET_PASSWORD_PAGE} element={<ResetPassword />} />
        <Route path={AppConstants.FORGOT_PASSWORD_PAGE} element={<ForgotPassword />} />
        <Route path={AppConstants.UPLOAD_SONG_PAGE} element={<Upload />} />
      </Routes>
    </>
  );
}

export default App;
