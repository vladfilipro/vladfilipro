'use strict';

var angular = require( 'angular' );

/**
 * Popup main factory
 * @ngInject
 */
module.exports = function ( $document, $compile, $templateCache, $rootScope ) {
    var templateMarkup = $templateCache.get( 'modules/popup/content.html' );

    function Instances() {
        var list = [];

        function createUniqueId() {
            var currentDate = new Date();
            return currentDate.getTime() + '' + Math.floor( Math.random() * 1000 );
        }

        this.add = function ( element ) {
            var id = createUniqueId();
            list.push( {
                id: id,
                element: element
            } );
            return id;
        };
        this.remove = function ( id ) {
            for ( var i = 0; i < list.length; i++ ) {
                if ( list[ i ].id === id ) {
                    list.splice( i, 1 );
                    return true;
                }
            }
            return false;
        };
        this.get = function ( id ) {
            for ( var i = 0; i < list.length; i++ ) {
                if ( list[ i ].id === id ) {
                    return list[ i ];
                }
            }
        };
        this.getLast = function () {
            return list[ list.length - 1 ];
        };
        this.getList = function () {
            return list;
        };
    }

    var instances = new Instances();

    function Modal( settings ) {
        var config = settings;
        console.log( 'Modal config object: ', config );

        var template = angular.element( templateMarkup );
        var scope = $rootScope.$new();
        var windowElement = $compile( template )( scope );

        var id = instances.add( this );

        var destroy = function () {
            scope.$destroy();
        };

        // Public methods
        scope.close = destroy;

        scope.$on( '$destroy', function () {
            instances.remove( id );
            windowElement.remove();
            console.log( 'window destroyed' );
        } );

        // Modal public methods
        this.open = function () {
            $document.find( 'body' ).append( windowElement );
            return this;
        };
        this.close = function () {
            destroy();
        };
        this.getId = function () {
            return id;
        };
    }

    return {
        create: function ( settings ) {
            return new Modal( settings );
        },
        get: function ( id ) {
            return instances.get( id ).element;
        },
        getLast: function () {
            return instances.getLast().element;
        },
        getList: function () {
            return instances.getList();
        }
    };
};
