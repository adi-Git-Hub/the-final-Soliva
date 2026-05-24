const dotenv = require('dotenv');
dotenv.config();
const sendEmail = require('./utils/sendEmail');

const testEmail = async () => {
  try {
    console.log('Attempting to send test email...');
    await sendEmail({
      email: 'test-recipient@example.com', // Replace with a real email to actually check your inbox
      subject: 'Soliva Backend - Email Test',
      html: '<h1>Email Service is working!</h1><p>This is a test email from the Soliva backend audit.</p>'
    });
    console.log('✅ Email sent successfully!');
  } catch (error) {
    console.error('❌ Email failed to send:');
    console.error(error);
  }
};

testEmail();
