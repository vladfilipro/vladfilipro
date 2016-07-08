'use strict';

var express = require( 'express' );
var compression = require( 'compression' );

module.exports = function ( app ) {
    var router = express.Router();

    router.use( compression() );
    router.use( function ( req, res ) {
        res.send( '{}' );
    } );

    app.use( '/api', router );

    return app;

};
