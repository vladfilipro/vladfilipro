'use strict';

var angular = require( 'angular' );

module.exports = angular.module( 'logo', [] )
    .directive( 'logo', require( './logoDirective' ) );
