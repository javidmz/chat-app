import "../style/Registration.scss";
import Login from "../components/LogIn";
import Signup from "../components/Signup";
import { useState } from "react";

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="registration-container">
      <div className={`form-container sign-in ${!isLogin ? "active" : ""}`}>
        <Login />
      </div>
      <div className={`form-container sign-up ${!isLogin ? "active" : ""}`}>
        <Signup isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
      <div className={`overlay-container ${!isLogin ? "active" : ""}`}>
        <div className="overlay">
          {isLogin ? (
            <div className="overlay-panel overlay-right">
              <div>Hello, Friend!</div>
              <div>Enter your personal data and get started</div>
              <button onClick={() => setIsLogin(!isLogin)}>Sing up</button>
            </div>
          ) : (
            <div className="overlay-panel overlay-left"> 
              <div>Welcome Back!</div>
              <div>To keep connected with us please login</div>
              <button onClick={() => setIsLogin(!isLogin)}>Sing in</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
