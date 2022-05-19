/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

   '/': { view: 'user/index' },
   'get /signup':{view:'user/signup'},
   'post /user/create':'UserController.create',
   'get /login':{view:'user/login'},
   'post /user/login':'UserController.login',
   'get /user/logout':'UserController.logoutFn',


   'get /user':'AccountController.find',
   //Account Views
   'get /user/addaccount':'AccountController.add',
   'post /user/newaccount':'AccountController.create',
   //'get /user/accdetails':{view:'account/acc_details'},
   'get /user/editaccount/:id':"AccountController.edit",
   'post /user/update/:id':"AccountController.updatefn",
   'get /user/delete/:id':"AccountController.delete",
   'get /user/account/:id':'AccountController.Details',

   //Transactions
  'get /user/:id/transactions':'TransactionController.find',
  'get /:id/transactions/add':'TransactionController.add',
  'post /:id/transactions/create':'TransactionController.create',
  'get /:id/transactions/edit/:id':'TransactionController.edit',
  'post /:id/transaction/update/:id':'TransactionController.updateFn',
  'get /:id/transaction/delete/:id':'TransactionController.delete',
   



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
