const moment = require("moment");
const nodemailer = require('nodemailer');




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fairyland.encomenda@gmail.com',
        pass: 'redvelvet'
    }
});


function sendEmail(order){
    const mailOptions = {
      from: 'fairyland.encomenda@gmail.com',
      to: order.customer.email,
      subject: `Order Number ${order._id} Confirmation`,
       html:
       createEmail(order),

    attachments: [{
        filename: 'fairy_logo.png',
        path: __dirname + "/image/fairy_logo.png",
        cid: 'unique@kreata.ee'
        }]
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
         console.log(err)
        else
         console.log(info);
        });
}

function createEmail(order){
    let newDateFormat = moment(order.customer.pickUpTime).format("dddd, D MMMM YYYY");
    let newTimeFormat = moment(order.customer.pickUpTime).format("h:mm")
    return (`
        <div style="height: 100vh; text-align:center; background-color: #F2E0E4; font-family:serif; color: #585143">
            <div style="display:flex; padding-top: 20px width:100%; text-align:center; justify-content: center; align-self:center">
                <img style="width: 150px; height: 150px;" src="cid:unique@kreata.ee"/>
            </div>
            <br>
            <h1>${order.customer.name}, we appreciate your order!</h1>
            </br>
            <h2>Your order number is  <span style="font-size: 1.7em"> ${order._id}</span><h2>
            <br>
            <h2>Remember to pick up your order on: </h2>
            <h2>${newDateFormat} </h2> <h2>at</h2> <h2>${newTimeFormat}</h2>
            <br>
            <h2>If you have any questions call us at <span style="font-size: 1.3em">(48) 3209-7462</span></h2>
        </div>
    `)
}
module.exports = sendEmail
