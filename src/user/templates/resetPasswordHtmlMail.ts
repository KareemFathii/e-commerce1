import { User } from "../entities/user.entity"

export const resetPasswordHtml = (code: string, expiresIn: Date , user: User ) => {
  return `<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
    }

    .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
    }

    .email-header {
        background-color: #6e0505ff;
        color: #ffffff;
        text-align: center;
        padding: 20px;
    }

    .email-body {
        padding: 20px;
        color: #333333;
        line-height: 1.6;
    }

    .code-box {
        background-color: #f0f7ff;
        border: 2px dashed #6e0505ff;
        border-radius: 8px;
        margin: 24px auto;
        padding: 16px;
        text-align: center;
        max-width: 300px;
    }

    .code {
        font-size: 2.5rem;
        font-weight: 900;
        letter-spacing: 8px;
        color: #6e0505ff;
        margin: 0;
    }

    .expiry {
        text-align: center;
        font-size: 14px;
        color: #666666;
    }

    .warning {
        background-color: #fff8e1;
        border-left: 4px solid #6e0505ff;
        padding: 10px 14px;
        font-size: 14px;
        margin-top: 20px;
    }

    .email-footer {
        background-color: #f4f4f4;
        color: #666666;
        text-align: center;
        padding: 10px;
        font-size: 14px;
    }
</style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h1 style="margin:0;">Password Reset</h1>
        </div>

        <div class="email-body">
            <p>Hello ${user.name},</p>
            <p>We received a request to reset the password for your account. Use the verification code below to continue:</p>

            <div class="code-box">
                <p class="code">${code}</p>
            </div>

            <p class="expiry">This code will expire in <strong>${expiresIn} minutes</strong>.</p>

            <div class="warning">
                <strong>Didn't request this?</strong> You can safely ignore this email — your password will not change. Never share this code with anyone.
            </div>

            <p>If you have any questions or need assistance, feel free to contact us at any time.</p>
        </div>

        <div class="email-footer">
            <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>

</html>`
}   