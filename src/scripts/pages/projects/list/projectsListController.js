'use strict';

/**
 * ProjectsList controller
 * @ngInject
 */
module.exports = function projectsListController( $state, $scope, $filter, models ) {
    console.log( 'PAGE->PROJECTS->LIST', '; Params:', $state.params.category );

    var getFilters = function ( data ) {
        var result = {
            'all': {
                label: 'all',
                url: undefined,
                count: data.length
            },
            'concept': {
                label: 'concept',
                url: 'concept',
                count: 0
            },
            'planning': {
                label: 'planning',
                url: 'planning',
                count: 0
            },
            'development': {
                label: 'development',
                url: 'development',
                count: 0
            },
            'released': {
                label: 'released',
                url: 'released',
                count: 0
            },
            'finished': {
                label: 'finished',
                url: 'finished',
                count: 0
            }
        };
        for ( var i = 0; i < data.length; i++ ) {
            if ( result[ data[ i ].status ] ) {
                result[ data[ i ].status ].count++;
            }
        }
        return result;
    };

    var killWatcher = models.get( 'projects' ).get( function ( data ) {
        if ( data.list ) {
            $scope.filters = getFilters( data.list );
            $scope.projects = $filter( 'filter' )( data.list, {
                status: $state.params.category
            } );
        }
    } );

    $scope.$on( '$destroy', function () {
        killWatcher();
    } );
};
