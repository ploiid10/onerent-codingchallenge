import React, {Component,Fragment} from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import Properties from './Properties';
import AutoComplete from './AutocompleteText';
import  items   from './suggestions';

export class Property extends Component{
    constructor(props){
        super(props);
        this.state = {
          filter: '',
          properties : [],
          items : ''
        }
       this.setItems(); 
       this._search();
      }
    render(){
        return(
            <Fragment>
            <div className="container">
                        <div className="row mt-4">
                           <div className="col-md-4">
                           <AutoComplete onChangeFilter={this.selected} items={this.state.items} />
                        </div>
                            <div className="col-md-1 ml-2 mt-1">
                            <button className="btn btn-primary" onClick={() => this._search()} >Submit</button>
                            </div>
                        </div>
                  { this.state.properties.map(properties => <Properties key={properties.street} property={properties}/>)} 
             </div>
          </Fragment>
        )
    }
   selected = this.selected.bind(this);
    selected(selected) {
     this.setState( { filter : selected});
    }
    setItems = () => {
      items(this.props).then((result) => {
        this.setState({ items : result});
      });
    }
    _search = async() => {
      const { filter }  = this.state;
      const result = await this.props.client.query({
        query : query,
        variables: { filter }
      });
      const properties = result.data.property;
      this.setState({properties : properties});
    }
}
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
export default withApollo(Property)