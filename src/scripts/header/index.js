'use strict';

var angular = require( 'angular' );

module.exports = angular.module( 'header', [] )
    .directive( 'header', require( './headerDirective' ) );
