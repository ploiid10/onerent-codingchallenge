/* eslint-disable immutable/no-this */
/* eslint-disable immutable/no-mutation */
import React, {Component} from 'react';
import '../css/AutocompleteText.css';
import escapeStringRegexp from 'escape-string-regexp';
import  getitems   from './suggestions';
export default class AutocompleteText extends Component {
    constructor(props){
        super(props)
        this.state = {
            suggestions : [],
            text : '',
            items : ''
        }
    }

    setItems = (value) => {
        getitems(this.props).then((result) => {
         this.setState({ items : result});
         this.viewSuggestions(value);
        });
      }

    viewSuggestions = (value) =>{
        // eslint-disable-next-line immutable/no-let
        let suggestions = [];
        const searchValue = escapeStringRegexp(value);
          const {items} = this.state;
          if(searchValue.length > 0){
              const regex = new RegExp(`^${searchValue}`,'g');
              suggestions = items.sort().filter(v => regex.test(v));
          }
          
         this.setState({suggestions, text : value});
         const { onChangeFilter } = this.props;
         onChangeFilter(String(value));
    }

    onTextChanged = (e) =>{
        const value = e.target.value;
        this.setItems(value);
    }

    selectSuggestion (value){
        this.setState(() => ({
            text : value.item,
            suggestions : [],   
        }));
      const { onChangeFilter } = this.props;
      onChangeFilter(String(value.item));
    }

    showSuggestions(){
         const { suggestions } = this.state;
         if(suggestions.length === 0){
             return null;
         }
         return (
             <ul>
                 {suggestions.map((item,index) => <li key={index} onClick={() => this.selectSuggestion({item})}>{item}</li>)}
             </ul>
         )
    }
    
    render (){
        const { text } = this.state;
        return (
            <div className="autocomplete">
                <input type="text"  value={text}
                     onChange={this.onTextChanged}/>
                     {this.showSuggestions()}
             </div>
        )
    }
}