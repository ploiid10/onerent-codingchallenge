const express = require('express');
const graphqlUI = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const app = express();
app.use(cors());
const port =    process.env.PORT || 4000;
app.use('/graphql',graphqlUI({
    schema,
    graphiql : true
}));
app.listen(port, () => console.log(`Server running on port ${port}`));