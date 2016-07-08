'use strict';

/**
 * ProjectsPage main controller
 * @ngInject
 */
module.exports = function projectsPageController( models ) {
    console.log( 'PAGE->PROJECTS' );

    var data = models.get( 'projects' );
    data.set( '/api/projects.json' );
};
