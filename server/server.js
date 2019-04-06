const express = require('express');
const graphqlUI = require('express-graphql');
const config = require('./config/config');
const schema = require('./schema');
const cors = require('cors');
const app = express();
app.use(cors());
app.use('/graphql',graphqlUI({
    schema,
    graphiql : true
}));
app.listen(config.port, () => console.log(`Server running on port ${config.port}`));