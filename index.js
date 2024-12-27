const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./src/config/dbConnect");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dbConnect();

const app = express();

//Middleware
app.use(express.json());

//Routes
// Email route
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  const msg = {
    to,
    from: "iamghayoor7@gmail.com", // verified sender email
    subject,
    text,
    html, // optional
  };

  try {
    const response = await sgMail.send(msg);
    console.log("SendGrid response:", response); // Log the full response

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);

    if (error.response) {
      console.error("SendGrid error response:", error.response.body);
    }

    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
//Start server
console.log("Server is starting...");
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
