import React, {Component,Fragment} from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import Properties from './Properties';
import AutoComplete from './AutocompleteText';
import Pagination from './Pagination';
export class Property extends Component{
    constructor(props){
        super(props);
        this.state = {
          filter: '',
          properties : [],
          items : '',
       
        }
        this.paginate = {
          offset : 0,
          limit : 5,
          length : 0,
        }
       this._search();
      }
    render(){
        return(
            <Fragment>
            <div className="container">
                        <div className="row mt-4">
                           <div className="col-md-4">
                           <AutoComplete onChangeFilter={this.selected} client={this.props.client}/>
                        </div>
                            <div className="col-md-1 ml-2 mt-1">
                            <button className="btn btn-primary" onClick={() => this._search()} >Submit</button>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12">
                         <Pagination paginate={this.paginate} onPaginate = {this.pagination}></Pagination>
                            </div>
                        </div>
                  { this.state.properties.map(property => <Properties key={property.street} property={property}/>)} 
             </div>
             <button className="btn btn-default"></button>
          </Fragment>
        )
    }

    selected = (selected) => {
      this.selected.bind(this);
      this.setState({ filter : selected});
    }
    pagination=(entries) => {
      this.pagination.bind(this);
      const {offset} = this.paginate;
      const newoffset = offset+entries > 0 ? offset+entries : 0;
      console.log(newoffset);
      this.paginate.offset = newoffset;
      this.paginate.limit = 5;
      this._search();
     
    }
    _search = async() => {
      const { filter }  = this.state;
      const { offset,limit} = this.paginate;
      const result = await this.props.client.query({
        query : query,
        variables: {filter, offset, limit : limit+1} 
      });
      this.paginate.length = result.data.property.length;
      result.data.property.splice(5,5);
      const properties = result.data.property;
      this.setState({properties : properties});
    }
}
const query = gql`query search($filter : String, $offset : Int, $limit : Int){
  property(stringSearch : $filter, limit: $limit, offset : $offset) {
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