'use strict';

var libraryApp = angular.module('libraryApp',[]);

libraryApp.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});

libraryApp.controller('BooksCtrl',function($scope, $http){
  $http.get('/assets/data/books.json').success(function(data){
    $scope.books=data;
  });
});

