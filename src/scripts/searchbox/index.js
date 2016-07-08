'use strict';

var angular = require( 'angular' );

module.exports = angular.module( 'searchbox', [] )
    .directive( 'searchbox', require( './searchboxDirective' ) );
