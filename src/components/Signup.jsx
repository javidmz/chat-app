import { useEffect } from "react";
import {
  FaInfoCircle,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { useState } from "react";
import "../style/Signup.scss";
import toast from "react-hot-toast";

const FULLNAME_REGEX = /^[A-Za-z]+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = ({ isLogin, setIsLogin }) => {
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
  
    const [surname, setSurname] = useState("");
    const [validSurname, setValidSurname] = useState(false);
    const [surnameFocus, setSurnameFocus] = useState(false);
  
    const [user, setUser] = useState("");
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
  
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
  
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
  
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
  
    useEffect(() => {
      setValidName(FULLNAME_REGEX.test(name));
    }, [name]);
  
    useEffect(() => {
      setValidSurname(FULLNAME_REGEX.test(surname));
    }, [surname]);
  
    useEffect(() => {
      setValidUser(USER_REGEX.test(user));
    }, [user]);
  
    useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("hello");
      const newUser = {
        name,
        surname,
        user,
        pwd,
      };
      console.log(newUser);
      await fetch("http://localhost:8082/api/v1/auth/register", {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      setName('');
      setSurname('');
      setUser('');
      setPwd('');
      setMatchPwd('');
      toast.success('Account is created');
      setTimeout(() => {
        setIsLogin(!isLogin);
      }, 1000)
    };
  

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div>Sign Up</div>
      <div>
        <input
          type="text"
          autoFocus
          id="name"
          required
          placeholder="Name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        {validName && <FaRegCheckCircle />}
        {!validName && name && <FaRegTimesCircle />}
      </div>
      {nameFocus && name && !validName && (
        <p>Name should contains only letters</p>
      )}
      <div>
        <input
          type="text"
          id="surname"
          placeholder="Your Surname"
          autoComplete="off"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          onFocus={() => setSurnameFocus(true)}
          onBlur={() => setSurnameFocus(false)}
        />
        {validSurname && <FaRegCheckCircle />}
        {!validSurname && surname && <FaRegTimesCircle />}
      </div>
      {surnameFocus && surname && !validSurname && (
        <p>Surname should contains only letters</p>
      )}
      <div>
        <input
          type="text"
          id="username"
          placeholder="Enter Username"
          autoComplete="off"
          required
          value={user}
          onChange={(e) => setUser(e.target.value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        {validUser && <FaRegCheckCircle />}
        {!validUser && user && <FaRegTimesCircle />}
      </div>
      <p
        className={
          userFocus && user && !validUser ? "instructions" : "offscreen"
        }
      >
        <FaInfoCircle /> 4 to 24 characters.
        <br />
        Must begin with a letter.
        <br />
        Letters, numbers, underscores, hyphens allowed.
      </p>
      <div>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          autoComplete="off"
          required
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        {validPwd && <FaRegCheckCircle />}
        {!validPwd && pwd && <FaRegTimesCircle />}
      </div>
      <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
        <FaInfoCircle />
        8 to 24 characters.
        <br />
        Must include uppercase and lowercase letters, a number and a special
        character.
        <br />
        Allowed special characters: <span>!</span> <span>@</span> <span>#</span>{" "}
        <span>$</span> <span>%</span>
      </p>
      <div>
        <input
          type="password"
          id="confirm_password"
          placeholder="Confirm Password"
          autoComplete="off"
          required
          value={matchPwd}
          onChange={(e) => setMatchPwd(e.target.value)}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        {validMatch && matchPwd && <FaRegCheckCircle />}
        {!validMatch && matchPwd && <FaRegTimesCircle />}
      </div>
      <p className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
        <FaInfoCircle />
        Must match the first password input field.
      </p>
      <button
        type="submit"
        disabled={
          validName && validSurname && validUser && validPwd && validMatch
            ? false
            : true
        }
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
