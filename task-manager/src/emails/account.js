const sgMail = require('@sendgrid/mail');
const sendgirdAPIKey = `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`;

sgMail.setApiKey(sendgirdAPIKey);

sgMail.send({
    to: 'knzphumthawan@gmail.com',
    from: 'knzphumthawan@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
});