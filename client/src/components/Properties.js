import React, {Component,Fragment} from 'react';
import { withApollo } from 'react-apollo';
import AutoComplete from './AutocompleteText';
import Pagination from './Pagination';
import Property from './Property';
import { prevquery, nextquery } from '../queries/searchquery';
export class Properties extends Component{
    constructor(props){
        super(props);
        this.state = {
          filter: '',
          properties :[(
            { node : {
              id : 1,
              street : '',
              state : '',
              city : '',
              zip : '',
              rent : 0,
              user : {
                firstName : '',
                lastName : ''
              }
            }
          })],
          items : '',
        }
        this.paginate = {
           page : 1,
           last : 5,
           first : 5,
          cursor : {
            before : '',
            after : ''
          },
           hasNextPage : true,
           hasPreviousPage : false
        }
      this.selected.bind(this);
      this.pagination = this.pagination.bind(this);
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
                            <button className="btn btn-primary" onClick={() => this._search("")} >Submit</button>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12">
                        <Pagination onPaginate={this.pagination} paginate={this.paginate}></Pagination>
                            </div>
                        </div>
                  {this.state.properties.map(property =>
                <Property key={property.node.id} node={property.node}/>)}
             </div> 
             <button className="btn btn-default"></button>
          </Fragment>
        )
    }

    componentDidMount=()=>{
      this._search("");
    }
    selected = (selected) => {
      this.setState({filter : selected});
    }
    pagination = (page) => {
      this._search(page);
    }

    _search = async(page) => {
      const { filter }  = this.state;
      const { before, after} = this.paginate.cursor;
      const {first, last } = this.paginate; 
      const variables = {filter}; 
      // eslint-disable-next-line immutable/no-let
      let query = "";
      if(page === "Previous" && page !== ""){
          variables.before = before;
          variables.last = last;
          this.paginate.page--;
          query = prevquery;
      }
      if(page === "Next" && page !== ""){
        variables.after = after;
        variables.first = first;
        this.paginate.page++;
        query = nextquery;
      }
      if(page === ""){
        variables.first = first;
        query = nextquery;
      }
     await this.props.client.query({
        query : query,
        variables: variables
      }).then((result)=>{
        const properties = result.data.propertyInfo.edges;
        this.paginate.cursor.after = result.data.propertyInfo.pageInfo.endCursor;
        this.paginate.cursor.before = result.data.propertyInfo.pageInfo.startCursor;
        if(typeof result.data.propertyInfo.pageInfo.hasPreviousPage!== "undefined"){
          this.paginate.hasPreviousPage = result.data.propertyInfo.pageInfo.hasPreviousPage;
          this.paginate.hasNextPage = true;
        }
        if(typeof result.data.propertyInfo.pageInfo.hasNextPage !== "undefined"){
          this.paginate.hasNextPage = result.data.propertyInfo.pageInfo.hasNextPage;
          if(page === ""){
            this.paginate.hasPreviousPage = false;
          }else{
            this.paginate.hasPreviousPage = true;
          }
        }
        this.setState({properties : properties});
      }).catch((err) =>{});
    }
}

export default withApollo(Properties)