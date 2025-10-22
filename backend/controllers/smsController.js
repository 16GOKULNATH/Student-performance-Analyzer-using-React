import twilio from "twilio";
import express from "express";

const router = express.Router();

// Twilio credentials (replace with your own)
const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

router.post("/send-report", async (req, res) => {
  try {
    const { name, regno, marks, phone } = req.body;

    const total = Object.values(marks).reduce((a, b) => a + b, 0);
    const avg = (total / Object.keys(marks).length).toFixed(2);

    const messageBody = `
Student Report:
Name: ${name}
Reg No: ${regno}
Maths: ${marks.Maths}
Science: ${marks.Science}
English: ${marks.English}
Average: ${avg}
    `;

    await client.messages.create({
      body: messageBody,
      from: "+919789502444", // your Twilio number
      to: phone, // recipient's phone number
    });

    res.status(200).json({ success: true, message: "Report sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
