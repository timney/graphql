var restify = require('restify');
const graphqlHTTP = require('express-graphql');
var schema = require('./schema');
const userData = require('./MOCK_DATA.json');

const server = restify.createServer({
  name: 'at-graphql',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: {
        userData: userData
    }
  }));

  server.post('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: false,
    context: {
        userData: userData
    }
  }));

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});