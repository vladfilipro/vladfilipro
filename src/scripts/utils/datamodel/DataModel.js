'use strict';

var angular = require( 'angular' );

module.exports = /* @ngInject */ function DataModel( request, $q ) {
    var data = {};
    var url = false;
    var watchers = {};

    var reload = function ( requestConfig ) {
        var deferred = $q.defer();
        if ( url ) {
            request.get( url, requestConfig ).then( function ( result ) {
                angular.extend( data, result.data );
                deferred.resolve( data );
            }, function () {
                deferred.reject( data );
            } );
        } else {
            deferred.resolve( data );
        }
        return deferred.promise;
    };

    var publish = function ( newData ) {
        for ( var cb in watchers ) {
            if ( watchers.hasOwnProperty( cb ) ) {
                watchers[ cb ]( newData );
            }
        }
    };

    var set = function ( newData ) {
        if ( typeof newData === 'object' ) {
            angular.extend( data, newData );
            publish( data );
        } else {
            url = newData;
        }
    };

    this.set = function ( newData ) {
        set( newData );
        reload().then( function ( data ) {
            publish( data );
        } );
    };

    this.reload = reload;

    this.get = function ( cb ) {
        var id = JSON.stringify( cb );
        watchers[ id ] = cb;
        cb( data );
        return function () {
            delete watchers[ id ];
        };
    };

};
