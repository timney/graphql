var restify = require('restify');
const graphqlHTTP = require('express-graphql');

var schema = require('./schema');
//const userData = require('./MOCK_DATA.json');
const dataClient = require('./data/client')


const server = restify.createServer({
  name: 'at-graphql',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const graphqlConfig = {
    schema: schema,
    graphiql: true,
    context: {
        dataClient: dataClient
    }
};

server.get('/graphql', graphqlHTTP(graphqlConfig));
server.post('/graphql', graphqlHTTP(graphqlConfig));

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});