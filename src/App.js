import React, { useState } from 'react';
import './App.css';
import MainTable from './Components/MainTabel/MainTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context, store } from './constants'
import Header from './Components/Header/Header';


function App() {

  const [contex, setContext] = useState(store)

  return (
    <Context.Provider value={[contex, setContext]}>
      <div className="App container">
        <Header />
        <MainTable />
      </div>
    </Context.Provider>

  );
}

export default App;
