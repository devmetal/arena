import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';

import './style/reset.css';

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

const Root = () => (
  // eslint-disable-next-line
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// eslint-disable-next-line
ReactDOM.render(<Root />, document.querySelector('#target'));
