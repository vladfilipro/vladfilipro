'use strict';

module.exports = /* @ngInject */ function ( $timeout ) {

    var fLink = function ( scope, e ) {

        var show = function () {
            $timeout( function () {
                e.css( 'opacity', '1' );
            } );
        };

        var preload = function ( src ) {
            var image = new Image();
            image.onload = image.onerror = function () {
                show();
            };
            image.src = src;
        };

        scope.$watch( 'project', function ( data ) {
            if ( data.image ) {
                preload( data.image );
            } else {
                show();
            }
        } );
    };

    return {
        restrict: 'E',
        scope: {
            project: '='
        },
        templateUrl: 'pages/projects/projectBlock.html',
        link: fLink
    };
};
