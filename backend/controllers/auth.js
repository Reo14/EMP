const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
require("dotenv").config();

// sign up (就是创建personal info)
async function signup(req, res) {
  try {
    const { username, password, email } = req.body;
    console.log("auth.js signup: req.body", req.body);

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const existingUser = await User.findOne({ email });
    console.log("auth.js signUp: existing user", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password", hashedPassword);
    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      registrationToken: token,
      registrationStatus: "Submitted",
    });

    await newUser.save();
    console.log("New user", newUser);

    res.status(201).json({
      message: "Signup successful",
      userId: newUser.userId,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
    });
  } catch (error) {
    console.log("auth.js: signUp error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function signin(req, res) {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User Not exist" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    res.status(200).json({
      message: "Signin successful",
      token,
      role: user.role,
      email: user.email,
      username: user.username,
      userId: user.userId,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  signup,
  signin,
};
