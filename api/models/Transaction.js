/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    accounts:{
      model:'account'
    },
    user:{
      model:'user'
    },
    type:{
      type:'string',
    },
    amount:{
      type:'number',
    },
    desc:{
      type:'string',
    },
    date:{
      type: 'string', 
    },
  },

};

