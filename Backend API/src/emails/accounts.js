const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name)=>{
    const msg = {
        to: email,
        from: 'abdelrahman98@gmail.com',
        subject: 'MEAN Notes: Welcome',
        html: `<strong>Thanks ${name}, Start Adding your first note and keep it forever</strong>`,
      };
      sgMail.send(msg);
}
const sendOnDeletingEmail = (email,name)=>{
    const msg = {
        to: email,
        from: 'abdelrahman98@gmail.com',
        subject: 'MEAN Notes : We are sad!',
        html: `<strong>We are sorry  ${name}, Please tell us the problem And we solve it</strong>`,
      };
      sgMail.send(msg);
}
module.exports = {
    sendWelcomeEmail,
    sendOnDeletingEmail
}