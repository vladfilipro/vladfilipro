'use strict';

var angular = require( 'angular' );

module.exports = angular.module( 'footer', [] )
    .directive( 'footer', require( './footerDirective' ) );
