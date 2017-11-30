const {
    graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList
  } = require('graphql');
const _ = require('lodash');


var UserType = new GraphQLObjectType({
	name: 'User',
	description: '...',
	fields: {
		name: {
			type: GraphQLString,
			resolve: (d) => {
				return d.first_name + ' ' + d.last_name
			}
		},
		email: {
			type: GraphQLString
		},
		gender: {
			type: GraphQLString
		},
		ip_address: {
			type: GraphQLString
		}
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
				resolve: (root, args, context) => _.find(context.userData, { "id": args.id })
			},
			users: {
				type: new GraphQLList(UserType),
				resolve: (root, args, context) => context.userData
			}
		}
	})
});

module.exports = schema;