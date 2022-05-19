/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  accountname:{
    type:'string',
    required:true
  },
  desc:{
    type:'string',
  },
  members:{
    model:'user',
  },
  trans_action:{
    collection:'transaction',
    via:'accounts'
  }
  },

};

