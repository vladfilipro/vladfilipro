'use strict';

var angular = require( 'angular' );
require( 'angular-ui-router' );

module.exports = angular.module( 'ProjectsPage', [
        'ui.router',
        require( './../../utils/datamodel' ).name,
        require( './../../searchbox' ).name
    ] )
    .directive( 'projectBlock', require( './projectBlockDirective' ) )
    .config( require( './routes' ) );
