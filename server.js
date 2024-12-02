const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());
const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: "yessinemaalej002@gmail.com", // Replace with your email
    pass: "essdsexc123", // Replace with your email's app password
  },
});

// Send Email Function
const sendEmail = async (email, fullName) => {
  try {
    const mailOptions = {
      from: "orion@dione.com",
      to: email,
      subject: "Your Orion is on the Way!",
      html: `
        <h1>Congratulations, ${fullName}!</h1>
        <p>Thank you for purchasing your Orion device.</p>
        <p>Your Orion is on its way and should arrive in approximately 5 days.</p>
        <p>If you have any questions, feel free to contact us at <a href="mailto:support@dioneprotocol.com">support@dioneprotocol.com</a>.</p>
        <p>We’re excited to have you on board!</p>
        <br>
        <p>Best regards,</p>
        <p>The Dione Protocol Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
// MongoDB connection
const dbURI = "mongodb+srv://yessine:dbpass@cluster0.iivvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  shipmentDetails: {
    fullName: String,
    email: String,
    country: String,
    city: String,
    zipCode: String,
    addressLine1: String,
    addressLine2: String,
    phoneNumber: String,
  },
  shipmentStatus: { type: String, enum: ["Not Shipped", "In Progress", "Shipped"], default: "Not Shipped" },
  transactionHash: String,
});

const User = mongoose.model("User", userSchema);
app.post("/api/payment-success", async (req, res) => {
    const { email, fullName } = req.body;
  
    try {
      // Call the email function
      await sendEmail(email, fullName);
  
      res.status(200).json({ message: "Payment success email sent." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  });
// Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update shipment status
app.patch("/api/users/:walletAddress", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { shipmentStatus } = req.body;
    const user = await User.findOneAndUpdate(
      { walletAddress },
      { shipmentStatus },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
const PORT = 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));