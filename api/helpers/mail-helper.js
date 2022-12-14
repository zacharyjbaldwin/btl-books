// Use this helper to programmatically send emails.
// Use mail.controller.js to send emails by hitting a route.

const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY || require('../keys.json').SENDGRID_API_KEY);

module.exports.sendInvoiceEmail = (email, orderId) => {
    mail.send({
        to: email,
        from: 'noreply@btl-books.com',
        subject: 'Order confirmation',
        text: `Thank you for your order! View your invoice here: https://www.btl-books.com/invoice/${orderId}`,
        html: `<p>Thank you for your order! View your invoice here: <a href="https://www.btl-books.com/invoice/${orderId}">https://www.btl-books.com/invoice/${orderId}</a></p>`
    })
    .catch((error) => {
        throw error;
    });
};

module.exports.sendMail = (to, subject, text) => {
    const message = {
        to: to,
        from: 'noreply@btl-books.com',
        subject: subject,
        text: text
    };

    mail.send(message)
        .catch((error) => {
            throw error;
        });
};