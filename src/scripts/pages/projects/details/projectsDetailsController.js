'use strict';

/**
 * ProjectsDetails controller
 * @ngInject
 */
module.exports = function projectsDetailsController( $state ) {
    console.log( 'PAGE->PROJECTS->DETAILS', '; Params:', $state.params.project );
};
