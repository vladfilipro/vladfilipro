'use strict';

var gulp = require( 'gulp' );
var runSequence = require( 'run-sequence' );
var server = require( './webserver' )();

gulp.task( 'clearCache', function ( callback ) {
    var regex = new RegExp( '^' + __dirname + '/node_modules', 'i' );
    for ( var prop in require.cache ) {
        if ( require.cache.hasOwnProperty( prop ) ) {
            if ( !regex.test( prop ) ) {
                console.log( 'Clearing cache on', prop );
                delete require.cache[ prop ];
            }
        }
    }
    callback();
} );

gulp.task( 'build', function ( callback ) {
    runSequence( 'clean-build', [ 'copy-index', 'styles', 'js', 'copy-api', 'copy-images' ], callback );
} );

gulp.task( 'start-server', [ 'clearCache' ], function ( callback ) {
    console.log( 'Stopping server...' );
    server.stop( function () {
        console.log( 'Starting server...' );
        server.start( 8000, function () {
            callback();
        } );
    } );
} );

gulp.task( 'test', function ( callback ) {
    runSequence( 'build', 'start-server', 'watcher', function () {
        console.log( 'Listening...' );
        callback();
    } );
} );

module.exports = {
    rigs: [ 'rig-javascript', 'rig-sass', 'rig-angular', 'rig-font-awesome' ],
    commands: {
        'init': {
            taskname: 'rig-javascript__install-rig',
            path: './'
        },
        'lint-jscs': {
            taskname: 'rig-javascript__jscs',
            src: [ './webserver/**/*.js', './src/scripts/**/*.js' ]
        },
        'lint-jshint': {
            taskname: 'rig-javascript__jshint',
            src: [ './webserver/**/*.js', './src/scripts/**/*.js' ]
        },
        'clean-build': {
            taskname: 'core__clean',
            path: './build'
        },
        'copy-index': {
            taskname: 'core__copy',
            src: './src/index.html',
            dest: './build'
        },
        'copy-api': {
            taskname: 'core__copy',
            src: './src/api/**/*',
            dest: './build/api'
        },
        'copy-images': {
            taskname: 'core__copy',
            src: './src/img/**/*',
            dest: './build/img'
        },
        'font-awesome': {
            taskname: 'rig-font-awesome__font-awesome',
            fontsDest: './build/fonts/font-awesome',
            scssDest: './src/styles/font-awesome'
        },
        'styles': {
            taskname: 'rig-sass__sass',
            dependency: [ 'font-awesome' ],
            sourcemap: true,
            minify: true,
            src: './src/styles/main.scss',
            dest: './build/styles'
        },
        'views': {
            taskname: 'rig-angular__templatecache',
            src: './src/views/**/*.html',
            dest: './src/views',
            filename: 'templates.js',
            options: {
                module: require( './package' ).name + '-templates',
                standalone: true,
                moduleSystem: 'Browserify'
            }
        },
        'js': {
            taskname: 'rig-javascript__browserify',
            dependency: [ 'lint-jscs', 'lint-jshint', 'views' ],
            src: './src/scripts/app.js',
            output: 'app.js',
            sourcemap: true,
            dest: './build/scripts',
            debug: true,
            minify: true
        },
        'watcher': {
            taskname: 'core__watch',
            watchers: [ {
                src: [ './webserver/**/*' ],
                tasks: [ 'start-server' ]
            }, {
                src: [ './src/scripts/**/*' ],
                tasks: [ 'js' ]
            }, {
                src: [ './src/styles/**/*.scss' ],
                tasks: [ 'styles' ]
            }, {
                src: [ './src/index.html' ],
                tasks: [ 'copy-index' ]
            }, {
                src: [ './src/api/**/*' ],
                tasks: [ 'copy-api' ]
            }, {
                src: [ './src/img/**/*' ],
                tasks: [ 'copy-images' ]
            } ]
        }
    }
};
