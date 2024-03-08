const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS,
  },
});

const updateStatus = async (user, job) => {
  const subject = `Someone viewed your application`;
  const html = `Dear ${user.name},
  
      <p>We hope this message finds you well.</p>
      
      <p>We wanted to inform you that your job application for the <strong>${job.title}</strong> position at <strong>${job.company}</strong> has been viewed by the hiring team. This indicates their interest in your application and may lead to further communication regarding next steps.</p>
      
      <p>Thank you for your interest in joining our team. We appreciate your time and effort throughout this process.</p>
      
      <p>Should you have any questions or require further assistance, please don't hesitate to reach out.</p>
      
      Best regards,
      Team Feedback :)
      feedback@mail.com
      `;

  const message = {
    from: `Feedback <feedback@mail.com>`,
    to: user.email,
    subject,
    html,
  };
  try {
    await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};

module.exports = updateStatus;
