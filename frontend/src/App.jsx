import { useState, useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    fetch("http://localhost:8000/api/hello/")
      .then((r) => r.json())
      .then((d) => console.log(d));
  }, []);
  
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
