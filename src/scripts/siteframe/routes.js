'use strict';

/**
 * Default routes script
 * @ngInject
 */
module.exports = function routes( $stateProvider, $locationProvider, $urlRouterProvider ) {

    $locationProvider
        .html5Mode( true );

    $stateProvider
        .state( 'root', {
            abstract: true,
            templateUrl: 'siteframe/siteframe.html',
            controller: require( './siteframeController' )
        } );

    $urlRouterProvider.otherwise( '/404' );

};
