# EmailJS Setup Instructions for Portfolio Contact Form

## Overview
Your contact form is now configured to send emails using EmailJS. Follow these steps to complete the setup.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Set Up an Email Service

1. Once logged in, go to the **Email Services** section
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. For Gmail:
   - Click "Connect Account"
   - Authorize EmailJS to access your Gmail account
5. After connecting, you'll receive a **Service ID** (e.g., "service_abc123")
6. **Save this Service ID** - you'll need it later

## Step 3: Create an Email Template

1. Go to the **Email Templates** section
2. Click "Create New Template"
3. Use this template configuration:

### Template Content:
```
From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}
```

### Template Settings:
- **To Email**: likithvishal20@gmail.com (or your preferred email)
- **From Name**: Portfolio Contact Form
- **Subject**: New Contact Form Submission from {{from_name}}

4. Click "Save" and note your **Template ID** (e.g., "template_xyz789")

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., "abcd1234EFGH5678")
3. **Save this Public Key**

## Step 5: Update Your Code

Open `src/components/Profile/profile.js` and replace the placeholder values in the `handleSubmit` function (around lines 62-64):

```javascript
const SERVICE_ID = 'YOUR_SERVICE_ID';      // Replace with your Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // Replace with your Template ID
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';       // Replace with your Public Key
```

Example:
```javascript
const SERVICE_ID = 'service_abc123';
const TEMPLATE_ID = 'template_xyz789';
const PUBLIC_KEY = 'abcd1234EFGH5678';
```

## Step 6: Test Your Contact Form

1. Save the file
2. Run `npm start` to start your development server
3. Navigate to your contact form
4. Fill out the form and submit
5. Check your email (likithvishal20@gmail.com) for the message

## Troubleshooting

### Email Not Received
- Check your EmailJS dashboard for any errors
- Verify all three IDs are correct
- Check your spam folder
- Make sure the template variables match exactly (from_name, from_email, phone, message)

### CORS Errors
- EmailJS should work out of the box with no CORS issues
- If you see errors, check that you're using the correct Public Key

### Free Tier Limits
- EmailJS free tier allows 200 emails/month
- If you need more, consider upgrading to a paid plan

## Security Notes

- **Never commit your EmailJS credentials to version control**
- Consider creating a `.env` file for production:
  ```
  REACT_APP_EMAILJS_SERVICE_ID=your_service_id
  REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
  REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
  ```
- Update the code to use environment variables:
  ```javascript
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  ```

## Features Included

✅ Form validation (all fields required)
✅ Loading state while sending
✅ Success message with auto-close
✅ Error handling with fallback email
✅ Form reset after successful submission
✅ Disabled inputs during submission

## Support

If you need help:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Dashboard: https://dashboard.emailjs.com/

---

**Note**: Remember to replace the placeholder values with your actual EmailJS credentials before deploying your portfolio!