
/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    find: function(req,res){
        Account.find({members:req.session.user})
        .populate('members')
        .exec((err,account)=>{
          if(err){return res.serverError(err);}
          if(!account){return res.notFound();}
          //sails.log("accounts:",account);
          var user=req.session.username;
          return res.view('user/userIndex',{account:account,user:user});
        })
    },
    add:function(req,res){
      User.find(req.session.user,function(err,user){
        if(err)return res.serverError(err);
        //sails.log("user.name:",user.name);
        sails.log("user-acc:",user);
        return res.view('account/addaccount',{user:user});
      })
    },
  create:function(req,res){
      var account={
        accountname:req.param('accountname'),
        desc:req.param('desc'),
        members:req.session.user,
        trans_action:[]
      }
      Account.create(account).fetch()
      .exec((err,account)=>{
        if(err)return res.serverError(err);
        //account.members.push(req.user);
        req.session.account=account.id;
        sails.log('req.session.account: ',req.session.account);
        sails.log("account created successfuly, account:",account);
        return res.redirect('/user')
      })
  },
  edit:function(req,res){
    Account.findOne({id:req.param('id')})
    .exec((err,account)=>{
      if(err){return res.serverError(err);}
      if(!account){return res.notFound();}
      sails.log("edit: ",account);
      return res.view('account/editaccount',{account:account,acc_id:req.param('id')});
    })
    
  },
  updatefn:function(req,res){
    var accountname={
      accountname:req.param('accountname'),
    };
    Account.update({id:req.param('id')},accountname)
    .exec((err,account)=>{
      if(err){return res.serverError(err);}
      sails.log("updated successfully.:",account);
      return res.redirect('/user');
    })
  },
  delete:function(req,res){
    Account.destroy({id:req.param('id')},(err)=>{
        if(err)return res.status(500).json({message:err.message}); 
        Transaction.destroy({accounts:req.param('id')},(err)=>{
          if(err){return res.serverError(err);}
          sails.log("account deleted successfuly.");
          return res.redirect('/user');
        })
       
    })
  },
  //Account Details
  Details:function(req,res){
    var income=0;
    var expense=0;
    var transfer=0;
    Account.findOne({id:req.param('id')}).populate('members')
    .exec((err,foundAccount)=>{
      if(err){return res.serverError(err)}
      sails.log('foundAccount:',foundAccount);
      Transaction.find({accounts:req.param('id')},function(err,foundAll){
        if(err){return res.status(500).json({message:err.message})}
        sails.log('foundAll:',foundAll);
        foundAll.forEach(function(transaction){
          if(err){sails.log(err);}
          if(transaction.type=="income"){
            income=income+transaction.amount;
          }
          if(transaction.type=='expense'){
            expense=expense+transaction.amount;
          }
          if(transaction.transfer=='transfer'){
            transfe=transfer+transaction.transfer;
          }
        })
        return res.view('account/acc_details',{
          account:foundAccount,
          income:income,
          expense:expense,
          transfer:transfer,
        })
      })
    })
  }
  

};

