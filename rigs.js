'use strict';

var gulp = require( 'gulp' );
var runSequence = require( 'run-sequence' );
var fs = require( 'fs' );
var url = require( 'url' );

gulp.task( 'build', function ( callback ) {
    runSequence( 'clean-build',
        'copy-index',
        'copy-img',
        'font-awesome',
        'styles',
        'compile',
        callback );
} );

gulp.task( 'test', function ( callback ) {
    runSequence( 'build',
        'api',
        'webserver',
        'watch',
        callback );
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
            src: [ './spec/**/*.js', './src/scripts/**/*.js' ]
        },
        'lint-jshint': {
            taskname: 'rig-javascript__jshint',
            src: [ './spec/**/*.js', './src/scripts/**/*.js' ]
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
        'api': {
            taskname: 'core__copy',
            src: './src/api/**/*',
            dest: './build/api'
        },
        'copy-img': {
            taskname: 'core__copy',
            src: './src/img/**/*',
            dest: './build/img'
        },
        'font-awesome': {
            taskname: 'rig-font-awesome__font-awesome',
            fontsDest: './build/fonts/font-awesome',
            scssDest: './src/styles/font-awesome'
        },
        'compile': {
            taskname: 'rig-javascript__browserify',
            dependency: [ 'lint-jscs', 'lint-jshint', 'views' ],
            src: './src/scripts/app.js',
            output: 'app.js',
            sourcemap: true,
            dest: './build/scripts',
            debug: false,
            minify: true,
            transform: [ 'browserify-ngannotate' ]
        },
        'styles': {
            taskname: 'rig-sass__sass',
            sourcemap: true,
            minify: true,
            src: './src/styles/main.scss',
            dest: './build/styles'
        },
        'views': {
            taskname: 'rig-angular__templatecache',
            dependency: [],
            src: './src/views/**/*.html',
            dest: './src/views',
            filename: 'templates.js',
            options: {
                module: require( './package' ).name + '-templates',
                standalone: true,
                moduleSystem: 'Browserify'
            }
        },
        'watch': {
            taskname: 'core__watch',
            watchers: [ {
                src: './src/index.html',
                tasks: [ 'copy-index' ]
            }, {
                src: [ './src/scripts/**/*.js', './src/views/**/*.html' ],
                tasks: [ 'compile' ]
            }, {
                src: './src/api/**/*',
                tasks: [ 'api' ]
            }, {
                src: './src/img/**/*',
                tasks: [ 'copy-img' ]
            }, {
                src: './src/styles/**/*',
                tasks: [ 'styles' ]
            } ]
        },
        'webserver': {
            taskname: 'core__browser-sync',
            options: {
                files: [ './build/**/*' ],
                watchOptions: {
                    debounceDelay: 1000
                },
                server: {
                    baseDir: './build',
                    index: 'index.html',
                    middleware: [

                        // ModRewrite clone
                        function ( req, res, next ) {
                            var oUrl = url.parse( req.url );

                            // Check if physical file
                            if ( !fs.existsSync( './build/' + oUrl.pathname ) ) {

                                // Check if part of browserSync
                                if ( oUrl.pathname.indexOf( 'browser-sync' ) === -1 ) {
                                    console.log( 'Url: ' + req.url + ' not found, redirected' );
                                    req.url = '/' + 'index.html';
                                }
                            }
                            next();
                        }
                    ]
                },
                port: 8000,
                https: false,
                notify: true,
                ghostMode: false,
                open: false
            }
        }
    }
};
