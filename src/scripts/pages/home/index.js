'use strict';

var angular = require( 'angular' );
require( 'angular-ui-router' );

module.exports = angular.module( 'HomePage', [
        'ui.router',
        require( './../../searchbox' ).name
    ] )
    .config( require( './routes' ) );
