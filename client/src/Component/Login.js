import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Login() {
  const [emailAddress, setemailAddress] = useState("");
  const [password, setpassword] = useState("");
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [existingUser, setExistingUser] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/updatelogin",
        {
          email: emailAddress,
          password: password,
        }
      );

      if (response.status === 200) {
        console.log(response.data, "response");
        alert("Login successful");
        setIsloggedIn(true);
        setExistingUser(response.data.data.user); // Store the logged-in user data
        await getUserData(); // Fetch user data after successful login
      }
    } catch (err) {
      alert("Login failed:", err.response ? err.response.data : err.message);
    }
  };
  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/alluser");
      if (response.status === 200) {
        const loggedInUser = response.data.data.find(
          user => user.userId === existingUser.userId
        );
        setUserData(loggedInUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch user data on component mount if user is already logged in
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);
  return (
    <div className="row m-auto" style={{ height: "100px" }}>
      {isLoggedIn ? (
        <div>{JSON.stringify(userData, null, 2)}</div>
      ) : (
        <div className="col-md-6 m-auto ">
          <h1 className="col-md-6 mt-3 m-auto ">Login </h1>

          <div className="row mt-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Email </Form.Label>
              <Form.Control
                onChange={e => setemailAddress(e.target.value)}
                type="text"
                placeholder="Enter email address"
              />{" "}
            </Form.Group>
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={e => setpassword(e.target.value)}
                type="password"
                placeholder="Password"
              />{" "}
            </Form.Group>
          </div>
          <div className="row m-auto mt-3">
            <Button
              className="col-md-6 m-auto text-bold "
              onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
