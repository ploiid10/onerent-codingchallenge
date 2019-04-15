import gql from 'graphql-tag';
export const nextquery = gql`query search($filter : String, $first : Int, $after : String, $before : String, $last : Int){
    propertyInfo(first : $first, after: $after, before: $before, last :$last, stringSearch : $filter){
      edges{
        node{
          id
          street
        city
        state
        zip
        rent
        user{
          firstName
          lastName
        }
        }
      }
       pageInfo{
        hasNextPage
        startCursor
        endCursor
      }
    }
  }`;
  
export const prevquery = gql`query search($filter : String, $first : Int, $after : String, $before : String, $last : Int){
    propertyInfo(first : $first, after: $after, before: $before, last :$last, stringSearch : $filter){
      edges{
        node{
        id
        street
        city
        state
        zip
        rent
        user{
          firstName
          lastName
        }
        }
      }
       pageInfo{
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }`;
