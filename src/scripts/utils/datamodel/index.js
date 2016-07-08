'use strict';

var angular = require( 'angular' );

module.exports = angular.module( 'datamodel', [
        require( './../request' ).name
    ] )
    .service( 'datamodel', require( './DataModel.js' ) )
    .factory( 'models', require( './ModelsFactory.js' ) );
