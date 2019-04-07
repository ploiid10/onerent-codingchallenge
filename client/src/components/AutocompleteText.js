import React, {Component} from 'react';
import '../css/AutocompleteText.css';
import escapeStringRegexp from 'escape-string-regexp';
export default class AutocompleteText extends Component {
    constructor(props){
        super(props)
        this.state = {
            suggestions : [],
            filter : '',
            text : ''
        }
    }
    
    onTextChanged = (e) =>{
        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        let searchValue = escapeStringRegexp(value);
        if(searchValue.length > 0){
            const regex = new RegExp(`^${searchValue}`,'g');
            suggestions = items.sort().filter(v => regex.test(v)).splice(0,10);
        }
        this.setState(() => ({suggestions, text : value}));
        const { onChangeFilter } = this.props;
        onChangeFilter(value);
    }

    selectSuggestion (value){
        this.setState(() => ({
            text : value.item,
            filter : value.item,
            suggestions : [],   
        }));
      const { onChangeFilter } = this.props;
      onChangeFilter(value.item);
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