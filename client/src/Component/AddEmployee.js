import React, { useState } from "react";
import NavComponent from "./Navbars";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "../App.css";

const AddEmployee = () => {
  const [emailAddress, setemailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  const [Address, setAddress] = useState("");

  
  const [userNameError, setUserNameError] = useState("");
  const [emailAddressError, setEmailAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [AddresError, setAddresError] = useState("");
  const isValidField = (field, value) => {
    switch (field) {
      case "username":
        return value.length > 0;
      case "address":
        return value.length > 0;
      case "email":
        return /\S+@\S+\.\S+/.test(value);
      case "phoneNumber":
        return /^\d{10}$/.test(value);
      case "password":
        return value.length >= 8;
      default:
        return false;
    }
  };

  const handleAddUser = async () => {
    setUserNameError("");
    setEmailAddressError("");
    setPhoneNumberError("");
    setPasswordError("");

    if (!isValidField("username", userName)) {
      setUserNameError("* Please enter a  username.");
      return;
    }

    if (!isValidField("email", emailAddress)) {
      setEmailAddressError("* Please enter a valid email address.");
      return;
    }

    if (!isValidField("phoneNumber", phoneNumber)) {
      setPhoneNumberError("* Please enter a valid phone number.");
      return;
    }

    if (!isValidField("password", password)) {
      setPasswordError("* Please enter a valid password.");
      return;
    }
    if (!isValidField("address", Address)) {
      setAddresError("* Please enter a valid address.");
      return;
    }
    try {
      const config = {
        url: "http://localhost:8000/api/adduser",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          email: emailAddress,
          PhoneNumber: phoneNumber,
          password: password,
          username: userName,
          address: Address,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        alert("added succesfully");
      }
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <NavComponent />

      <div className="row m-auto" style={{ height: "100px" }}>
        <div className="col-md-6 m-auto ">
          <h1 className="col-md-6 mt-3 m-auto ">Add Employee</h1>

          <div className="row mt-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={e => setuserName(e.target.value)}
                type="text"
                placeholder="Enter Name"
              />
              <Form.Label>{userNameError}</Form.Label>
            </Form.Group>
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={e => setPhoneNumber(e.target.value)}
                type="text"
                placeholder="Enter Number"
              />{" "}
              <Form.Label className="lbl">{phoneNumberError}</Form.Label>
            </Form.Group>
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Email </Form.Label>
              <Form.Control
                onChange={e => setemailAddress(e.target.value)}
                type="text"
                placeholder="Enter email address"
              />{" "}
              <Form.Label className="lbl">{emailAddressError}</Form.Label>
            </Form.Group>
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={e => setpassword(e.target.value)}
                type="password"
                placeholder="Password"
              />{" "}
              <Form.Label className="lbl">{passwordError}</Form.Label>
            </Form.Group>
            <Form.Group className="col-md-12 mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={e => setAddress(e.target.value)}
                type="text"
                placeholder="Address"
              />{" "}
              <Form.Label className="lbl">{AddresError}</Form.Label>
            </Form.Group>
          </div>
          <div className="row m-auto mt-3">
            <Button
              className="col-md-6 m-auto text-bold "
              onClick={handleAddUser}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
