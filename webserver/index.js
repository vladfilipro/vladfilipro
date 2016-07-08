'use strict';

var express = require( 'express' );

var app = express();

var getParameters = function () {
    var params = {};
    process.argv.forEach( function ( val ) {
        params[ val.split( '=' )[ 0 ].replace( /^\-\-/i, '' ) ] = val.split( '=' )[ 1 ];
    } );

    params.port = params.port || 8080;
    params.static = params.static || __dirname + '/../build';

    return params;
};

var params = getParameters();

// Define static server
app = require( './static' )( app, params.static );

// Define back office server
app = require( './webservice' )( app );

app.listen( params.port, function () {
    console.log( 'Application started...' );
} );
