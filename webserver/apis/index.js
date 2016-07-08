'use strict';

var fs = require( 'fs' );

module.exports = function () {

    var getIndexFile = function ( file, cb ) {
        fs.readFile( file, 'utf8', cb );
    };

    this.execute = function ( req, cb ) {
        getIndexFile( __dirname + '/../../build/index.html', function ( e, data ) {
            if ( e ) {
                console.log( e );
            }
            cb( data );
        } );
    };

};
