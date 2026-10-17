import { useState } from 'react';
import Navbar from '../src/components/navbar.tsx';
import IntroBox from '../src/components/introBox.tsx';
import './App.css';
import Lists from '../src/components/lists.tsx';
import Hero from '../src/components/hero.tsx';




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
