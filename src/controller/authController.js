const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User already exists with email ${email}` });
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    // Send the registration email using SendGrid
    const msg = {
      to: email, // recipient's email
      from: "iamghayoor7@gmail.com", // verified sender email
      subject: "Registration successful",
      text: "Welcome to the app",
      html: "<strong>Welcome to the app</strong>", // optional
    };

    try {
      const emailResponse = await sgMail.send(msg);
      console.log("SendGrid response:", emailResponse); // Log the full response
      // Send response after both user creation and email sent
      res.status(201).json({
        message: `User registered successfully and email sent to ${email}`,
        emailStatus: "Email sent successfully!",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      if (emailError.response) {
        console.error("SendGrid error response:", emailError.response.body);
      }
      // Send response with email failure info
      res.status(201).json({
        message: `User registered successfully, but email failed to send`,
        emailError: emailError.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      req: req.body,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User not found with email ${email}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { register, login };
