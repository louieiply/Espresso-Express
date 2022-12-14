import { gql } from '@apollo/client';

export const QUERY_ME= gql`
query Me {
  me {
    _id
    username
    email
  }
}
`

export const QUERY_PRODUCT_BY_ID = gql`
query GetProductByID($productId: ID!) {
  getProductByID(productId: $productId) {
      _id
      categoryId
      quantity
      name
      image
      description
      price
    }
}
`
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_CATEGORIES= gql`
query GetCategories {
  getCategories {
    _id
    categoryName
    description
  }
}
`

export const QUERY_PRODUCTS= gql`
query GetProducts {
  getProducts {
    _id
      categoryId
      quantity
      name
      image
      description
      price
  }
}
`

export const QUERY_PRODUCTS_BY_CATEGORY=gql`
query GetProductsByCategory($categoryId: ID!) {
  getProductsByCategory(categoryId: $categoryId) {
    _id
    categoryId
    quantity
    name
    image
    description
    price
  }
}



`
export const QUERY_CATEGORYID= gql`
query GetCategoryId {
  GetCategoryId{
    _id
    categoryName
    description
  }
}
`