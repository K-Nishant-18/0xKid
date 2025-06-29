

import nodemailer from "nodemailer"

const creatTranspoter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL,
            pass: process.env.APP_PASSWORD
        }
    })
}

const prepareMailOtptions = (to, subject, text, html) => {
    return {
        from: process.env.MAIL,
        to: to,
        subject: subject,
        text: text,
        html: html
    }
}

const sendEmail = async (to, subject, text, html) => {
    const transporter = creatTranspoter();
    const options = prepareMailOtptions(to, subject, text, html);

    try {
        const info = await transporter.sendMail(options);
        console.log("email send", info.response)
        return info.response;
    } catch (error) {
        console.log('Error sending email:', error);
        return { success: false, error: error.message };
    }


}




export { sendEmail }