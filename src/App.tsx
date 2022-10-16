import React from 'react';
import logo from './logo.svg';
import './App.css';

import data from './graph.json'

import Board from './components/Board/Board';


function App() {
  return (
    <section className="App">
      <Board graph={data.graph}></Board>
    </section>
  );
}

export default App;
