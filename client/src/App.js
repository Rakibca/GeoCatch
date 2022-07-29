import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';


import SearchImages from './components/SearchImages';
import SavedImages from './components/SavedImages';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Login from './components/LoginForm';
import PhotoUpload from './components/PhotoUpload';
import Profile from './components/UserProfile';

const colors = {
  brand: {
    DarkBlue: '#0078AA',
    Blue: '#3AB4F2',
    Yellow: '#F2DF3A',
    White: 'F6F6F6'
  },
}

const theme = extendTheme({ colors })

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header>
          <Routes>
            <Route 
              path='/home' 
              element={<Home.js />} 
            />
            <Route 
              path='/saved' 
              element={<SavedImages />} 
            />
            <Route 
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
          {/* Footer navbar w/ GeoCatch map, photo upload, and user profile */}
          <Navbar />
        </Header>
      </Router>
    </ChakraProvider>
  );
}

export default App;
