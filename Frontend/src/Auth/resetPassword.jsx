import { resetPassword } from "../Api/auth.routes.js";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../constants/appConstants.js";
import Timer from "../Utility/timer.js";
import { forgotPassword } from "../Api/auth.routes.js";

function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const {count,setCount}=Timer(30);   
  const [confirmPassword,setConfirmPassword] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({ email:localStorage.getItem("email"), 
        newPass:newPassword, 
        otp:otp });
      alert("Password reset successfully");
      navigate(AppConstants.AUTH_PAGE);
    } catch (err) {
      alert("Error resetting password");
    }
  };
  const handleResendOtp = async () => {
  try {
    await forgotPassword({
      email: localStorage.getItem("email")
    });
    setCount(30);

  } catch (err) {
    alert(err.response?.data?.error || "Something went wrong");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Reset Password</h2>

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="number"
            name="otp"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" disabled={newPassword !== confirmPassword} style={styles.submitBtn}>
            Verify OTP
          </button>
          {count > 0 ? (<p style={{ color: "gray", fontSize: "14px", marginTop: "10px" }}>Resend OTP in {count}s</p>):(
             <p
             style={{color: "blue",fontSize: "14px",marginTop: "10px",cursor: "pointer",}}onClick={handleResendOtp} >
    Resend OTP
  </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    border: "1px solid #ccc",
    padding: "20px",
    width: "300px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  input: {
    padding: "8px"
  },

  submitBtn: {
    padding: "8px",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer"
  }
};
