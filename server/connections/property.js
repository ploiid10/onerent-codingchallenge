const Property  = require('../typedefs/property');
const {connectionDefinitions, connectionFromPromisedArray, connectionArgs} = require('graphql-relay');

const {connectionType: ProperyConnection} = connectionDefinitions({
    nodeType : Property
});

module.exports =ProperyConnection;