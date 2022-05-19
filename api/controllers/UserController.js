/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 var jwt=require('jsonwebtoken');
 var EmailAddresses = require('machinepack-emailaddresses');
 var Password=require('machinepack-passwords');
var nodemailer=require('nodemailer');
var bcrypt=require('bcrypt-nodejs');
var isAuthorized=require('../policies/isAuthorized');

module.exports = {

    //passport implements
    login:  function(req, res) {
		var email=req.param('email');
        var Npassword=req.param('password');
        if(!email||!Npassword){return res.badRequest("please enter the email and password");}
         User.findOne({email:req.param('email')})
        .exec((err,user)=>{
            if(err){
               // return res.serverError(err)
               sails.log(err);
               return res.redirect('/login');

            }
            req.session.user=user.id;
            req.session.username=user.name;
            // sails.log("user:",user);
            // sails.log("req.session.user: ",req.session.user);
            // sails.log("req.session.username: ",req.session.username);
             bcrypt.compare(req.param('password'),user.password,function(err){
                if(err){
                    //return res.status(500).json({message:err.message})
                    sails.log(err);
                    return res.redirect('/login');
                }
                var token =jwToken.issue({ id: user.id,email:user.email,name:user.name });
                res.cookie('sailsjwt', token, {signed: true,maxAge: 30})
                 sails.log('token: ',token);
                 sails.log('login successful');
                 return res.redirect('/user');
            })
        })
	},

	
    logoutFn:function logoutFn(req, res) {
        req.session.user = null;
        req.logout();
        return res.redirect('/');
    },
   
//Register
  


  create:function createfn(req,res){
    if (_.isUndefined(req.param('email'))) {
        return res.badRequest('An email address is required.')
    }

    if (_.isUndefined(req.param('password'))) {
        return res.badRequest('A password is required.')
    }
    for(var i=0;i<User.length;i++){
        if(req.param('email')===User[i]){
            return res.badRequest('the email is already exists')
        }
    }
    if (req.param('email')==""||req.param('name')==""||req.param('password')=="") {
        return res.badRequest('please fill the form correctly.')
    }

    if (req.param('password').length < 8) {
        return res.badRequest('Password must be at least 8 characters.')
    }
    var email=req.param('email');
    var name=req.param('name');
    EmailAddresses.validate({
        string: email,
    }).exec({
        error: function(err){
            //return res.serverError(err);
            sails.log(err);
            return res.redirect('/signup')
        },
    
       
        invalid: function(){
            return res.badRequest('Does not look like an email address to me!');
        },
    
     
        success: function(){
            Password.encryptPassword({
                password: req.param('password'),
            }).exec({
                // if there is an error return a server error 500 status code
                error: function(err){
                    return res.serverError(err);
                },
           
                // if success then move on to the next step
                success: function(result){
                    sails.log("result Password: ",result);
                    var user={
                        name:name,
                        email:email,
                        password:result,
                    };
                    let Mailoption=({
                        from:"cnjkk.XXX2022@gmail.com",
                        to:user.email,
                        subject:'Confirmation Mail!!',
                        html:`<h3>Hello ${user.username}</h3><br>
                        <p><h4><b>Welcome to Expense Manager.........!<b></h4></p>`
                    })
                    transport.sendMail(Mailoption,function(err,data){
                        if(err){
                            console.log("error occour mail not send.");
                        }
                        else{
                            console.log("maill send successfully.");
                        }
                    })

                    User.create(user).fetch().exec((err,user)=>{
                        if(err){return res.serverError(err);}
                        sails.log('user: ',user);
                        sails.log('user id: ',user.id);
                        req.session.user=user.id;
                        req.session.username=user.name;
                        sails.log("req.session.user:",req.session.user);
                        sails.log("req.session.username:",req.session.username);
                        var token =jwToken.issue({ id: user.id,email:user.email,name:user.name });
                        res.cookie('sailsjwt', token, {signed: true,maxAge: 30})
                         sails.log('token: ',token);
                        return res.redirect('/user');
                        //return res.redirect("/signup");
                    })
                    //sails.log('userid: ',data.id);
                    
                }
            })
        }
    });
  },


};

