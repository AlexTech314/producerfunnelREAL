const graphql = require('graphql');
const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLBoolean, 
    GraphQLID, 
    GraphQLList } = graphql;

const User = require('../models/User');

//dummy data


// var testUsers = [
//     {id: 1, 
//     firstname: "beat", 
//     lastname: "lover", 
//     email: "garbanzoes@nachomachose.clams",
//     sold: false},

//     {id: 2, 
//     firstname: "pussy", 
//     lastname: "ass", 
//     email: "poononthemoon@yahoo.com",
//     sold: false},

//     {id: 3, 
//     firstname: "yim", 
//     lastname: "yam", 
//     email: "jackbrown@school.class",
//     sold: true}

// ];

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {type: GraphQLID},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString},
        sold: {type: GraphQLBoolean}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        allUsers: {
            type: new GraphQLList(UserType),
            resolve() {
                let users = [];
                async function iterateThroughAllUsers() {
                    for (i=0; i < testUsers.length; i++) {
                        users.push(testUsers[i]);
                    }

                    console.log(users);
                    return users;
                }

                console.log("in users resolve");
                return iterateThroughAllUsers();
                }
            },

            user: {
                type: UserType,
                args: {id: {type: GraphQLID} },
                resolve(parent, args) {
                    async function searchTestUsers(args) {
                        for (i=0; i < testUsers.length; i++) {
                            if (testUsers[i].id == args.id) {
                                console.log("inside if");
                                console.log(testUsers[i]);
                                return testUsers[i];
                            }
                        }
                   }
                    //code to get data from db/ other source
                    console.log(args.id);
                   console.log(searchTestUsers(args));
                   return searchTestUsers(args);
                 
                },
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstname: { type: GraphQLString},
                lastname: { type: GraphQLString},
                email: { type: GraphQLString},
            },

            resolve(parents, args) {
                console.log(args);
                console.log("in mutation resolve");
                let user = new User({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    sold: false,
                });

                return user.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
