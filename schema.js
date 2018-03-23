const {
    graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
  } = require('graphql');
const _ = require('lodash');
const Guid = require('guid')


var UserType = new GraphQLObjectType({
	name: 'User',
	description: '...',
	fields: {
		id: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString,
		},
		age: {
			type: GraphQLInt
		},
	}
})

var schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'root',
		fields: {
			user: {
				type: UserType,
				args: {
					id: { type: GraphQLInt }
				},
				resolve: (root, args, context) => context.dataClient.getById(args.id).then(d => d.Item)
			},
			users: {
				type: new GraphQLList(UserType),
				resolve: (root, args, context) => context.dataClient.getAll().then(d => d.Items)
			}
		}
	}),
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		fields: {
		  addUser: {
			type: UserType,
			args: {
			  name: {
				type: GraphQLString				
			  },
			  age: {
				  type: GraphQLInt
			  }
			},
			resolve: (root, {name, age}, context, fieldASTs) => {
				const id = Guid.raw()
				return context.dataClient.put({ name, age, id })
					.then(d => ({id, name, age}))
					.catch(e => e)
			}
		  }
		}
	})
});

module.exports = schema;