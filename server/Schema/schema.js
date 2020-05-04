const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;


//dummy data


var testUsers = [
    {id: 1, 
    firstname: "beat", 
    lastname: "lover", 
    email: "garbanzoes@nachomachose.clams",
    sold: false},

    {id: 2, 
    firstname: "pussy", 
    lastname: "ass", 
    email: "poononthemoon@yahoo.com",
    sold: false},

    {id: 3, 
    firstname: "yim", 
    lastname: "yam", 
    email: "jackbrown@school.class",
    sold: true}

];

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {type: GraphQLString},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString},
        sold: {type: GraphQLBoolean}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString} },


            
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

               // console.log("not rlly sure how this works", element);
            
              //   console.log(_.find(testUsers, {id: args.id}));
             // return _.find(testUsers, {id: args.id});
               return searchTestUsers(args);
             
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
