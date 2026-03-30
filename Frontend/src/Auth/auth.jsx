import { useState } from "react";
import { registerUser, loginUser } from "../Api/auth.routes.js";
import { useNavigate } from "react-router-dom";
import { AppConstants } from "../constants/appConstants.js";

function Auth() {
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  
  const [hoverForgot, setHoverForgot] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const res = await loginUser({ email, password });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate(AppConstants.HOME_PAGE);
      } catch (err) {
        setLoginError(err.response?.data?.error || "Something went wrong");
      }
    } else {
      try {
        const res=await registerUser({ name, email, password });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      } catch (err) {
        setRegisterError(err.response?.data?.error || "Something went wrong");
      }
      navigate(AppConstants.ENTER_OTP_PAGE);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.toggleBox}>
          <button
            style={isLogin ? styles.activeBtn : styles.btn}
            onClick={() => {
              setIsLogin(true);
              setIsRegister(false);
            }}
          >
            Login
          </button>

          <button
            style={!isLogin ? styles.activeBtn : styles.btn}
            onClick={() => {
              setIsLogin(false);
              setIsRegister(true);
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>{isLogin ? "Login" : "Register"}</h2>

          {!isLogin && (
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          )}

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {!isRegister && (
            <p
              onClick={() => navigate("/forgot-password")}
              onMouseEnter={() => setHoverForgot(true)}
              onMouseLeave={() => setHoverForgot(false)}
              style={{
                cursor: "pointer",
                color: hoverForgot ? "blue" : "black"
              }}
            >
              Forgot Password?
            </p>
          )}

          <button type="submit" style={styles.submitBtn}>
            {isLogin ? "Login" : "Register"}
          </button>

          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          {registerError && <p style={{ color: "red" }}>{registerError}</p>}
        </form>
      </div>
    </div>
  );
}

export default Auth;

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

  toggleBox: {
    display: "flex",
    marginBottom: "15px"
  },

  btn: {
    flex: 1,
    padding: "8px",
    cursor: "pointer"
  },

  activeBtn: {
    flex: 1,
    padding: "8px",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer"
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
