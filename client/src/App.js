import React from 'react';
// import {Switch, Route} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
// import SearchImages from './components/SearchImages';
// import SavedGeoCatches from './components/SavedGeoCatches';
// import MapBox from './components/MapBox/MapBox';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
// import PhotoUpload from './components/PhotoUpload/PhotoUpload';
import Profile from './pages/Profile/Profile';
import './index.css';
import './App.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider>
    <ApolloProvider client={client}>

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
                path="/profiles/:profileId" 
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



    </Routes>
    </div>
      <Footer />
    </div>
    </Router>

        </ApolloProvider>
        </ChakraProvider>);
}

export default App;
