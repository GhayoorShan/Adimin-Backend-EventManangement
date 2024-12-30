import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;

import pkg from "jsonwebtoken";
const { sign } = pkg;

import sendgrid from "@sendgrid/mail";

import User from "../models/userModel.js";
import createResponse from "../utils/responseHelper.js";
import {
  registerSchema,
  loginSchema,
} from "../validationSchemas/userSchema.js";
import handleValidationError from "../utils/validationErrorHelper.js";

// Set SendGrid API Key
console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY); // Ensure it's not undefined
console.log("Sender Email:", process.env.SENDGRID_SENDER_EMAIL);

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Register user
const register = async (req, res) => {
  try {
    // Validate request body using registerSchema
    await registerSchema.validate(req.body, { abortEarly: false });

    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json(
          createResponse(0, null, null, [
            { field: "email", message: "User already exists with this email" },
          ])
        );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Save the new user
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    // Send confirmation email using SendGrid
    const msg = {
      to: email, // recipient email
      from: process.env.SENDGRID_SENDER_EMAIL, // sender email (configured in SendGrid)
      subject: "Welcome to Our Service!",
      text: `Hello, ${email}! \n\nThank you for registering with us. You can now log in and access your account. \n\nBest regards, \nDubai`,
      html: `<p>Hello, ${email}!</p><p>Thank you for registering with us. You can now log in and access your account.</p><p>Best regards, <br />Dubai</p>`,
    };

    await sendgrid.send(msg);

    res
      .status(201)
      .json(createResponse(1, "User registered successfully", { email, role }));
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors using the helper
      return res.status(400).json(handleValidationError(error));
    }

    // Handle other errors
    res
      .status(500)
      .json(
        createResponse(0, null, null, [
          { field: "server", message: error.message },
        ])
      );
  }
};

// Login user
const login = async (req, res) => {
  try {
    // Validate request body using loginSchema
    await loginSchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }); // Corrected: use User.findOne
    if (!user) {
      return res
        .status(404)
        .json(createResponse(0, `User not found with email ${email}`));
    }

    // Compare passwords
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(createResponse(0, "Invalid credentials"));
    }

    // Generate token
    const token = sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json(
      createResponse(1, "Login successful", {
        token,
        user: { id: user._id, email: user.email, role: user.role },
      })
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors using the helper
      return res.status(400).json(handleValidationError(error));
    }

    res
      .status(500)
      .json(
        createResponse(0, "An error occurred during login", null, error.message)
      );
  }
};

export default { register, login };
