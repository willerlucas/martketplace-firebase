import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './components/products';

function App(){
  return(
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <Products />
      </div>
    </div>
  )
}

export default App;