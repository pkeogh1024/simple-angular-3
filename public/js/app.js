'use strict'

var app =angular.module ('MyApp', ['ui.router']);

//Configure the 'MyApp' angular application.
app.config([
    //Bring in the dependency objects by name.
    '$stateProvider',

    //Provide a callback function to use one all
    //the dependencies have been loaded.
    function ($stateProvider) {
        //Setup and define out page states.
        $stateProvider
            .state ('home',{
                url: '/',
                // template:'<h2>Home Page</h2>'
                templateUrl: '/templates/home.html',
                controller: 'MyApp.HomeController'
            })
            .state ('about', {
                url: '/about',
                // template: '<h2>About Page</h2>'
                templateUrl: '/templates/about.html'
            })
            .state ('contact',{
                url: '/contact',
                // template: '<h2>Contact Page</h2>'
                templateUrl: '/templates/contact.html'
            })
            .state ('request',{
                url: '/request',
                templateUrl: '/templates/request.html',
                controller: 'MyApp.HttpRequestController'
            })
        ;
    }
]);

app.controller ('MyApp.HomeController',[
    '$scope',

    function ($scope) {
        console.log('The home controller has loaded.');

        $scope.name = 'Bob';
        $scope.age = 32;

        $scope.nameList = ['susan', 'jane', 'larry', 'joe', 'frank'];

        $scope.increaseAge = function() {
            console.log ('Increasing the age.');
            $scope.age = $scope.age+1;
        }
        $scope.addListItem = function() {
            console.log ('Add List Item');
            $scope.nameList.push ('Bob');


        }


    }
]);

app.controller ('MyApp.HttpRequestController',[
    '$scope', '$http',

    function ($scope, $http) {
        console.log ('RequestController')

        $scope.post = {};
        $scope.postList = [];

        $scope.create = function () {
            console.log ('Trying to create a post:', $scope.post)

            $http ({
                url: 'http://localhost:3000/posts',
                method: 'POST',
                data: $scope.post,

            })
            .success (function (response) {
                console.log ('This is the error:', response);
            })
            .error (function (response){
                console.error ('This is the error: ', response);
            })
        }
        $scope.readAll = function () {
            console.log ('Reading all the post');

            $http ({
                url: 'http://localhost:3000/posts',
                method: 'GET',
                data: $scope.post
            })
            .success (function (response) {
                console.log ('This is the response:', response);
                $scope.postList = response;
            })
            .error (function (response){
                console.log ('This is the error: ', response);
            })
        }
        $scope.update = function (){
            console.log ("Updating Posts");
            $http ({
                url: 'http://localhost:3000/posts/' + $scope.post.id,
                method: 'PUT',
                data: $scope.post,

            })
            .success (function (response) {
                console.log ('This is the error:', response);
            })
            .error (function (response){
                console.error ('This is the error: ', response);
            })
        }
        $scope.delete = function (){
            console.log ("Updating Posts");
            $http ({
                url: 'http://localhost:3000/posts/' + $scope.post.id,
                method: 'DELETE',
                data: $scope.post,

            })
            .success (function (response) {
                console.log ('This is the error:', response);
            })
            .error (function (response){
                console.error ('This is the error: ', response);
            })
        }
    }
]);
