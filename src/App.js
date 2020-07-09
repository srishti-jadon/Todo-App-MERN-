import React from 'react';
import './App.css';
import Header from "./core/header";
import Footer from "./core/footer";
import TodoList from "./to-do-app/TodoList";

function App() {
  return (
    <div className="app">
      <Header/>
      <div className="container">
          <TodoList/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
