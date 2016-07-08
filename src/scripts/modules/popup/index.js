'use strict';

var angular = require( 'angular' );

module.exports = angular.module( 'popup', [] )
    .factory( 'popup', require( './popupFactory' ) );
