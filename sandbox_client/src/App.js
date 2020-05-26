import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import { Navbar } from './components/Navbar';
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes(false)
  return (
    
    <Router>
      <Navbar></Navbar>
      <div className="container">
        {routes}
    
      </div>
    </Router>
  
  );
}

export default App;
