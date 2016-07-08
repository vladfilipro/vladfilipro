'use strict';

var Apigeon = require( 'apigeon' );
var http = require( 'http' );
var express = require( 'express' );

module.exports = function () {

    var app = express();

    // Define server
    var server = http.createServer( app );
    var apigeon = new Apigeon( app, server, {
        apis: __dirname + '/apis'
    } );

    // Add middlewares
    app.use( require( 'compression' )() );

    app.use( apigeon.rest() );

    return {
        start: function ( done ) {
            server.listen( '8000', function () {
                console.log( 'Application started...' );
                done();
            } );
        },
        stop: function ( done ) {
            if ( server.listening ) {
                server.close( done );
            } else {
                done();
            }
        }
    };

};
