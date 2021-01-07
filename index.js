const cron = require('node-cron');
const mailer = require('nodemailer');

//T0 Get the Current Year, Month And Day
var dateYear = new Date().getFullYear();
var dateMonth = new Date().getMonth(); // start counting from 0
var dateDay = new Date().getDate();// start counting from 1

/// database goes here 
var users = [
    {
        'id' : 000,
        'name' : 'user1',
        'dob' : '14-6',
        'email' : 'user1@exapmle.com'
    },
    {
        'id' : 001,
        'name' : 'user2',
        'dob' : '15-6',
        'email' : 'user2@exapmle.com'
    },
    {
        'id' : 002,
        'name' : 'user3',
        'dob' : '17-4',
        'email' : 'user3@exapmle.com'
    },
    {
        'id' : 003,
        'name' : 'user4',
        'dob' : '6-0',
        'email' : 'user4@exapmle.com'
    }
]

//// credentials for your Mail
var transporter = mailer.createTransport({
    host: 'YOUR STMP SERVER',
    port: 465,
    secure: true,
    auth: {
        user: 'YOUR EMAIL',
        pass: 'YOUR PASSWORD'
    }
});
//Cron Job to run around 7am Server Time 
cron.schedule('* * 07 * * *', () => {
    ///The Main Function 
    const sendWishes =  
    // looping through the users
    users.forEach(element => {
        // Spliting the Date of Birth (DOB) 
        // to get the Month And Year 
        let d = element.dob.split('-')
        let dM = +d[1]  // For the month
        let dD = +d[0] // for the day 
        console.log( typeof dM) //return number
        // Sending the Mail
        if(dateDay == dD && dateMonth == dM ){
            const mailOptions = {
                from: 'YOUR EMAIL',
                to: element.email,
                subject: `Happy Birthday `,
                html: `<b>Happy birthday ${element.name}</b>, Enjoy your day \n <small>this is auto generated</small>`                       
            };
            return transporter.sendMail(mailOptions, (error, data) => {
                if (error) {
                    console.log(error)
                    return
                }
            });
        } 
    });
});
