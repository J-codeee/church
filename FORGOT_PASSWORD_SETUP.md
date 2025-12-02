# Forgot Password Feature Setup

## Overview
The forgot password feature has been fully implemented with the following components:

### Files Created/Modified:
1. **Frontend Components:**
   - `src/components/ForgotPasswordModal.tsx` - Modal for requesting password reset
   - `src/components/LoginForm.tsx` - Updated with "Forgot Password?" link
   - `src/app/reset-password/page.tsx` - Page for resetting password with token

2. **API Endpoints:**
   - `src/app/api/auth/forgot-password/route.ts` - Handles password reset requests
   - `src/app/api/auth/reset-password/route.ts` - Handles password reset with token

3. **Database:**
   - `src/lib/database.ts` - Added password reset functions
   - `src/lib/auth.ts` - Added token generation function
   - `src/lib/database-schema.sql` - Updated with password_reset_tokens table
   - `src/lib/migrations/001_add_password_reset_tokens.sql` - Migration file

## Database Setup

### Step 1: Run the migration
Execute the following SQL in your database:

```sql
-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_email ON password_reset_tokens(email);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
```

Or run the migration file directly:
```bash
psql -d your_database_name -f src/lib/migrations/001_add_password_reset_tokens.sql
```

## How It Works

### User Flow:
1. User clicks "Forgot Password?" on the login form
2. Modal opens asking for their email address
3. User enters email and clicks "Send Reset Link"
4. System generates a secure token (valid for 1 hour)
5. Token is stored in database with expiration time
6. User receives reset link (currently logged to console in development)
7. User clicks link and is taken to reset password page
8. User enters new password (with confirmation)
9. Password is validated and updated
10. User is redirected to home page and can sign in with new password

### Security Features:
- **Token Expiration:** Tokens expire after 1 hour
- **One-time Use:** Tokens are deleted after successful password reset
- **Secure Token Generation:** Uses crypto.randomBytes for cryptographically secure tokens
- **Password Validation:** Enforces password strength requirements
- **No Email Enumeration:** Always returns success message, even if email doesn't exist
- **Old Token Cleanup:** Previous tokens are deleted when new request is made

## Testing in Development

### Step 1: Start the development server
```bash
npm run dev
```

### Step 2: Test the flow
1. Navigate to the login page
2. Click "Forgot Password?"
3. Enter a valid email from your database
4. Check the console for the password reset link (it will be printed there)
5. Copy the link and paste it in your browser
6. Enter a new password (must meet requirements):
   - At least 8 characters
   - Contains uppercase letter
   - Contains lowercase letter
   - Contains number
7. Confirm the password
8. Click "Reset Password"
9. You should see success message and be redirected
10. Try logging in with the new password

### Example Console Output in Development:
```
========================================
PASSWORD RESET LINK FOR: user@example.com
http://localhost:3000/reset-password?token=abc123...
========================================
```

## Production Setup

### Email Service Integration
For production, you need to integrate an email service. Popular options:

1. **SendGrid**
2. **AWS SES**
3. **Mailgun**
4. **Resend**

### Update the forgot-password endpoint:
In `src/app/api/auth/forgot-password/route.ts`, replace the console.log with actual email sending:

```typescript
// Example with SendGrid:
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const msg = {
  to: normalizedEmail,
  from: 'noreply@yourchurch.org',
  subject: 'Password Reset Request',
  html: `
    <p>You requested a password reset.</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link expires in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `
}

await sgMail.send(msg)
```

### Environment Variables
Add to your `.env.local`:
```
NEXT_PUBLIC_APP_URL=https://yourchurch.org
# Email service credentials
SENDGRID_API_KEY=your_api_key_here
```

## Database Cleanup (Optional)

To automatically clean up expired tokens, you can create a scheduled job or cron:

```sql
-- Delete expired tokens (run periodically)
DELETE FROM password_reset_tokens
WHERE expires_at < CURRENT_TIMESTAMP;
```

## Troubleshooting

### Issue: Token not found or expired
- Check that the database migration was run successfully
- Verify the token hasn't expired (1 hour limit)
- Check that the token wasn't already used

### Issue: Email not sending in production
- Verify email service credentials are correct
- Check email service logs for errors
- Ensure sender email is verified with your email service

### Issue: Password not updating
- Check database connection
- Verify the email exists in the users table
- Check server logs for error messages

## Features to Consider Adding

1. **Rate Limiting:** Prevent abuse by limiting reset requests per email
2. **Email Notifications:** Send email when password is successfully changed
3. **Security Questions:** Add additional verification
4. **Two-Factor Authentication:** Require 2FA for password reset
5. **Password History:** Prevent reusing recent passwords
