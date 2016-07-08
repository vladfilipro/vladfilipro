'use strict';

var gulp = require( 'gulp' );
var runSequence = require( 'run-sequence' );
var server = require( './webserver' )();

gulp.task( 'build', function ( callback ) {
    runSequence( 'clean-build',
        'copy-index',
        'copy-img',
        'font-awesome',
        'styles',
        'compile',
        callback );
} );

gulp.task( 'webserver', function ( callback ) {
    server.stop( function () {
        server.start( callback );
    } );
} );

gulp.task( 'test', function ( callback ) {
    runSequence( 'build',
        'api',
        'watch',
        'webserver',
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
        }
    }
};
