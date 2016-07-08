'use strict';

/**
 * Default routes script
 * @ngInject
 */
module.exports = function routes( $stateProvider, $urlRouterProvider ) {

    $stateProvider
        .state( 'root.projects', {
            abstract: true,
            templateUrl: 'pages/projects/content.html',
            controller: require( './projectsPageController' )
        } )
        .state( 'root.projects.list', {
            url: '/projects/{category}',
            templateUrl: 'pages/projects/list/projectsList.html',
            controller: require( './list/projectsListController' )
        } )
        .state( 'root.projects.details', {
            url: '/project/{project}',
            templateUrl: 'pages/projects/details/projectsDetails.html',
            controller: require( './details/projectsDetailsController' )
        } );

    $urlRouterProvider.when( '/projects', '/projects/' );
    $urlRouterProvider.when( '/projects/details', '/projects/details/' );

};
