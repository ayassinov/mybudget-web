var mybudgetApp=angular.module("mybudget",["ngRoute","ngSanitize","myBudgetControllers"]),myBudgetControllers=angular.module("myBudgetControllers",[]);mybudgetApp.run([function(){console.log("HEY we're ok!")}]),mybudgetApp.config(["$routeProvider","$locationProvider",function(e,o){o.html5Mode(!0),o.hashPrefix("!"),e.when("/category",{templateUrl:"/public/view/category.html",controller:"CategoryController"})}]),myBudgetControllers.controller("CategoryController",["$scope",function(e){e.categories=[],e.newCategory="",e.addCategory=function(){var o=e.newCategory.trim();o.length&&(e.categories.push(o),e.newCategory="")}}]);