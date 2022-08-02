import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Geocatch from './components/Geocatch/Geocatch';
import CatchForm from './components/CatchForm/CatchForm';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import PhotoUpload from './components/PhotoUpload/PhotoUpload';
import './index.css';
import './App.css';


import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
    <ChakraProvider>
    <Router>
      <div className="full">
      <NavBar />
      <Routes>

        <Route
                path="/"
                element={<Home />}
              />
              {/* Define a route that will take in variable data */}
        <Route
                path="/me"
                element={<Profile />}
              />
                            <Route
                path="/login"
                element={<Login />}
              />

        <Route
                path="/signup"
                element={<Signup />}
              />
                      <Route
                path="/upload"
                element={<PhotoUpload />}
              />

        <Route
                path="/geocatches/:_id"
                element={<Geocatch />}
              />
                      <Route
                path="/geocatches/:_id/catchform"
                element={<CatchForm />}
              />
        <Route
                path="/users/:userId"
                element={<Profile />}
              />
        </Routes>
        </div>
      <Footer />
      </Router>
    </ChakraProvider>
  </ApolloProvider>);
}

export default App;
