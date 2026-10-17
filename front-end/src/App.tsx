import { useState } from 'react';
import Navbar from '../front-end/src/components/navbar';
import IntroBox from '../front-end/src/components/introBox';
import './App.css';
import Lists from '../front-end/src/components/lists';
import Hero from '../front-end/src/components/hero';




function App() {
  

  return (
  <>
    <IntroBox>
          <Navbar />
          <Hero />
    </IntroBox>
  </>

);
}


export default App
