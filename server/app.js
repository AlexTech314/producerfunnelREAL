const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./Schema/schema');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

// mongo setup
const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("successfully established connection to MongoDB");
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening for requests on port 4000');
});