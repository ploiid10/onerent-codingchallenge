import gql from 'graphql-tag';
const query = gql`query search($filter : String){
    property(stringSearch : $filter) {
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
  }`;  

export default function(props){
   return search(props);
}

let search = async(props) =>{
    const result = await props.client.query({
        query : query,
        variables: { filter : ""}
      });
    var items = [];
    const suggestions = result.data.property;
    for(var i in suggestions){
        items.push(suggestions[i].street);
        if(!items.includes(suggestions[i].rent))
        items.push(suggestions[i].rent);
        if(!items.includes(suggestions[i].state))
        items.push(suggestions[i].state);
        if(!items.includes(suggestions[i].city))
        items.push(suggestions[i].city);
        if(!items.includes(suggestions[i].zip))
        items.push(suggestions[i].zip);
        if(!items.includes(suggestions[i].user.firstName))
        items.push(suggestions[i].user.firstName);
        if(!items.includes(suggestions[i].user.lastName))
        items.push(suggestions[i].user.lastName);
    }
    return items;
}
