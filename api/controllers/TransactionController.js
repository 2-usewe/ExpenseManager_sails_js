
/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find:function(req,res){
    var accountId=req.param('id');
    req.session.accountId=accountId;
    //sails.log("accountId:",accountId);
    var user=req.session.username;
    Account.findOne({id:accountId},function(err,foundaccount){
      if(err){return res.serverError(err);}
      sails.log("foundaccount: ",foundaccount);
      Transaction.find({accounts:accountId}).sort('date DESC')
      .populate("user").exec((err,foundTransaction)=>{
        if(err){return res.serverError(err);}
        sails.log("foundTransaction: ",foundTransaction);
        sails.log('foundAccount: ',foundaccount);
        return res.view('transaction/transactions',
        {accountId:accountId,
          user:user,
          foundaccount:foundaccount,
        transaction:foundTransaction});
      })
    })
   
  },
  add:function(req,res){
    var accountId=req.param('id');
    return res.view('transaction/addtransaction',{accountId:accountId});
  },
  create:function(req,res){
    var accountId=req.param('id');
    req.session.accountId=accountId;
      var trans={
        type:req.param('type'),
        amount:req.param('amount'),
        desc:req.param('desc'),
        date:req.param('date'),
        accounts: req.param('id'),
        user: req.session.user,
      };
      sails.log('accounts :',req.param('id'));
      Transaction.create(trans).fetch()
      .exec((err,transc)=>{
        if(err){return res.serverError(err);}
        if(!transc){return res.notFound();}
        sails.log("transaction: ",transc);
        return res.redirect("/user/" +accountId+ "/transactions");
      })
  },
  edit:function(req,res){
    var accountId=req.session.accountId;
    Transaction.findOne({id:req.param('id')})
    .exec((err,transaction)=>{
      if(err){return res.serverError(err);}
      return res.view('transaction/edittransaction',{transaction:transaction,accountId:accountId});
    })
  },
  updateFn:function(req,res){
    var accountId=req.session.accountId;
    var trans={
      type:req.param('type'),
      amount:req.param('amount'),
      desc:req.param('desc'),
    }
    Transaction.update({id:req.param('id')},trans)
    .exec((err,transaction)=>{
      if(err){return res.serverError(err);}
      sails.log('updated successfuly:',transaction);
      return res.redirect('/user/'+accountId+'/transactions');
    })
  },
  delete:function(req,res){
    var accountId=req.session.accountId;
    Transaction.destroy({id:req.param('id')},(err,deletedata)=>{
      if(err){return res.serverError(err);}
      sails.log("deleted successfuly.",deletedata);
      return res.redirect('/user/'+accountId+'/transactions');
    })
  },

};

