/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 const bcrypt=require('bcrypt-nodejs');
 module.exports = {
 
   attributes: {
      name:{
        type:'string',
        required:true,
      },
      email:{
        type:'string',
        required:true,
        unique:true,
      },
      password:{
        type:'string',
        required:true
      },
      acco_unts:{
        collection: 'account',
        via:'members'
      },
      transactions:{
        collection:'transaction',
        via:'user',
      }
   },
   customToJSON: function() {
     return _.omit(this, ['password']);
  },
  beforeCreate: function(user, cb){
   bcrypt.genSalt(10, function(err, salt){
     bcrypt.hash(user.password, salt, null, function(err, hash){
       if(err) return cb(err);
       user.password = hash;
       return cb();
     });
   });
 },
   datastores:'mongodb',
};
 
 