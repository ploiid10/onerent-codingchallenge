import gql from 'graphql-tag';
const query = gql`query search($filter : String, $first : Int, $after : String, $before : String, $last : Int){
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
export default function(props){
   return search(props);
}

const search = async(props) =>{
    const filter  = "";
    const result = await props.client.query({
        query : query,
        variables: filter 
      });
    var items = [];
    const suggestions = result.data.propertyInfo.edges;
    for(var i in suggestions){
        items.push(suggestions[i].node.street);
        if(!items.includes(suggestions[i].node.rent))
        items.push(suggestions[i].node.rent);
        if(!items.includes(suggestions[i].node.state))
        items.push(suggestions[i].node.state);
        if(!items.includes(suggestions[i].node.city))
        items.push(suggestions[i].node.city);
        if(!items.includes(suggestions[i].node.zip))
        items.push(suggestions[i].node.zip);
        if(!items.includes(suggestions[i].node.user.firstName))
        items.push(suggestions[i].node.user.firstName);
        if(!items.includes(suggestions[i].node.user.lastName))
        items.push(suggestions[i].node.user.lastName);
    }
    return items;
}

