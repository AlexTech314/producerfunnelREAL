import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import UserForm from './components/userForm';

//components


//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App" id="main">
     <h1>Where should we send your beats?</h1>
    </div>
    <UserForm />
    </ApolloProvider>
  );
}

export default App;
