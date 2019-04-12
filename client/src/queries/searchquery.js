import gql from 'graphql-tag';
export const nextquery = gql`query search($filter : String, $first : Int, $after : String, $before : String, $last : Int){
    propertyInfo(first : $first, after: $after, before: $before, last :$last, stringSearch : $filter){
      edges{
        node{
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
        cursor
      }
       pageInfo{
        hasNextPage
      }
    }
  }`;
export const prevquery = gql`query search($filter : String, $first : Int, $after : String, $before : String, $last : Int){
    propertyInfo(first : $first, after: $after, before: $before, last :$last, stringSearch : $filter){
      edges{
        node{
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
        cursor
      }
       pageInfo{
        hasPreviousPage
      }
    }
  }`;
