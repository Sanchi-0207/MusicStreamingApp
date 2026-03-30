import { forgotPassword } from "../Api/auth.routes.js";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../constants/appConstants.js";
import Timer from "../Utility/timer.js";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const {count,setCount}=Timer(0);
  const[error,setError]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword({ email });
      setCount(30);
      localStorage.setItem("email", email);
      navigate(AppConstants.RESET_PASSWORD_PAGE);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Forgot Password</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <button type="submit" style={styles.submitBtn}>
            Send OTP
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

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
