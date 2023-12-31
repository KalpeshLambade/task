import React, { useState } from "react";
import { encryptData } from "../utils/encrypt";


const Register = () => {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updatingData = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dataFromLs = JSON.parse(localStorage.getItem("userData")) || [];

    for(let i=0 ; i< dataFromLs.length; i++){
        if(dataFromLs[i].email === userData.email){
            return alert("User is already present");
        }
    }

    let userInfo = {
      name: userData.name,
      email: userData.email,
      password: encryptData(userData.password),
    };

    dataFromLs.push(userInfo);

    localStorage.setItem("userData", JSON.stringify(dataFromLs));

    alert("Register Sucessful");
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Name</label>
        <br />
        <input
          onChange={updatingData}
          name="name"
          value={userData.name}
          type="text"
          placeholder="Type your Name"
        />
        <br />
        <label>Email</label>
        <br />
        <input
          onChange={updatingData}
          name="email"
          value={userData.email}
          type="email"
          placeholder="Type your Email"
        />
        <br />
        <label>Password</label>
        <br />
        <input
          onChange={updatingData}
          name="password"
          value={userData.password}
          type="password"
          placeholder="Type your Passwrd"
        />
        <br />
        <button>Have a referral code?</button>
        <br />
        <input type="submit" value="Register" />
      </form>
    </>
  );
};

export default Register;