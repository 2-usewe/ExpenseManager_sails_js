const nodemailer=require('nodemailer');
module.exports= nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sagfs.XXX2022@gmail.com", 
        pass: "#########",
    },
  });