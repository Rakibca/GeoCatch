import React from 'react';
// import {Switch, Route} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
// import SearchImages from './components/SearchImages';
// import SavedGeoCatches from './components/SavedGeoCatches';
// import MapBox from './components/MapBox/MapBox';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Geocatch from './pages/Geocatch/Geocatch';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './pages/Home/Home';
// import PhotoUpload from './components/PhotoUpload/PhotoUpload';
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
      <NavBar />
      <div className="page-container">
        <div className="content-wrap">
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
                path="/geocatches/:geocatchId"
                element={<Geocatch />}
              />
        <Route
                path="/users/:userId"
                element={<Profile />}
              />
    </Routes>
    </div>
      <Footer />
    </div>
    </Router>


        </ChakraProvider>
        </ApolloProvider>);
}

export default App;
