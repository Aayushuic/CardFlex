const verifyEmailContent = (fullName, verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 90%;
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h2 {
                color: #333;
                font-size: 24px;
                margin-bottom: 10px;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
                margin: 0 0 10px;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #fff;
                background-color: #007BFF;
                border-radius: 4px;
                text-decoration: none;
                text-align: center;
                text-color:white;
            }
            .footer {
                font-size: 14px;
                color: #777;
                margin-top: 20px;
            }
            .footer a {
                color: #007BFF;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Hello ${fullName},</h2>
            <p>Thank you for signing up with CardFlex! We’re excited to have you on board.</p>
            <p>To complete your registration, please verify your email address by clicking the link below:</p>
            <p><a href="${verificationUrl}" class="button">Verify Your Email</a></p>
            <p>Please note: This verification link will expire in 15 minutes.</p>
            <p>If you did not create this account, please ignore this email.</p>
            <p>Best regards,<br>The CardFlex Team</p>
            <div class="footer">
                <p>Need Help? For any queries, feel free to reach out:</p>
                <p>Email: <a href="mailto:cardflexhelp@gmail.com">cardflexhelp@gmail.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = verifyEmailContent;
