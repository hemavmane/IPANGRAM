import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { isEditable } from "@testing-library/user-event/dist/utils";

import { Button, Form } from "react-bootstrap";
function DataTbale() {
  const [AllUsers, setAllUsers] = useState([]);
  const [UpdateUser, setUpdateUser] = useState(null);
  const [EditemailAddress, setEditemailAddress] = useState("");
  const [EditphoneNumber, setEditPhoneNumber] = useState("");
  const [Editpassword, setEditpassword] = useState("");
  const [EdituserName, setEdituserName] = useState("");
  const [EditAddress, setEditAddress] = useState("");
  const [IsEditableUser, setIsEditableUser] = useState(false);

  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/alluser");
      if (response.status === 200) {
        setAllUsers(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteuser = async userid => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/deleteuser/${userid}`
      );
      if (response.status === 200) {
        alert("Deleted Succesfully");
        window.location.assign("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateuser = async () => {
    try {
      const userToUpdate = AllUsers?.find(ele => ele?._id === UpdateUser);
      if (!userToUpdate || !userToUpdate._id) {
        return;
      }
      const config = {
        url: `http://localhost:8000/api/updateuser/${userToUpdate._id}`,
        method: "put",
        headers: { "Content-type": "application/json" },
        data: {
          email: EditemailAddress || userToUpdate?.email,
          PhoneNumber: EditphoneNumber || userToUpdate?.PhoneNumber,
          password: Editpassword || userToUpdate?.password,
          username: EdituserName || userToUpdate?.username,
          address: EditAddress || userToUpdate?.address,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        alert("updated Succesfully");
        window.location.assign("/");
      }
    } catch (err) {
      console.log(err);
      alert("err while updating");
    }
  };

  const handleupdate = idd => {
    setUpdateUser(idd);
    setIsEditableUser(true);
  };
  // console.log(UpdateUser, "updateuser");

  return (
    <div className="row  m-auto conta">
      
      {IsEditableUser ? (
        <div className="row mt-3">
          <div className="row">
            <div className="col-md-6 m-auto">
              {AllUsers.filter(user => user._id === UpdateUser).map(ele => {
                return (
                  <div className="row m-auto">
                    <Form.Group className="col-md-6 mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        defaultValue={
                          ele.username ? ele.username : EdituserName
                        }
                        onChange={e => setEdituserName(e.target.value)}
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Form.Group>
                    <Form.Group className="col-md-6 mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        defaultValue={
                          ele.PhoneNumber ? ele.PhoneNumber : EditphoneNumber
                        }
                        onChange={e => setEditPhoneNumber(e.target.value)}
                        type="text"
                        placeholder="Enter Number"
                      />{" "}
                    </Form.Group>
                    <Form.Group className="col-md-6 mb-3">
                      <Form.Label>Email </Form.Label>
                      <Form.Control
                        defaultValue={ele.email ? ele.email : EditemailAddress}
                        onChange={e => setEditemailAddress(e.target.value)}
                        type="text"
                        placeholder="Enter email address"
                      />{" "}
                    </Form.Group>
                    <Form.Group className="col-md-6 mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        defaultValue={
                          ele.password ? ele.password : Editpassword
                        }
                        onChange={e => setEditpassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                    <Form.Group className="col-md-12 mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        defaultValue={ele.address ? ele.address : EditAddress}
                        onChange={e => setEditAddress(e.target.value)}
                        type="text"
                        placeholder="Address"
                      />
                    </Form.Group>
                  </div>
                );
              })}{" "}
            </div>
          </div>
          <div className="row text-center ">
            <div className="col-md- m-auto">
              <Button className="col-md-2 me-3" onClick={handleUpdateuser}>
                Update
              </Button>{" "}
              <Button
                className="col-md-2"
                onClick={() => setIsEditableUser(false)}>
                Cancel
              </Button>
            </div>
          </div>{" "}
        </div>
      ) : (
        <table className="col-md-8 m-auto">
          <thead>
            <tr className="text-center">
              <th className="p-2">Employee ID</th>
              <th className="p-2">Employee Name</th>
              <th className="p-2">PhoneNumber</th>
              <th className="p-2">Email</th>
              <th className="p-2">Password</th>
              <th className="p-2">Address</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {AllUsers?.map(ele => {
              return (
                <tr key={ele.userID} className="text-center">
                  <td className="p-2">{ele.userID}</td>
                  <td className="p-2">{ele.username}</td>
                  <td className="p-2">{ele.PhoneNumber}</td>
                  <td className="p-2">{ele.email}</td>
                  <td className="p-2">{ele.password}</td>
                  <td className="p-2">{ele.address}</td>
                  {/* DeletUSer */}
                  <td className="p-2">
                    <span
                      className="me-2"
                      onClick={() => handleupdate(ele._id)}>
                      Edit
                    </span>
                    <span onClick={() => handleDeleteuser(ele._id)}>
                      Delete
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default DataTbale;
