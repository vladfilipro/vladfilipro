'use strict';

var angular = require( 'angular' );

module.exports = angular.module( 'pages', [
    require( './home' ).name,
    require( './projects' ).name
] );
