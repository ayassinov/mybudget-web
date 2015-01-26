var mybudgetApp = angular.module("mybudget", [
    "ngRoute",
    "ngSanitize",
    "myBudgetControllers"
]);

var myBudgetControllers = angular.module("myBudgetControllers", []);

mybudgetApp.run([function () {
    console.log("HEY we're ok!")
}]);

mybudgetApp.config(["$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix("!");

        $routeProvider
            .when("/category", {
                templateUrl: "/public/view/category.html",
                controller: "CategoryController"
            });
    }]);

myBudgetControllers.controller("CategoryController", ["$scope", function ($scope) {
    $scope.categories = [];
    $scope.newCategory = '';


    $scope.addCategory = function () {
        var newCategory = $scope.newCategory.trim();
        if (!newCategory.length) {
            return;
        }

        $scope.categories.push(newCategory);

        $scope.newCategory = '';
    };
}]);

