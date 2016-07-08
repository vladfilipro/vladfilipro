'use strict';

var angular = require( 'angular' );

module.exports = angular.module( 'request', [] )
    .service( 'request', require( './Request.js' ) );
