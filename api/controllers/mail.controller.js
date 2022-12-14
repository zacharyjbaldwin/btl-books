const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY || require('../keys.json').SENDGRID_API_KEY);

module.exports.sendMail = (req, res) => {
    res.status(501).json({
        error: 'Not implemented.'
    });
};

module.exports.sendTestMail = (req, res) => {

    if (!req.body.to) {
        return res.status(400).json({
            error: 'Bad request. Request body requires \'to\''
        });
    }

    const message = {
        to: req.body.to,
        from: 'noreply@btl-books.com',
        subject: 'On behalf of btl-books.com',
        text: 'This is a test email.'
    };

    mail.send(message)
        .then(() => {
            res.status(200).json({
                message: 'Email sent!'
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Failed to send email.',
                error: error
            });
        });
};