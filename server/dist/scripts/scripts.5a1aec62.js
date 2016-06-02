"use strict";angular.module("app",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/signin.html",controller:"SignInCtrl",controllerAs:"signin"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignUpCtrl",controllerAs:"signup"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl",controllerAs:"dashboard"}).when("/mycontrollers",{templateUrl:"views/controllers.html",controller:"ControllerCtrl",controllerAs:"controllers"}).when("/mycontrollers/add",{templateUrl:"views/add-controllers.html",controller:"AddControllerCtrl",controllerAs:"add-controllers"}).when("/mydevices",{templateUrl:"views/devices.html",controller:"DeviceCtrl",controllerAs:"devices"}).when("/mydevices/add",{templateUrl:"views/add-devices.html",controller:"AddDeviceCtrl",controllerAs:"add-devices"}).when("/mydevices/add/customize",{templateUrl:"views/customize-device.html",controller:"CustomizeDeviceCtrl",controllerAs:"customize-device"}).when("/mysubscription",{templateUrl:"views/subscription.html",controller:"SubscriptionCtrl",controllerAs:"subscription"}).when("/myaccountsettings",{templateUrl:"views/accountsettings.html",controller:"AccountSettingsCtrl",controllerAs:"accountsettings"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("app").controller("DashboardCtrl",["$scope","$rootScope","$http","$cookies",function(a,b,c,d){a.onInit=function(){b.currentView="Dashboard",b.dashboard=!0,c.get("/auth/currentuser").success(function(a){b.loggedUser=a,b.username=a.email,b.email=a.email,b.firstName=a.firstName,b.premium=a.premium,b.loggedIn=!0,b.homeURL="/dashboard",d.put("userId",a._id)}).error(function(){a.alert="Login failed"})}}]),angular.module("app").controller("ControllerCtrl",["$scope","$cookies","$http","$rootScope","$location",function(a,b,c,d,e){a.onInit=function(){d.currentView="Controllers",c.get("/controllers/byuser/"+b.get("userId")).success(function(b){for(var c=0;c<b.length;c++)b[c].controllerNum=c+1;b.length>0?a.items=b:a.items=null,a.sortType="index",a.sortReverse=!1})},a.addController=function(){e.path("/mycontrollers/add")},a.removeController=function(d){c["delete"]("/controllerbindings/"+d+"/"+b.get("userId")).success(function(){a.updated=!0;for(var b=0,c=0;c<a.items.length;c++)if(a.items[c]._id===d){b=c;break}a.items.splice(b,1),a.items.length<=0&&(a.items=null)}).error(function(){a.updated=!1})}}]),angular.module("app").controller("AddControllerCtrl",["$scope","$location","$cookies","$http","$rootScope","$timeout",function(a,b,c,d,e,f){a.onInit=function(){e.currentView="Add Controller",a.controllerURI="",a.updated=null},a.addController=function(e){e.length>0?d.get("/controllers/uri/"+e).success(function(e){if(null===e||"undefined"===e._id||null!==e.userId&&"undefined"!==e.userId)a.updated=!1;else{var g={headers:{"Content-Type":"application/x-www-form-urlencoded"}};d.put("/controllerbindings/"+e._id+"/"+c.get("userId"),g).success(function(){a.updated=!0,f(function(){b.path("/mycontrollers")},2e3)}).error(function(){a.updated=!1})}}).error(function(){a.updated=!1}):a.updated=!1}}]),angular.module("app").controller("DeviceCtrl",["$scope","$cookies","$http","$log","$rootScope",function(a,b,c,d,e){a.sortType="index",a.sortReverse=!1,a.searchDevice="",a.change=function(a){c.get("/devices/"+a).success(function(b){b&&c.put("/devices/"+a,{toggled:!b.toggled}).success(function(a){a&&d.info("toggled: "+a.toggled)})})},a.unregDevice=function(b){c.put("/devices/unregister/"+b).success(function(){for(var c=0,d=0;d<a.items.length;d++)if(a.items[d]._id===b){c=d;break}a.items.splice(c,1),a.searchDevice="",a.updated=!0}).error(function(){a.updated=!1})},a.onInit=function(){e.currentView="Manage Devices",c.get("/users/"+b.get("userId")).success(function(b){var d=b.controllers;d&&d.length>0&&c.get("/controllers/").success(function(b){var e=[],f=0,g=0;for(f=0;f<d.length;f++)for(g=0;g<b.length;g++)if(d[f]===b[g]._id){e.push(b[g]);break}var h=[];for(f=0;f<e.length;f++)for(g=0;g<e[f].devices.length;g++)h.push(e[f].devices[g]);h.length>0&&c.get("/devices").success(function(b){var c=[],d=1;for(f=0;f<h.length;f++)for(g=0;g<b.length;g++)if(h[f]===b[g]._id&&b[g].registered===!0){b[g].deviceNum=d++,c.push(b[g]);break}a.items=c})})})}}]),angular.module("app").controller("CustomizeDeviceCtrl",["$scope","$log","$timeout","$location","$cookies","$http","$rootScope",function(a,b,c,d,e,f,g){a.onInit=function(){g.currentView="Customize Device",g.deviceToUpdate&&(a.deviceName=g.deviceToUpdate.name,a.deviceDescription=g.deviceToUpdate.description,a.deviceLocation=g.deviceToUpdate.location,a.deviceId=g.deviceToUpdate._id),a.deviceAdded=!1},a.returnToDevices=function(){d.path("/mydevices/add")},a.registerDevice=function(){var b="";b+="name="+a.deviceName+"&",b+="description="+a.deviceDescription+"&",b+="location="+a.deviceLocation+"&",b+="registered=true";var e={headers:{"Content-Type":"application/x-www-form-urlencoded"}};f.put("/devices/"+a.deviceId,b,e).success(function(){a.updated=!0,a.deviceAdded=!0,c(function(){d.path("/mydevices/add")},2e3)}).error(function(){a.updated=!1,a.deviceAdded=!1})}}]),angular.module("app").controller("AddDeviceCtrl",["$scope","$location","$cookies","$http","$rootScope",function(a,b,c,d,e){a.sortType="index",a.sortReverse=!1,a.searchDevice="",a.customizeDevice=function(a){d.get("/devices/"+a).success(function(a){e.deviceToUpdate=a,b.path("/mydevices/add/customize")})},a.onInit=function(){e.currentView="Add Devices",d.get("/users/"+c.get("userId")).success(function(b){var c=b.controllers;c.length>0&&d.get("/controllers/").success(function(b){var e=[],f=0,g=0;for(f=0;f<c.length;f++)for(g=0;g<b.length;g++)if(c[f]===b[g]._id){e.push(b[g]);break}var h=[];for(f=0;f<e.length;f++)for(g=0;g<e[f].devices.length;g++)h.push(e[f].devices[g]);h.length>0&&d.get("/devices").success(function(b){var c=[],d=1;for(f=0;f<h.length;f++)for(g=0;g<b.length;g++)if(h[f]===b[g]._id&&b[g].registered===!1){b[g].deviceNum=d++,c.push(b[g]);break}a.items=c})})})}}]),angular.module("app").controller("AccountSettingsCtrl",["$scope","$location","$cookies","$http","$rootScope",function(a,b,c,d,e){a.onInit=function(){e.currentView="Account Settings",d.get("/users/"+c.get("userId")).success(function(b){a.firstName=b.firstName,a.lastName=b.lastName,a.email=b.email,a.street1=b.street1,a.street2=b.street2,a.state=b.state,a.zip=b.zip,a.phone=b.phone,a.password=b.password})},a.returnHome=function(){b.path("/dashboard")},a.updateUser=function(){var b="";b+="firstName="+a.firstName+"&",b+="lastName="+a.lastName+"&",b+="phone="+a.phone+"&",b+="email="+a.email+"&",b+="street1="+a.street1+"&",b+="street2="+a.street2+"&",b+="state="+a.state+"&",b+="zip="+a.zip+"&",b+="country="+a.country+"&",b+="password="+a.password;var f={headers:{"Content-Type":"application/x-www-form-urlencoded"}};d.put("/users/"+c.get("userId"),b,f).success(function(){a.updated=!0,a.submitted=!0,e.firstName=a.firstName,e.email=a.email}).error(function(){a.updated=!1,a.submitted=!1})}}]),angular.module("app").controller("SubscriptionCtrl",["$scope","$rootScope","$http","$cookies","$timeout","$location",function(a,b,c,d,e,f){a.onInit=function(){b.currentView="Manage Subscription"},a.purchase=function(){var g="premium=true",h={headers:{"Content-Type":"application/x-www-form-urlencoded"}};c.put("/users/"+d.get("userId"),g,h).success(function(){a.updated=!0,e(function(){b.premium=!0,f.path("/dashboard")},2e3)}).error(function(){a.updated=!1})},a.cancel=function(){var g="premium=false",h={headers:{"Content-Type":"application/x-www-form-urlencoded"}};c.put("/users/"+d.get("userId"),g,h).success(function(){a.updated=!0,e(function(){b.premium=!1,f.path("/dashboard")},2e3)}).error(function(){a.updated=!1})}}]),angular.module("app").controller("SignInCtrl",["$scope","$location","$cookies","$http","$rootScope",function(a,b,c,d,e){e.homeURL="/",e.currentView="Sign In",e.loggedIn=!1,a.user="",a.valid=!0,a.validateUser=function(){d.get("/users/username/"+a.user.username).success(function(d){d?(e.username=d.email,e.email=d.email,e.firstName=d.firstName,e.premium=d.premium,e.loggedIn=!0,e.homeURL="/dashboard",c.put("userId",d._id),b.path("/dashboard")):a.valid=!1})}}]),angular.module("app").controller("SignUpCtrl",["$scope","$rootScope","$location",function(a,b,c){b.currentView="Sign Up",a.createUser=function(){c.path("/dashboard"),b.loggedIn=!0,b.homeURL="/dashboard"}}]),angular.module("app").run(["$templateCache",function(a){a.put("views/accountsettings.html",'<div class="container-fluid" ng-init="onInit()"> <form role="form" class="form-horizontal" ng-submit="updateUser()"> <div class="form-group"> <label class="col-sm-3 control-label" for="firstName">First name</label> <div class="col-sm-7"> <input type="text" class="form-control" ng-model="firstName" id="firstName" placeholder="Enter first name"> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="lastName">Last name</label> <div class="col-sm-7"> <input type="text" class="form-control" ng-model="lastName" id="lastName" placeholder="Enter last name"> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="email">Email</label> <div class="col-sm-7"> <input type="email" class="form-control" ng-model="email" id="email" placeholder="Enter email address"> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="password">Password</label> <div class="col-sm-7"> <input type="password" class="form-control" ng-model="password" id="password" placeholder="Enter new password"> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="phone">Phone</label> <div class="col-sm-7"> <input type="tel" class="form-control" ng-model="phone" id="phone" placeholder="Enter phone number"> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="street1">Address Line 1</label> <div class="col-sm-7"> <input type="text" class="form-control" ng-model="street1" id="street1" placeholder="Enter street address, P.O. box, C/O"> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="street2">Address Line 2</label> <div class="col-sm-7"> <input type="text" class="form-control" ng-model="street2" id="street2" placeholder="Enter apartment, suite, unit, building, floor, etc"> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="zip">ZIP Code</label> <div class="col-sm-7"> <input type="text" class="form-control" ng-model="zip" id="zip" placeholder="Enter ZIP code"> </div> </div> <div class="form-group"> <div class="col-sm-offset-3 col-sm-7"> <div class="btn-group btn-group-justified"> <div class="btn-group"> <button class="btn btn-default">Update</button> </div> <div class="btn-group"> <button type="button" class="btn btn-default" ng-click="returnHome()">Cancel</button> </div> <div class="btn-group"> <button ng-disabled="submitted !== true" type="button" class="btn btn-default" ng-click="returnHome()">Back</button> </div> </div> </div> </div> <div class="form-group"> <div class="col-sm-offset-3 col-sm-7"> <div class="alert alert-success" ng-show="updated === true"> <strong>Success!</strong> User updated. </div> <div class="alert alert-danger" ng-show="updated === false"> <strong>Failure!</strong> User not updated. </div> </div> </div> </form> </div>'),a.put("views/add-controllers.html",'<div class="container-fluid" ng-init="onInit()"> <div class="row"> <p>The Controller URI is located on the controller itself.</p> </div> <form role="form" ng-submit="addController(controllerURI)"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"><i class="fa fa-search"></i></div> <input type="text" class="form-control" placeholder="Enter controller URI" ng-model="controllerURI"> <span class="input-group-btn"> <button class="btn btn-default">Add Controller</button> </span> </div> </div> <div class="form-group"> <div class="alert alert-success" ng-show="updated !== null && updated === true"> <strong>Success!</strong> Controller registered. Redirecting... </div> <div class="alert alert-danger" ng-show="updated !== null && updated === false"> <strong>Failure!</strong> Controller not registered. </div> </div> </form> </div>'),a.put("views/add-devices.html",'<div class="container-fluid" ng-init="onInit()"> <form> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"><i class="fa fa-search"></i></div> <input type="text" class="form-control" placeholder="Search devices" ng-model="searchDevice"> </div> </div> </form> <table class="table table-bordered table-striped"> <thead> <tr> <th><a href="" ng-click="sortType = \'index\'; sortReverse = !sortReverse"># <span ng-show="sortType == \'index\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'index\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th><a href="" ng-click="sortType = \'name\'; sortReverse = !sortReverse">Name <span ng-show="sortType == \'name\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'name\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th><a href="" ng-click="sortType = \'description\'; sortReverse = !sortReverse">Description <span ng-show="sortType == \'description\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'description\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th><a href="" ng-click="sortType = \'location\'; sortReverse = !sortReverse">Location <span ng-show="sortType == \'location\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'location\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th>Add</th> </tr> </thead> <tbody> <tr ng-repeat="item in items | orderBy:sortType:sortReverse | filter:searchDevice"> <td>{{item.deviceNum}}</td> <td>{{item.name}}</td> <td>{{item.description}}</td> <td>{{item.location}}</td> <td><span class="glyphicon glyphicon-plus" ng-click="customizeDevice(item._id)"></span></td> </tr> </tbody> </table> <div class="alert alert-success" ng-show="updated === true"> <strong>Success!</strong> Device registered. </div> <div class="alert alert-danger" ng-show="updated === false"> <strong>Failure!</strong> Device not registered. </div> </div>'),a.put("views/controllers.html",'<div class="container-fluid" ng-init="onInit()"> <table class="table table-bordered table-striped" ng-show="items !== null"> <thead> <tr> <th><a href="" ng-click="sortType = \'index\'; sortReverse = !sortReverse"># <span ng-show="sortType == \'index\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'index\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th><a href="" ng-click="sortType = \'make\'; sortReverse = !sortReverse">Make <span ng-show="sortType == \'make\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'make\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th><a href="" ng-click="sortType = \'model\'; sortReverse = !sortReverse">Model <span ng-show="sortType == \'model\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'model\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th><a href="" ng-click="sortType = \'version\'; sortReverse = !sortReverse">Version <span ng-show="sortType == \'version\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'version\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th>Remove</th> </tr> </thead> <tbody> <tr ng-repeat="item in items | orderBy:sortType:sortReverse"> <td>{{item.controllerNum}}</td> <td>{{item.make}}</td> <td>{{item.model}}</td> <td>{{item.version}}</td> <td><span class="glyphicon glyphicon-remove" ng-click="removeController(item._id)"></span></td> </tr> </tbody> </table> <div class="alert alert-success" ng-show="updated === true"> <strong>Success!</strong> Controller removed. </div> <div class="alert alert-danger" ng-show="updated === false"> <strong>Failure!</strong> Controller not removed. </div> <div class="alert alert-warning" ng-show="items === null"> <strong>You have no controllers!</strong> Click <a ng-href class="pointer" ng-click="addController()"><strong>here</strong></a> to add a new controller. </div> </div>'),a.put("views/customize-device.html",'<div class="container-fluid" ng-init="onInit()"> <div class="row"> <div class="col-sm-12"> <form role="form" class="form-horizontal" ng-submit="registerDevice()"> <div class="form-group"> <label class="col-sm-3 control-label" for="deviceName">Name</label> <div class="col-sm-9"> <input type="text" class="form-control" ng-model="deviceName" id="deviceName" placeholder="Enter device name"> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="deviceDescription">Description</label> <div class="col-sm-9"> <input type="text" class="form-control" ng-model="deviceDescription" id="deviceDescription" placeholder="Describe the device"> </div> </div> <div class="form-group"> <label class="col-sm-3 control-label" for="deviceLocation">Location</label> <div class="col-sm-9"> <input type="text" class="form-control" ng-model="deviceLocation" id="deviceLocation" placeholder="Enter device location"> </div> </div> <div class="form-group" ng-show="deviceAdded === false"> <div class="col-sm-offset-3 col-sm-9"> <div class="btn-group btn-group-justified"> <div class="btn-group"> <button class="btn btn-default">Add</button> </div> <div class="btn-group"> <button type="button" class="btn btn-default" ng-click="returnToDevices()">Cancel</button> </div> </div> </div> </div> <div class="form-group"> <div class="col-sm-offset-3 col-sm-9"> <div class="alert alert-success" ng-show="updated === true"> <strong>Success!</strong> Device added. Redirecting... </div> <div class="alert alert-danger" ng-show="updated === false"> <strong>Failure!</strong> Device not added. </div> </div> </div> </form> </div> </div> </div>'),a.put("views/dashboard.html",'<div class="container-fluid" ng-init="onInit()"> <div class="row"> <div class="col-sm-4"> <div class="panel panel-default"> <div class="panel-heading text-center"><a ng-href="/mycontrollers/add"><i class="fa fa-plus fa-2x icon align-fa" aria-hidden="true"></i><span class="middle">Add Controllers</span></a></div> <div class="panel-body"><span>Add controllers to your account by URI</span></div> </div> </div> <div class="col-sm-4"> <div class="panel panel-default"> <div class="panel-heading text-center"><a ng-href="/mycontrollers"><i class="fa fa-gamepad fa-2x icon align-fa" aria-hidden="true"></i><span class="middle">View Controllers</span></a></div> <div class="panel-body"><span>Lists the controllers associated to your account</span></div> </div> </div> <div class="col-sm-4"> <div class="panel panel-default"> <div class="panel-heading text-center"><a ng-href="/mydevices/add"><i class="fa fa-plus fa-2x icon align-fa" aria-hidden="true"></i><span class="middle">Add Devices</span></a></div> <div class="panel-body"><span>Add devices before managing them</span></div> </div> </div> </div> <div class="row"> <div class="col-sm-4"> <div class="panel panel-default"> <div class="panel-heading text-center"><a ng-href="/mydevices"><i class="fa fa-list-alt fa-2x icon align-fa" aria-hidden="true"></i><span class="middle">Manage Devices</span></a></div> <div class="panel-body"><span>Toggle or remove devices</span></div> </div> </div> <div class="col-sm-4"> <div class="panel panel-default"> <div class="panel-heading text-center"><a ng-href="/mysubscription"><i class="fa fa-shopping-cart fa-2x icon align-fa" aria-hidden="true"></i><span class="middle">Manage Subscription</span></a></div> <div class="panel-body"><span>Purchase a premium subscription or revert back to a trial version</span></div> </div> </div> <div class="col-sm-4"> <div class="panel panel-default"> <div class="panel-heading text-center"><a ng-href="/myaccountsettings"><i class="fa fa-cogs fa-2x icon align-fa" aria-hidden="true"></i><span class="middle">Account Settings</span></a></div> <div class="panel-body"><span>View and update account information</span></div> </div> </div> </div> </div>'),a.put("views/devices.html",'<div class="container-fluid" ng-init="onInit()"> <form> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"><i class="fa fa-search"></i></div> <input type="text" class="form-control" placeholder="Search devices" ng-model="searchDevice"> </div> </div> </form> <table class="table table-bordered table-striped"> <thead> <tr> <th><a href="" ng-click="sortType = \'index\'; sortReverse = !sortReverse"># <span ng-show="sortType == \'index\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'index\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th><a href="" ng-click="sortType = \'name\'; sortReverse = !sortReverse">Name <span ng-show="sortType == \'name\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'name\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th><a href="" ng-click="sortType = \'description\'; sortReverse = !sortReverse">Description <span ng-show="sortType == \'description\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'description\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th><a href="" ng-click="sortType = \'location\'; sortReverse = !sortReverse">Location <span ng-show="sortType == \'location\' && !sortReverse" class="fa fa-caret-up"></span> <span ng-show="sortType == \'location\' && sortReverse" class="fa fa-caret-down"></span></a></th> <th>On/Off</th> <th>Remove</th> </tr> </thead> <tbody> <tr ng-repeat="item in items | orderBy:sortType:sortReverse | filter:searchDevice"> <td>{{item.deviceNum}}</td> <td>{{item.name}}</td> <td>{{item.description}}</td> <td>{{item.location}}</td> <td> <input type="checkbox" ng-model="item.toggled" ng-checked="item.toggled" ng-change="change(item._id)"> </td> <td><span class="glyphicon glyphicon-remove" ng-click="unregDevice(item._id)"></span></td> </tr> </tbody> </table> <div class="alert alert-success" ng-show="updated === true"> <strong>Success!</strong> Device removed. </div> <div class="alert alert-danger" ng-show="updated === false"> <strong>Failure!</strong> Device not removed. </div> </div>'),a.put("views/signin.html",'<!-- Code source http://codepen.io/colorlib/pen/rxddKy --> <div class="full-height bg-lamp"> <div class="login-page"> <div class="form"> <form class="login-form" ng-submit="validateUser()"> <input type="text" ng-model="user.username" placeholder="Username (email address)" required> <input type="password" ng-model="user.password" placeholder="Password" required> <button type="submit">login</button> <p class="message">Not registered? <a href="/signup">Create an account</a></p> <div class="form-group"> <p class="message"> <a href="/auth/facebook" target="_self"><img src="../images/fb-login.a8721c05.png" class="fb-login"></a> </p> </div> <div class="form-group"> <div class="alert alert-danger" ng-show="!valid"> <strong>Incorrect</strong> username or password. </div> </div> </form> </div> </div> </div>'),a.put("views/signup.html",'<!-- Code source http://codepen.io/colorlib/pen/rxddKy --> <div class="login-page"> <div class="form"> <form class="register-form" ng-submit="createUser()"> <input type="text" ng-model="newFirstName" placeholder="first name" required> <input type="text" ng-model="newLastName" placeholder="last name" required> <input type="password" ng-model="newPassword" placeholder="password" required> <input type="text" ng-model="newEmail" placeholder="email address" required> <button type="submit">create</button> <p class="message">Already registered? <a href="/">Sign In</a></p> </form> </div> </div>'),a.put("views/subscription.html",'<div class="container-fluid" ng-init="onInit()"> <span ng-show="!premium"> <p>Upgrade to a premium subscription to disable ads.</p> <h2>$49.99 / year</h2> <p>Take advantage of this limited offer for an ad-free experience!</p> <p>A. TERMS OF SALE</p> <p>PAYMENTS, TAXES, AND REFUND POLICY</p> <p>You agree that you will pay for all products you purchase through the Services, and that HAMWIP may charge your payment method for any products purchased and for any additional amounts (including any taxes and late fees, as applicable) that may be accrued by or in connection with your Account. YOU ARE RESPONSIBLE FOR THE TIMELY PAYMENT OF ALL FEES AND FOR PROVIDING HAMWIP WITH A VALID PAYMENT METHOD FOR PAYMENT OF ALL FEES.</p> <p>Your total price will include the price of the product plus any applicable tax; such tax is based on the bill-to address and the tax rate in effect at the time you download the product.</p> <p>All sales and rentals of products are final.</p> <p>Prices for products offered via the Services may change at any time, and the Services do not provide price protection or refunds in the event of a price reduction or promotional offering.</p> <p>If a product becomes unavailable following a transaction but prior to download, your sole remedy is a refund. If technical problems prevent or unreasonably delay delivery of your product, your exclusive and sole remedy is either replacement or refund of the price paid, as determined by HAMWIP.</p> <p>By clicking Purchase I agree to the terms and conditions listed above</p> <div class="form-group"> <div class="btn-group"> <button class="btn btn-default" ng-click="purchase()">Purchase Membership</button> </div></div> </span> <span ng-show="premium"><p>We value our customers. If you at any point want to cancel your premium membership, click the button below.</p> <p>HAMWIP will cancel your membership for free<sup>*</sup></p> <p><small><sup>*</sup>A convenience fee of $450 will be added to next month\'s bill</small></p> <div class="form-group"> <div class="btn-group"> <button class="btn btn-default" ng-click="cancel()">Cancel Membership</button> </div></div> </span> <div class="form-group"> <div class="alert alert-success" ng-show="updated === true"> <strong>Success!</strong> Membership updated. Redirecting... </div> <div class="alert alert-danger" ng-show="updated === false"> <strong>Failure!</strong> Membership not updated. </div> </div> </div>')}]);