'use strict';

var Apigeon = require( 'apigeon' );

module.exports = function () {
    var regexFile = new RegExp( '^\/(.*)$', 'i' );

    // Define server
    var apigeon = new Apigeon( {
        paths: {
            routes: __dirname + '/routes'
        },
        rewrite: function ( url ) {
            var results;
            results = url.match( regexFile );
            if ( results && results[ 1 ] ) {
                return '/file?path=' + encodeURIComponent( results[ 1 ] );
            }
            return url;
        }
    } );

    // Add middlewares
    apigeon.attach( apigeon.middlewares.session() );
    apigeon.attach( apigeon.middlewares.logs() );
    apigeon.enableREST();

    return apigeon;
};
