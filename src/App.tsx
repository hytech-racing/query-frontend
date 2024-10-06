import React from 'react';
import './App.css';
import Tablecomp from './tablecomp';
import Searchcomp from './searchcomp';
import Visualscomp from './visualcomp';

function App() {
  return (
    <div className="container">
      <div className="chart">
        <Tablecomp />
      </div>
      <div className="visuals">
        <Visualscomp />
      </div>
      <div className="search">
        <Searchcomp />
      </div>
    </div>
  );
}

export default App;
