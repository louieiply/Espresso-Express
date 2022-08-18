const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    isAdmin: Boolean
  }
 
  type Auth {
    token: ID!
    user: User
  }

  type Category {
    _id: ID
    categoryName: String!
    description: String
  }
  
  type Product {
    _id: ID
    categoryId: ID
    name: String
    image: String
    description: String
    price: Int
  }

  type Query {
    users: [User]
    me: User
    getProduct(productId: ID!): Product
    getProductsByategory(categoryId: ID!): [Product]
    getCategories: [Category]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
