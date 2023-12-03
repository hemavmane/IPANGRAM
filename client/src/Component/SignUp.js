import React, { useState } from "react";

import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "../App.css";
// import * as React from 'react';
import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import axios from "axios";

const SignUp = () => {
  const [emailAddress, setemailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleRegister = async () => {
    setUserNameError("");
    setEmailAddressError("");
    setPhoneNumberError("");
    setPasswordError("");

    // Basic validation
    if (!userName) {
      setUserNameError("User name is required");
      return;
    }

    if (!emailAddress) {
      setEmailAddressError("Email address is required");
      return;
    }

    if (!phoneNumber) {
      setPhoneNumberError("Phone number is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const config = {
        url: "http://localhost:8000/api/signup",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          email: emailAddress,
          PhoneNumber: phoneNumber,
          password: password,
          username: userName,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        window.location.assign("/Quetions");
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      }
    } catch (err) {
      alert(err.response.data.error);
      const { field, message } = err.response.data;
      switch (field) {
        case "userName":
          setUserNameError(message);
          break;
        case "emailAddress":
          setEmailAddressError(message);
          break;
        case "phoneNumber":
          setPhoneNumberError(message);
          break;
        case "password":
          setPasswordError(message);
          break;
        default:
          // Handle other error cases
          console.error(err);
      }
    }
  };

  return (
    <div className="row  m-auto">
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-md-4"> </div>
          <div className="col-md-4 m-auto shadow p-3  bg-light rounded">
            <div className="row ">
              <div className="col-md-12 m-auto">
                <FormControl>
                  <Input
                    value={userName}
                    onChange={e => setuserName(e.target.value)}
                    className="p-3 mb-3"
                    placeholder="User name"
                  />
                  <FormHelperText className="text-red">
                    {userNameError}
                  </FormHelperText>

                  <Input
                    value={emailAddress}
                    onChange={e => setemailAddress(e.target.value)}
                    className="p-3 mb-3"
                    placeholder="Email address"
                  />
                  <p className="txr">{emailAddressError}</p>
                </FormControl>

                <FormControl>
                  <Input
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="p-3 mb-3"
                    placeholder="Phone number"
                  />
                  <p className="txr">{phoneNumberError}</p>
                </FormControl>
                <FormControl>
                  <Input
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                    className="p-3 mb-3"
                    placeholder="Password"
                  />
                  <p className="txr">{passwordError}</p>
                </FormControl>

                <Row className="row p-2 mb-3 ">
                  <Button
                    className=" fs-5 p-2 brd bgclr brd2"
                    onClick={handleRegister}>
                    <Link
                      //   to="/Register"
                      className="links"
                      style={{ textDecoration: "none", color: "white" }}>
                      {" "}
                      Get Started{" "}
                    </Link>
                  </Button>
                </Row>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
