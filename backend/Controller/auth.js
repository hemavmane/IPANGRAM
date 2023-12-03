const UserModal = require("../Module/auth");
const generateSixDigitId = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class Usercontroller {
  async signupController(req, res) {
    const {
      username,
      email,
      PhoneNumber,
      password,
      userID,
      userType,
      address,
    } = req.body;

    const userId = generateSixDigitId();
    try {
      const newUser = new UserModal({
        username,
        email,
        password,
        PhoneNumber,
        userID: userId,
        userType,
        address,
      });

      let userData = await newUser.save();

      res
        .status(200)
        .json({ data: userData, message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async Login(req, res) {
    const { email, password } = req.body;
    try {
      const existingUser = await UserModal.findOne({});

      console.log("existingUser", existingUser);
      const IsEmail = email == existingUser.email;
      if (!IsEmail) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isPasswordValid = password === existingUser.password;

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      return res.status(200).json({
        message: "Login successful",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAlluser(req, res) {
    try {
      let user = await UserModal.find({});
      if (user) {
        return res.status(200).json({ data: user });
      }
    } catch {
      return res.status(500).json({ err: "internal error" });
    }
  }
  async UpdateUsr(req, res) {
    const useridd = req.params.useridd;
    const {
      username,
      email,
      PhoneNumber,
      password,
      userID,
      userType,
      address,
    } = req.body;
    try {
      const userData = await UserModal.findByIdAndUpdate(
        { _id: useridd },
        {
          username,
          email,
          PhoneNumber,
          password,
          userID,
          userType,
          address,
        }
      );
      if (userData) {
        return res.status(200).json({ userData });
      } else {
        return res.status(500).json({ err: "error while update" });
      }
    } catch (err) {
      console.log(err, "internal err");
      return res.status(500).json({ err: "Internal error" });
    }
  }
  async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await UserModal.findOneAndDelete({ _id: userId });
      if (user) {
        return res.status(200).json({ success: "Deleted Sucesfully" });
      } else {
        return res.status(500).json({ err: "Not able to delete" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
const userControllerInstance = new Usercontroller();
module.exports = userControllerInstance;
