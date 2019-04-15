import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './App.css';
import Properties from './components/Properties'
const client = new ApolloClient({
    uri : 'http://localhost:4000/graphql'
});
class App extends Component {

 
  render() {
    return (
      <ApolloProvider client={client}>

         <div className="App">
         
            <Properties></Properties>

         </div>

      </ApolloProvider>
    );
  }
}

export default App;
