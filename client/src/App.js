import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Container from 'react-bootstrap/Container';

import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/Notfound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Product from './pages/Product';
import Header from './components/Header';
import Success from './pages/Success';
import { StoreProvider } from './utils/GlobalState';
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Header/>
            <Routes>
              <Route 
                path="/" 
                element={<Home />}
              />
              <Route 
                path="/profile" 
                element={<Profile/>}
              />
              <Route 
                path="/login" 
                element={<Login/>}
              />
              <Route 
                path="/signup" 
                element={<Signup/>}
              />
              <Route 
                path="*"
                element={<NotFound />}
              />

              <Route 
                path="/success" 
                element={<Success />} 
              />

              <Route path="/products" element={<Products/>}/>

              <Route path="/product/:productId" element={<Product/>}/>
              
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
