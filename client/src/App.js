import React from 'react';
// import {Switch, Route} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
// import SearchImages from './components/SearchImages';
// import SavedGeoCatches from './components/SavedGeoCatches';
// import MapBox from './components/MapBox/MapBox';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
// import Login from './pages/Login/Login';
// import Home from './pages/Home';
// import PhotoUpload from './components/PhotoUpload/PhotoUpload';
// import Profile from './pages/Profile/Profile';
import './index.css';
import './App.css';


function App() {
  return (
    <ChakraProvider>
      <NavBar />
        <div className="page-container">
        <div className="content-wrap">
        </div>
      <Footer />
    </div>
    </ChakraProvider>);
}

export default App;
