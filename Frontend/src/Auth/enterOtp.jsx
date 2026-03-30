import { verifyOtp } from "../Api/auth.routes";    
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../constants/appConstants";

function EnterOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    try {
      const res=await verifyOtp({ email:email, 
        OTP:otp });
       console.log(res);
        localStorage.setItem("userInfo", res.data);
      alert("OTP Verified");
      navigate(AppConstants.HOME_PAGE);
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Enter OTP</h2>

          <input
            inputMode="numeric"
            maxLength={4}
            name="otp"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.submitBtn}>
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterOtp;

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
