'use strict';

/**
 * Default routes script
 * @ngInject
 */
module.exports = function routes( $stateProvider ) {

    $stateProvider
        .state( 'root.home', {
            url: '/',
            templateUrl: 'pages/home/content.html',
            controller: require( './homePageController' )
        } );

};
