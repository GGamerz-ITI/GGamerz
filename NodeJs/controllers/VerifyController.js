const path = require("path");
const emailBuilder = require(path.join(__dirname, "../utils/EmailTemplate"))
const models = require(path.join(__dirname ,"../models"));
require("dotenv").config({ path: __dirname + "/.env" });

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const verifyEmail = async (req,res) =>{
    try
    {
        userEmail = req.body.email

        const user = await models.User.findOne({ where: { email: userEmail } });
        // check if there is a user
        if(!user)
        {
            return res.status(404).json({ message: "Email not registered" });
        }
        
        // check if user is already verified
        if(user.emailVerifiedAt)
        {
            return res.status(409).json({ message: "Email Already Verified" });
        }
      
        // creating token
        userDataForToken = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          };
        const token = jwt.sign(userDataForToken, process.env.SECRET_KEY);


        const currentDate = new Date();
        const expiryDate = new Date(currentDate.getTime() + 3 * 60 * 60 * 1000);

        // Check if there is already token in db if yes token will be deleted to make another one
        const checkToken = await models.VerificationToken.findOne({ where: { email: userEmail } });
        if(checkToken)
        {
            const deleteToken = await models.VerificationToken.destroy({ where: { id: checkToken.id } });
            if (!deleteToken) {
               return res.status(400).json({ message: "Expired Token found and couldn't delete" });
              }
        }

        // Token table match requirements and we will create new token
        let myToken = {
          userId: user.id,
          email: user.email.toLowerCase(),
          token: token,
          expiryDate: expiryDate
        };

        const newToken = await models.VerificationToken.create(myToken);
        if(!newToken)
        {
            return res.status(400).json({ message: "Failed to create token in Verfication Table" });
        }

        // Token created and will be sent by email
        
        // Creating Url and message to send them to email builder to get back design
        const myUrl = `${process.env.FRONTEND}verify?userId=${user.id}&token=${token}`;
        const msg = `Verify your email now on GGamerz and join our gaming community where you </br> can buy games and 
        communicate with other gamers like you :D`
        const title = `Verify Email`
       
       // Preparing html builder and other options
        const mailOptions = {
            from: 'ggamerz.iti@gmail.com',
            to: userEmail,
            subject: 'Email Verification',
            html: emailBuilder.emailTemplate(myUrl,msg, title) // takes url, msg and button title to return html template
          };
             
          let send = await sendEmail(mailOptions);

          if(!send)
          {
            return res.status(400).json({ message: "Email not sent" });
          }

          // Email sent with token successfully and token is stored in database
          return res.status(200).json({ message: "Email Sent Successfully" });
    }catch(err)
    {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}

const verify = async (req,res) =>{
    try
    {
        id = req.params.userId;
        token = req.params.token
    
        const decoded = jwt.decode(token);
        let userEmail = decoded.email;
    
        const user = await models.VerificationToken.findOne({ where: { email: userEmail } });
        if(!user)
        {
            return res.status(404).json({ message: "No Verification found please request new verification" });
        }
    
        if(user.token != token)
        {
            console.log(user.token)
            console.log(decoded.token)
            return res.status(401).json({ message: "Invalid token" });
        }
    
        const deleteToken = await models.VerificationToken.destroy({ where: { email: userEmail } });
        if (!deleteToken) {
           return res.status(400).json({ message: "Couldn't delete token" });
        }
            
        const newEmailVerifiedAt = new Date();
        
        const verifyUser = await models.User.update({ emailVerifiedAt: newEmailVerifiedAt }, {
          where: {
            email: userEmail
          }
        });

        if (!verifyUser) {
            return res.status(400).json({ message: "Failed to update user verifiedAt field" });
         }

         return res.status(200).json({ message: "Verified Successfully" });
    }catch(err)
    {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}

const passReset = async (req,res) =>{
  try
  {
      userEmail = req.body.email

      const user = await models.User.findOne({ where: { email: userEmail } });
      // check if there is a user
      if(!user)
      {
          return res.status(404).json({ message: "Email not registered" });
      }
      
      // creating token
      userDataForToken = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        };
      const token = jwt.sign(userDataForToken, process.env.SECRET_KEY);


      const currentDate = new Date();
      const expiryDate = new Date(currentDate.getTime() + 3 * 60 * 60 * 1000);

      // Check if there is already token in db if yes token will be deleted to make another one
      const checkToken = await models.ResetPasswordToken.findOne({ where: { email: userEmail } });
      if(checkToken)
      {
          const deleteToken = await models.ResetPasswordToken.destroy({ where: { id: checkToken.id } });
          if (!deleteToken) {
             return res.status(400).json({ message: "Expired Token found and couldn't delete" });
            }
      }

      // Token table match requirements and we will create new token
      let myToken = {
        userId: user.id,
        email: user.email.toLowerCase(),
        token: token,
        expiryDate: expiryDate
      };

      const newToken = await models.ResetPasswordToken.create(myToken);
      if(!newToken)
      {
          return res.status(400).json({ message: "Failed to create token in Reset Password Table" });
      }

      // Creating Url and message to send them to email builder to get back design
      const myUrl = `${process.env.FRONTEND}passReset?userId=${user.id}&token=${token}`;
      const msg = `Oops looks like you forgot your password 👀 <br/> Here is a link click on it to make another one`
      const title = `Reset Password`

      // Token created and will be sent by email
        const mailOptions = {
          from: 'ggamerz.iti@gmail.com',
          to: userEmail,
          subject: 'Reset Password',
          html: emailBuilder.emailTemplate(myUrl,msg, title) // takes url, msg and button title to return html template
        };
           
        let send = await sendEmail(mailOptions);

        if(!send)
        {
          return res.status(400).json({ message: "Email not sent" });
        }

        // Email sent with token successfully and token is stored in database
        return res.status(200).json({ message: "Email Sent Successfully" });
  }catch(err)
  {
      console.log(err)
      return res.status(500).json({ message: "Internal server error" });
  }
}

async function sendEmail(mailOptions) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAILHOST,
        port: 2525,
        auth: {
          user: process.env.EMAILUSER,
          pass: process.env.EMAILPASS
        }
      });
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
}

module.exports = {
    verifyEmail,
    verify,
    passReset
}