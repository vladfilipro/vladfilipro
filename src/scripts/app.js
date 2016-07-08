'use strict';

var angular = require( 'angular' );

var app = angular.module( 'app', [
    require( './../views/templates.js' ).name,
    require( './siteframe' ).name
] );

app.run( function ( $log ) {
    $log.log( 'Application start' );
} );

document.addEventListener( 'DOMContentLoaded', function () {
    angular.bootstrap( document, [ 'app' ], {
        strictDi: true
    } );
}, false );
