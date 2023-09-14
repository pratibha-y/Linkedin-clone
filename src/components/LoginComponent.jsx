import React, { useState } from "react";
import { LoginAPI,GoogleSignInAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
// import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginComponent.css";
import { toast } from "react-toastify";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } 
    catch (err) {
      console.log(err);
      toast.error(err.code.toString().slice(5,err.code.length ));
    }
  };

  // const googleSignIn = () => {
  //   let response = GoogleSignInAPI();
  //   console.log(response);
    
  //     localStorage.setItem("userEmail", response.user.email);
    
  //   postUserData({
  //     userID: getUniqueID(),
  //     name: credentails.email,
  //     password: credentails.password,
  //     email: credentails.email,
  //     imageLink:
  //       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  //   });
  //   toast.success("Signed In to Linkedin!");
  //   navigate("/home");
  // }

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        {/* <GoogleButton onClick={googleSignIn}
        /> */}
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}