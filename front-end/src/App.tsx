import { useState } from 'react';
import './App.css';
import ResponsiveContainer from './components/ResponsiveContainer';
import Container from './components/container';
import heroBg from "./assets/hero-bg.jpg";
import Navbar from './components/navbar';




function App() {
  

  return (
  <>
  <section>
    <Container className='h-auto' style={
      {
        backgroundImage:`url(${heroBg})`,
        backgroundPosition:"center",
        backgroundSize:"cover"
    }}>
      <Navbar/>


   
      
    </Container>
  </section>
  </>
);
}


export default App
