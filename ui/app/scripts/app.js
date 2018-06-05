'use strict';

var envr = {};

if(window){
  Object.assign(envr, window.__envr);
}

var app = angular
  .module('internalApp', [
    'ngAnimate',
    'ui.router',
    'ngMaterial',
  ]);

app.constant('__envr', envr);
