const { verify } = require('crypto');
const jwt=require('jsonwebtoken');
var tokenSecret = "secretissecret";
module.exports={
    issue(payload){
        return jwt.sign(payload,tokenSecret,{expiresIn:"30days"});

    },
    //verifies token on a request
    verify(token,callback){
        return jwt.verify(token,tokenSecret,function(err,decode){
            if(err)return res.status(500).json({message:err.message});
            return res.ok(decode);
        })
    }
}