'use strict';

var compression = require( 'compression' );
var express = require( 'express' );

var fs = require( 'fs' );

module.exports = function ( app, rootFolder ) {
    var configStatic = {
        dotfiles: 'ignore', //Option for serving dotfiles. Possible values are “allow”, “deny”, and “ignore”	String	“ignore”
        etag: false, //Enable or disable etag generation	Boolean	true
        extensions: false, //Sets file extension fallbacks.	Boolean	false
        index: 'index.html', //Sends directory index file. Set false to disable directory indexing.	Mixed	“index.html”
        lastModified: true, //Set the Last-Modified header to the last modified date of the file on the OS. Possible values are true or false.	Boolean	true
        maxAge: 0, //Set the max-age property of the Cache-Control header in milliseconds or a string in ms format	Number	0
        redirect: true, //Redirect to trailing “/” when the pathname is a directory.	Boolean	true
        setHeaders: function ( res ) {
            res.setHeader( 'X-Powered-By', 'Vlad Filip' );
        }
    };

    var router = express.Router();

    router.use( compression() );
    router.use( express.static( rootFolder, configStatic ) );
    router.use( function ( req, res ) {

        //Fallback for errors ( mod_rewrite )
        res.send( fs.readFileSync( rootFolder + '/' + configStatic.index, 'utf-8' ) );
    } );

    app.use( '/', router );

    return app;
};
