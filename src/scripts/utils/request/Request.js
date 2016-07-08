'use strict';

var angular = require( 'angular' );

/**
 * Request factory
 * @ngInject
 */
module.exports = function Request( $http ) {

    var defaultConfig = {
        cache: true
    };

    this.get = function ( url, config ) {
        return $http.get( url, angular.merge( {}, defaultConfig, config ) );
    };
};
