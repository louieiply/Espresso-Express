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

export const QUERY_PRODUCT= gql`
query getProduct {
    Product {
      _id
      categoryId
      name
      image
      description
      price
    }
}
`

export const QUERY_CATEGORIES= gql`
query getCategories {
    Category {
      _id
      categoryName
      description
    }
}
`