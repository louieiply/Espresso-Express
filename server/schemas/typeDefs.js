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
    quantity: Int
    description: String
    price: Float
  }

  type Checkout {
    session: ID
  }

  type Query {
    users: [User]
    me: User
    getProductByID(productId: ID!): Product
    getProductsByCategory(categoryId: ID!): [Product]
    getCategories: [Category]
    getProducts: [Product]
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
