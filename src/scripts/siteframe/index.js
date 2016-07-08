'use strict';

var angular = require( 'angular' );
require( 'angular-ui-router' );

module.exports = angular.module( 'siteframe', [
        'ui.router',
        require( './../header' ).name,
        require( './../pages' ).name,
        require( './../footer' ).name
    ] )
    .controller( require( './siteframeController' ) )
    .config( require( './routes' ) );
