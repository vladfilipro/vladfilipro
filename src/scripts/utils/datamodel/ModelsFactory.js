'use strict';

module.exports = /* @ngInject */ function ModelsFactory( datamodel ) {
    var instances = {};

    var get = function ( name ) {
        if ( !instances[ name ] ) {
            var newModel = datamodel;
            instances[ name ] = newModel;
            return newModel;
        }
        return instances[ name ];
    };

    return {
        get: get
    };
};
